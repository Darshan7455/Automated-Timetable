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

const upload = multer({ 
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
            cb(null, true);
        } else {
            cb(new Error('Only CSV files are allowed!'));
        }
    }
});

const runPythonScript = (scriptName, args = []) => {
    return new Promise((resolve, reject) => {
        const pythonPath = 'C:\\Users\\DARSHAN\\AppData\\Local\\Microsoft\\WindowsApps\\PythonSoftwareFoundation.Python.3.11_qbz5n2kfra8p0\\python.exe';
        const workingDir = path.join(__dirname, 'TimeTable-main');
        const scriptPath = path.join(workingDir, scriptName);

        const python = spawn(pythonPath, [scriptPath, ...args], { cwd: workingDir });

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

    // Check in multiple locations
    const searchDirs = [
        path.join(__dirname, 'outputs'),
        __dirname,
        path.join(__dirname, 'TimeTable-main')
    ];

    possibleFiles.forEach(file => {
        for (const dir of searchDirs) {
            const filePath = path.join(dir, file);
            if (fs.existsSync(filePath)) {
                if (!files.includes(file)) {
                    files.push(file);
                }
                break;
            }
        }
    });

    return files;
};

app.post('/upload', upload.fields([
    { name: 'combined', maxCount: 1 },
    { name: 'rooms', maxCount: 1 }
]), async (req, res) => {
    try {
        console.log('=== Upload request received ===');
        console.log('Request files:', req.files);
        console.log('Request body:', req.body);
        console.log('Request headers:', req.headers);
        
        if (!req.files || !req.files.combined || !req.files.rooms) {
            console.error('Missing files:', { 
                hasFiles: !!req.files, 
                hasCombined: !!req.files?.combined, 
                hasRooms: !!req.files?.rooms 
            });
            return res.status(400).json({
                message: 'Please upload both combined.csv and rooms.csv files.'
            });
        }

        const combinedSource = req.files.combined[0].path;
        const roomsSource = req.files.rooms[0].path;
        const combinedDest = path.join(__dirname, 'TimeTable-main', 'combined.csv');
        const roomsDest = path.join(__dirname, 'TimeTable-main', 'rooms.csv');

        console.log('Copying files:', { combinedSource, combinedDest, roomsSource, roomsDest });

        // Use async file operations with retry logic for OneDrive sync issues
        const copyFileWithRetry = async (src, dest, retries = 3) => {
            for (let i = 0; i < retries; i++) {
                try {
                    // Read source file
                    const data = await fs.promises.readFile(src);
                    // Write to destination
                    await fs.promises.writeFile(dest, data);
                    return;
                } catch (err) {
                    if (i === retries - 1) throw err;
                    // Wait before retry (exponential backoff)
                    await new Promise(resolve => setTimeout(resolve, 100 * Math.pow(2, i)));
                }
            }
        };

        await copyFileWithRetry(combinedSource, combinedDest);
        await copyFileWithRetry(roomsSource, roomsDest);

        console.log('Files copied successfully');

        res.json({
            message: '✅ Files uploaded successfully!',
            files: {
                combined: req.files.combined[0].filename,
                rooms: req.files.rooms[0].filename
            }
        });
    } catch (error) {
        console.error('=== Upload error ===');
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        console.error('Error details:', error);
        res.status(500).json({ 
            message: 'File upload failed.', 
            error: error.message,
            details: error.toString()
        });
    }
});

// Add error handling middleware for multer errors
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        console.error('Multer error:', error);
        return res.status(400).json({ 
            message: 'File upload error', 
            error: error.message,
            code: error.code
        });
    }
    next(error);
});

app.post('/generate-timetable', async (req, res) => {
    try {
        console.log('Generating timetable...');

        const combinedPath = path.join(__dirname, 'TimeTable-main', 'combined.csv');
        const roomsPath = path.join(__dirname, 'TimeTable-main', 'rooms.csv');

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

        const combinedPath = path.join(__dirname, 'TimeTable-main', 'combined.csv');

        if (!fs.existsSync(combinedPath)) {
            return res.status(400).json({
                message: 'Please upload combined.csv file first.'
            });
        }

        const examDates = req.body.dates || req.body.examDates;
        
        const examDatesPath = path.join(__dirname, 'TimeTable-main', 'exam_dates.json');
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

        // Check multiple possible locations for the file
        const possiblePaths = [
            path.join(__dirname, 'outputs', fileName),
            path.join(__dirname, fileName),
            path.join(__dirname, 'TimeTable-main', fileName)
        ];

        let filePath = null;
        for (const checkPath of possiblePaths) {
            if (fs.existsSync(checkPath)) {
                filePath = checkPath;
                console.log(`Found file at: ${filePath}`);
                break;
            }
        }

        if (!filePath) {
            console.error(`File not found: ${fileName}`);
            console.error(`Checked paths:`, possiblePaths);
            return res.status(404).json({ message: 'File not found.' });
        }

        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error('Download error:', err);
                if (!res.headersSent) {
                    res.status(500).json({ message: 'File download failed.' });
                }
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
