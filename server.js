const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

const uploadsDir = path.join(__dirname, 'uploads');
const outputsDir = path.join(__dirname, 'outputs');
[uploadsDir, outputsDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

const runPythonScript = (scriptName, args = []) => {
    return new Promise((resolve, reject) => {
        const pythonPath = 'python';
        const scriptPath = path.join(__dirname, scriptName);

        const python = spawn(pythonPath, [scriptPath, ...args]);

        let stdout = '';
        let stderr = '';

        python.stdout.on('data', (data) => {
            stdout += data.toString();
            console.log(`Python stdout: ${data}`);
        });

        python.stderr.on('data', (data) => {
            stderr += data.toString();
            console.error(`Python stderr: ${data}`);
        });

        python.stdout.on('error', (err) => {
            console.error(`Python stdout error: ${err}`);
        });

        python.stderr.on('error', (err) => {
            console.error(`Python stderr error: ${err}`);
        });

        python.on('close', (code) => {
            if (code === 0) {
                resolve({ stdout, stderr });
            } else {
                const errorMessage = stderr || stdout || `Python script exited with code ${code}`;
                console.error(`Python script error (code ${code}):`, errorMessage);
                reject(new Error(errorMessage));
            }
        });

        python.on('error', (err) => {
            reject(err);
        });
    });
};

const getGeneratedFiles = () => {
    const files = [];
    const possibleFiles = [
        'timetable_all_departments.xlsx',
        'all_faculty_timetables.xlsx',
        'exam_timetable.xlsx'
    ];

    possibleFiles.forEach(file => {
        const filePath = path.join(__dirname, file);
        if (fs.existsSync(filePath)) {
            files.push(file);
        }
    });

    return files;
};

app.post('/upload', upload.fields([
    { name: 'combined', maxCount: 1 },
    { name: 'rooms', maxCount: 1 }
]), (req, res) => {
    try {
        if (!req.files || !req.files.combined || !req.files.rooms) {
            return res.status(400).json({
                message: 'Please upload both combined.csv and rooms.csv files.'
            });
        }

        const combinedSource = req.files.combined[0].path;
        const roomsSource = req.files.rooms[0].path;
        const combinedDest = path.join(__dirname, 'combined.csv');
        const roomsDest = path.join(__dirname, 'rooms.csv');

        fs.copyFileSync(combinedSource, combinedDest);
        fs.copyFileSync(roomsSource, roomsDest);

        res.json({
            message: '✅ Files uploaded successfully!',
            files: {
                combined: req.files.combined[0].filename,
                rooms: req.files.rooms[0].filename
            }
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'File upload failed.', error: error.message });
    }
});

app.post('/generate-timetable', async (req, res) => {
    try {
        console.log('Generating timetable...');

        const combinedPath = path.join(__dirname, 'combined.csv');
        const roomsPath = path.join(__dirname, 'rooms.csv');

        if (!fs.existsSync(combinedPath) || !fs.existsSync(roomsPath)) {
            return res.status(400).json({
                message: 'Please upload CSV files first.'
            });
        }

        await runPythonScript('TT_gen.py');

        const outputs = getGeneratedFiles();

        res.json({
            message: '✅ Timetable generated successfully!',
            outputs
        });
    } catch (error) {
        console.error('Timetable generation error:', error);
        res.status(500).json({
            message: '❌ Timetable generation failed.',
            error: error.message
        });
    }
});

app.post('/generate-exam', async (req, res) => {
    try {
        console.log('Generating exam timetable...');
        console.log('Request body:', JSON.stringify(req.body, null, 2));

        const combinedPath = path.join(__dirname, 'combined.csv');

        if (!fs.existsSync(combinedPath)) {
            return res.status(400).json({
                message: 'Please upload combined.csv file first.'
            });
        }

        const examDates = req.body.dates || req.body.examDates;
        
        const examDatesPath = path.join(__dirname, 'exam_dates.json');
        if (examDates && Array.isArray(examDates) && examDates.length > 0) {
            fs.writeFileSync(examDatesPath, JSON.stringify({ dates: examDates }, null, 2), 'utf8');
            console.log(`Exam dates provided: ${examDates.join(', ')}`);
        } else {
            fs.writeFileSync(examDatesPath, JSON.stringify({ dates: [] }, null, 2), 'utf8');
            console.log('No exam dates provided, using defaults');
        }

        await runPythonScript('exam_timetable.py');

        const outputs = getGeneratedFiles();

        res.json({
            message: '✅ Exam timetable generated successfully!',
            outputs
        });
    } catch (error) {
        console.error('Exam timetable generation error:', error);
        res.status(500).json({
            message: '❌ Exam timetable generation failed.',
            error: error.message
        });
    }
});

app.get('/download', (req, res) => {
    try {
        const fileName = req.query.file;

        if (!fileName) {
            return res.status(400).json({ message: 'File name is required.' });
        }

        const filePath = path.join(__dirname, fileName);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'File not found.' });
        }

        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error('Download error:', err);
                res.status(500).json({ message: 'File download failed.' });
            }
        });
    } catch (error) {
        console.error('Download error:', error);
        res.status(500).json({ message: 'File download failed.', error: error.message });
    }
});

app.get('/outputs', (req, res) => {
    try {
        const outputs = getGeneratedFiles();
        res.json({ outputs });
    } catch (error) {
        console.error('Error getting outputs:', error);
        res.status(500).json({ message: 'Failed to get output files.', error: error.message });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📁 Uploads directory: ${uploadsDir}`);
    console.log(`📁 Outputs directory: ${outputsDir}`);
});
