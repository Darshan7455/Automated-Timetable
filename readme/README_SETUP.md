# 🗓️ Automated Timetable Generation System

A modern full-stack web application for automated academic timetable generation with conflict-free scheduling, room allocation, and faculty management.

## ✨ Features

- 📤 **Easy CSV Upload**: Upload combined course data and room information via intuitive UI
- 🤖 **Automated Generation**: AI-powered conflict-free timetable scheduling
- 👨‍🏫 **Faculty Timetables**: Individual timetables for all faculty members
- 🏢 **Room Management**: Smart room allocation based on capacity and type
- 📝 **Exam Scheduling**: Separate exam timetable generation
- 💾 **Multi-File Download**: Download all generated Excel files directly from the UI
- 🎨 **Beautiful Interface**: Modern gradient UI with responsive design

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Python 3.10+ (Python 3.13 recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Automated_timetable-/TimeTable-main
   ```

2. **Install all dependencies**
   ```bash
   # Install backend and frontend dependencies
   npm run install:all
   
   # Install Python dependencies
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   ```

### Running the Application

#### Option 1: Run Backend and Frontend Together
```bash
npm run dev:all
```

#### Option 2: Run Separately

**Terminal 1 - Backend Server:**
```bash
npm start
```

**Terminal 2 - React UI:**
```bash
npm run start:ui
```

The application will be available at:
- **Frontend (UI)**: http://localhost:3000
- **Backend (API)**: http://localhost:5000

## 📖 How to Use

1. **Upload CSV Files**
   - Navigate to http://localhost:3000
   - Upload `combined.csv` (course data with departments, semesters, faculty)
   - Upload `rooms.csv` (room details with capacity and type)

2. **Generate Timetables**
   - Click "Generate Timetable" to create department and faculty timetables
   - Click "Generate Exam Timetable" for exam scheduling

3. **Download Results**
   - All generated Excel files will appear in the download section
   - Click on any file to download it instantly

## 📁 Project Structure

```
TimeTable-main/
├── server.js                    # Express backend API
├── TT_gen.py                    # Main timetable generation logic
├── comprehensive_timetable.py   # Comprehensive timetable utilities
├── exam_timetable.py            # Exam timetable generator
├── requirements.txt             # Python dependencies
├── package.json                 # Node.js dependencies and scripts
├── combined.csv                 # Course data (uploaded via UI)
├── rooms.csv                    # Room data (uploaded via UI)
├── uploads/                     # File upload directory
├── outputs/                     # Generated output files
└── timetable-ui/                # React frontend
    ├── src/
    │   ├── App.js               # Main React component
    │   ├── style.css            # Gradient styling
    │   └── components/
    │       ├── FileUpload.js    # CSV upload component
    │       ├── ActionButtons.js # Generation triggers
    │       ├── StatusBox.js     # Status & downloads
    │       └── ConfigPanel.js   # Configuration settings
    └── package.json             # React dependencies
```

## 🛠️ API Endpoints

### POST `/upload`
Upload CSV files (combined.csv and rooms.csv)

### POST `/generate-timetable`
Generate comprehensive timetables for all departments and faculty

### POST `/generate-exam`
Generate exam timetable

### GET `/download?file=<filename>`
Download a generated Excel file

### GET `/outputs`
Get list of all generated files

### GET `/health`
Health check endpoint

## 📊 Generated Output Files

1. **`timetable_all_departments.xlsx`** - Complete timetable for all departments and semesters
2. **`all_faculty_timetables.xlsx`** - Individual timetables for all faculty members
3. **`exam_timetable.xlsx`** - Exam schedule with slots and room allocation

## 🎨 UI Features

- **Gradient Background**: Beautiful purple gradient design
- **File Selection Feedback**: Visual confirmation of selected files
- **Status Updates**: Real-time generation progress
- **Download Buttons**: One-click download for all generated files
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🔧 Configuration

Edit `exam_config.json` to customize:
- Exam duration
- Morning/afternoon slot timings
- Break durations

## 📝 CSV File Format

### combined.csv
```csv
Department,Semester,Course Code,Course Name,L,T,P,S,C,Faculty,Schedule,total_students
CSE,2,CS162,Optimization,3,1,0,0,2,Dr. Smith,Yes,70
```

### rooms.csv
```csv
id,capacity,type,roomNumber
R001,70,LECTURE_ROOM,101
R002,35,COMPUTER_LAB,Lab1
```

## 🐛 Troubleshooting

**Backend won't start:**
- Ensure port 5000 is not in use
- Check that Python virtual environment is activated
- Verify all Python dependencies are installed

**UI connection issues:**
- Confirm backend is running on port 5000
- Check browser console for CORS errors
- Ensure both servers are running

**Python errors:**
- Make sure you're using Python 3.10 or higher
- Activate the virtual environment before running scripts
- Reinstall dependencies: `pip install -r requirements.txt`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Developed by the **Software Psych** team

## 🎯 Future Enhancements

- [ ] Real-time collaboration features
- [ ] PDF export option
- [ ] Email distribution of timetables
- [ ] Mobile app version
- [ ] Advanced conflict detection
- [ ] Calendar integration (Google Calendar, Outlook)
- [ ] Multi-language support

## 📧 Support

For support, contact the Software Psych development team or open an issue on GitHub.

---

Made with ❤️ by Software Psych Team
