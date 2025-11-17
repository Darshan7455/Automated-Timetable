# 📘 User Manual - Automated Timetable Generation System

**Version 1.0**  
**Last Updated: November 16, 2025**

---

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [System Overview](#system-overview)
3. [Installation & Setup](#installation--setup)
4. [Getting Started](#getting-started)
5. [Using the Web Interface](#using-the-web-interface)
6. [CSV File Format Guide](#csv-file-format-guide)
7. [Configuration Options](#configuration-options)
8. [Understanding the Output](#understanding-the-output)
9. [Troubleshooting](#troubleshooting)
10. [Advanced Usage](#advanced-usage)
11. [Best Practices](#best-practices)
12. [Frequently Asked Questions](#frequently-asked-questions)

---

## 🎯 Introduction

### What is the Automated Timetable Generation System?

The Automated Timetable Generation System is a comprehensive web-based application designed to automatically generate conflict-free academic timetables for educational institutions. The system handles:

- **Course scheduling** for multiple departments and semesters
- **Faculty assignments** with conflict detection
- **Room allocation** based on capacity and type
- **Exam timetable generation** with seat arrangements
- **Individual faculty schedules**

### Key Benefits

- ⏱️ **Time-Saving**: Generate timetables in minutes, not days
- ✅ **Conflict-Free**: Automatic detection and resolution of scheduling conflicts
- 📊 **Comprehensive**: Handles lectures, labs, tutorials, and exams
- 🎨 **User-Friendly**: Modern web interface with drag-and-drop functionality
- 📥 **Easy Export**: Download schedules in Excel format

---

## 🖥️ System Overview

### Architecture

The system consists of three main components:

1. **Frontend (React UI)**: Modern web interface for file uploads and timetable generation
2. **Backend (Node.js/Express)**: API server handling file uploads and script execution
3. **Python Engine**: Core scheduling algorithms and timetable generation logic

### System Requirements

#### Hardware Requirements
- **Processor**: Dual-core processor or better
- **RAM**: Minimum 4 GB (8 GB recommended)
- **Storage**: At least 500 MB free space
- **Display**: 1366 x 768 resolution or higher

#### Software Requirements
- **Operating System**: Windows 10/11, macOS 10.15+, or Linux (Ubuntu 20.04+)
- **Node.js**: Version 16.0 or higher
- **Python**: Version 3.10 or higher (Python 3.13 recommended)
- **Web Browser**: Chrome, Firefox, Safari, or Edge (latest versions)
- **npm**: Version 7.0 or higher

---

## 🚀 Installation & Setup

### Step 1: Prerequisites Check

Before installing, ensure you have the required software:

**Check Node.js Installation:**
```bash
node --version
# Should display v16.0.0 or higher
```

**Check Python Installation:**
```bash
python --version
# Should display Python 3.10.0 or higher
```

**Check npm Installation:**
```bash
npm --version
# Should display 7.0.0 or higher
```

If any of these are missing, install them from:
- Node.js: https://nodejs.org/
- Python: https://www.python.org/downloads/

### Step 2: Download the Project

Extract the project files to a location on your computer, for example:
- Windows: `C:\Users\YourName\Automated_timetable`
- macOS/Linux: `~/Automated_timetable`

### Step 3: Install Dependencies

Open a terminal/command prompt and navigate to the project directory:

```bash
cd C:\Users\DARSHAN\OneDrive\Desktop\Automated_timetable--master\TimeTable-main
```

**Install Node.js Dependencies:**
```bash
npm install
cd timetable-ui
npm install
cd ..
```

**Install Python Dependencies:**

Windows (PowerShell):
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

macOS/Linux:
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Step 4: Verify Installation

Run this command to verify all dependencies are installed:
```bash
npm run check
```

If you see no errors, your installation is complete!

---

## 🎬 Getting Started

### Starting the Application

#### Method 1: Quick Start (All-in-One)

**Windows:**
```powershell
.\start.sh
```

**macOS/Linux:**
```bash
chmod +x start.sh
./start.sh
```

This will start both the backend server and frontend UI automatically.

#### Method 2: Manual Start (Recommended for Troubleshooting)

**Terminal 1 - Start Backend Server:**
```bash
cd TimeTable-main
npm start
```

Wait until you see:
```
Server running on http://localhost:5000
```

**Terminal 2 - Start Frontend UI:**
```bash
cd TimeTable-main
npm run start:ui
```

Your browser will automatically open to `http://localhost:3000`

### Accessing the Application

Once both servers are running:
1. Open your web browser
2. Navigate to: **http://localhost:3000**
3. You should see the purple gradient interface

---

## 🖱️ Using the Web Interface

### Interface Overview

The web interface is divided into several sections:

1. **Header**: Application title and branding
2. **File Upload Section**: Upload CSV files
3. **Configuration Panel**: Adjust scheduling parameters
4. **Action Buttons**: Generate timetables and exams
5. **Status Box**: Real-time progress updates
6. **Download Section**: Download generated files

### Step-by-Step Usage Guide

#### Step 1: Prepare Your CSV Files

You need two CSV files:
- `combined.csv`: Course and faculty information
- `rooms.csv`: Room information

(See [CSV File Format Guide](#csv-file-format-guide) for detailed format requirements)

#### Step 2: Upload Files

1. Click **"Choose File"** under "Combined CSV (Courses & Faculty)"
2. Select your `combined.csv` file
3. You'll see a green checkmark (✅) and the filename
4. Click **"Choose File"** under "Rooms CSV"
5. Select your `rooms.csv` file
6. You'll see another green checkmark (✅)
7. Click the **"📤 Upload Files"** button
8. Wait for the success message: "✅ Files uploaded successfully"

#### Step 3: Configure Settings (Optional)

In the Configuration Panel, you can adjust:
- **Lecture Duration**: Number of 30-minute slots (default: 3 = 1.5 hours)
- **Lab Duration**: Number of 30-minute slots (default: 4 = 2 hours)
- **Exam Slots Per Day**: Morning and afternoon slots (default: 2)

Click **"💾 Save Configuration"** if you make changes.

#### Step 4: Generate Timetable

1. Click the **"🗓️ Generate Timetable"** button
2. The button will show a loading spinner
3. Status box will display: "⚙️ Generating Timetable..."
4. Wait for generation to complete (typically 10-30 seconds)
5. Success message: "✅ Timetable generated successfully!"

#### Step 5: Generate Exam Timetable (Optional)

1. Click the **"📝 Generate Exam Timetable"** button
2. Status box will display: "⚙️ Generating Exam Timetable..."
3. Wait for completion
4. Success message: "✅ Exam timetable generated successfully!"

#### Step 6: Download Files

After successful generation, you'll see download buttons:

- **📊 timetable_all_departments.xlsx**: Complete department timetables
- **👨‍🏫 all_faculty_timetables.xlsx**: Individual faculty schedules
- **📋 exam_timetable.xlsx**: Exam schedule (if generated)
- **💺 seat_arrangements.xlsx**: Exam seating arrangements (if generated)

Click any button to download the file to your Downloads folder.

---

## 📄 CSV File Format Guide

### Combined.csv Format

This file contains all course information, faculty assignments, and student counts.

#### Required Columns

| Column | Description | Example | Notes |
|--------|-------------|---------|-------|
| `Department` | Department code | `CSE`, `ECE`, `DSAI` | 3-4 letter abbreviation |
| `Semester` | Semester number | `2`, `4`, `6`, `8` | Even numbers typically |
| `Course Code` | Unique identifier | `CS162`, `B1-CS471` | Use B-prefix for basket courses |
| `Course Name` | Full course title | `Data Structures` | Keep concise |
| `L` | Lecture hours/week | `3` | Integer only |
| `T` | Tutorial hours/week | `1` | Integer only |
| `P` | Practical/Lab hours/week | `0` or `2` | Integer only |
| `S` | Self-study hours/week | `0` | Integer only |
| `C` | Credits | `4` | Calculated from L-T-P-S |
| `Faculty` | Professor name(s) | `Dr. John Smith` | Use "/" for multiple |
| `Schedule` | Include in timetable? | `Yes` or `No` | Controls generation |
| `total_students` | Enrollment count | `70` | For room allocation |

#### Example combined.csv

```csv
Department,Semester,Course Code,Course Name,L,T,P,S,C,Faculty,Schedule,total_students
CSE,2,CS162,Data Structures,3,0,2,0,4,Dr. John Smith,Yes,65
CSE,2,CS164,Computer Organization,3,1,0,0,4,Dr. Sarah Johnson,Yes,68
ECE,4,EC301,Digital Signal Processing,3,0,2,0,4,Dr. Michael Brown,Yes,45
DSAI,2,DS201,Machine Learning Basics,3,1,0,0,4,Dr. Emily Davis/Dr. Tom Wilson,Yes,80
CSE,6,B1-CS471,Cloud Computing,3,0,0,0,3,Dr. Robert Lee,Yes,25
CSE,6,B1-CS472,Blockchain Technology,3,0,0,0,3,Dr. Lisa Chen,Yes,20
```

#### Special Notes

**Basket Courses:**
- Start course code with `B1-`, `B2-`, etc.
- These are elective groups where students choose one course
- System groups them in the same time slot

**Multiple Faculty:**
- Use `/` or `and` to separate: `Dr. A/Dr. B` or `Dr. A and Dr. B`
- Both faculty will be assigned to all sessions

**Schedule Column:**
- `Yes`: Include in timetable generation
- `No`: Exclude from scheduling (e.g., online courses)

### Rooms.csv Format

This file contains information about all available rooms.

#### Required Columns

| Column | Description | Example | Notes |
|--------|-------------|---------|-------|
| `id` | Unique room ID | `R001`, `LAB_CS_1` | Alphanumeric |
| `capacity` | Maximum seats | `70`, `35`, `120` | Integer only |
| `type` | Room category | `LECTURE_ROOM`, `COMPUTER_LAB` | See types below |
| `roomNumber` | Display name | `101`, `Lab1`, `Auditorium` | User-friendly name |

#### Room Types

- **LECTURE_ROOM**: Standard classroom for lectures and tutorials
- **COMPUTER_LAB**: Lab with computer systems for programming courses
- **HARDWARE_LAB**: Engineering lab with specialized equipment
- **SEATER_120**: Large auditorium or hall for combined classes
- **LIBRARY**: Not used for scheduling (informational only)
- **SEMINAR_ROOM**: Small rooms for discussions (optional)

#### Example rooms.csv

```csv
id,capacity,type,roomNumber
R001,70,LECTURE_ROOM,101
R002,65,LECTURE_ROOM,102
R003,35,COMPUTER_LAB,CS-Lab1
R004,40,COMPUTER_LAB,CS-Lab2
R005,30,HARDWARE_LAB,ECE-Lab1
R006,120,SEATER_120,Auditorium-A
R007,150,SEATER_120,Auditorium-B
R008,50,LECTURE_ROOM,201
R009,45,LECTURE_ROOM,202
R010,35,COMPUTER_LAB,CS-Lab3
```

#### Room Allocation Logic

The system automatically:
- Assigns rooms based on `total_students` count
- Uses `COMPUTER_LAB` for courses with practical hours (P > 0)
- Uses `LECTURE_ROOM` for theory classes
- Uses `SEATER_120` for large classes (>100 students)
- Adds 10% buffer capacity to avoid overcrowding

---

## ⚙️ Configuration Options

### Basic Configuration (Web UI)

Access the Configuration Panel in the web interface:

**Lecture Duration**
- Default: 3 slots (1.5 hours)
- Range: 2-4 slots (1-2 hours)
- Each slot = 30 minutes

**Lab Duration**
- Default: 4 slots (2 hours)
- Range: 3-6 slots (1.5-3 hours)
- Each slot = 30 minutes

**Exam Slots Per Day**
- Default: 2 (morning + afternoon)
- Options: 1-3 slots per day

### Advanced Configuration Files

#### config.json

Located in `TimeTable-main/config.json`, this file controls scheduling rules:

```json
{
    "timetable_settings": {
        "working_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "start_time": "09:00",
        "end_time": "17:30",
        "slot_duration_minutes": 15
    },
    "break_settings": {
        "morning_break": {
            "enabled": false,
            "start_time": "11:00",
            "duration_minutes": 15
        },
        "lunch_break": {
            "enabled": true,
            "start_time": "13:30",
            "end_time": "14:30",
            "duration_minutes": 60
        }
    },
    "duration_constants": {
        "lecture_slots": 3,
        "lab_slots": 4,
        "tutorial_slots": 2,
        "self_study_slots": 2,
        "lecture_duration": 45,
        "lab_duration": 120,
        "tutorial_duration": 60,
        "self_study_duration": 0,
        "break_duration": 15
    },
    "scheduling_preferences": {
        "elective_slots": ["09:00"],
        "allow_back_to_back_lectures": true,
        "max_lectures_per_day": 6,
        "prefer_morning_labs": true
    },
    "room_allocation": {
        "large_class_threshold": 100,
        "lab_requires_computer_room": true,
        "allow_room_sharing": false
    }
}
```

#### exam_config.json

Controls exam scheduling parameters:

```json
{
    "exam_duration_minutes": 180,
    "morning_start": "09:00",
    "afternoon_start": "14:00",
    "slots_per_day": 2,
    "course_room_capacity_buffer": 1.1,
    "min_gap_between_exams_days": 1,
    "max_exams_per_day_per_student": 1
}
```

#### exam_dates.json

Specify custom exam dates:

```json
{
    "exam_dates": [
        "2025-12-01",
        "2025-12-03",
        "2025-12-05",
        "2025-12-08",
        "2025-12-10"
    ]
}
```

#### reserved_slots.json

Block specific time slots:

```json
{
    "reserved_slots": [
        {
            "day": "Monday",
            "time": "09:00",
            "room": "R001",
            "reason": "Department Meeting"
        },
        {
            "day": "Friday",
            "time": "16:00",
            "room": "all",
            "reason": "Faculty Assembly"
        }
    ]
}
```

---

## 📊 Understanding the Output

### 1. timetable_all_departments.xlsx

This is the main timetable file containing schedules for all departments.

#### Structure

- **Overview Sheet**: Lists all department-semester combinations
- **Individual Sheets**: One per department-semester (e.g., "CSE-2", "ECE-4")

#### Sheet Columns

| Column | Content | Example |
|--------|---------|---------|
| Time | Time slot | 09:00-10:30 |
| Monday | Course + Room | CS162 (R001) |
| Tuesday | Course + Room | CS164 (R002) |
| Wednesday | Course + Room | Lab CS162 (LAB1) |
| Thursday | Course + Room | CS162 (R001) |
| Friday | Course + Room | CS164 (R002) |

#### Color Coding

- **Blue**: Regular lectures
- **Green**: Lab sessions
- **Yellow**: Tutorial sessions
- **Orange**: Basket/Elective courses
- **Gray**: Breaks
- **White**: Free slots

#### Reading the Timetable

Example cell: `CS162 - Data Structures (R001) - Dr. Smith`
- `CS162`: Course code
- `Data Structures`: Course name
- `R001`: Assigned room
- `Dr. Smith`: Faculty member

### 2. all_faculty_timetables.xlsx

Individual schedules for each faculty member.

#### Structure

- **Overview Sheet**: Lists all faculty members
- **Faculty Sheets**: One per faculty (e.g., "Dr. John Smith")

#### Information Displayed

- All classes taught by the faculty member
- Time slots across the week
- Course codes and names
- Room assignments
- Department and semester information

#### Use Cases

- Share individual sheets with faculty members
- Identify faculty workload
- Detect scheduling conflicts
- Plan office hours around teaching schedule

### 3. exam_timetable.xlsx

Examination schedule with date, time, and room assignments.

#### Structure

- Date-wise organization
- Morning and afternoon slots
- Room allocations based on student count

#### Columns

| Column | Content | Example |
|--------|---------|---------|
| Department | Dept code | CSE |
| Semester | Sem number | 2 |
| Course Code | Code | CS162 |
| Course Name | Full name | Data Structures |
| Students | Count | 65 |
| Day | Weekday | Monday |
| Slot | 1 or 2 | 1 (Morning) |
| Time | Slot time | 09:00-12:00 |
| Rooms | Assigned rooms | R001, R002 |
| Date | Exam date | 2025-12-01 |

### 4. seat_arrangements.xlsx (if generated)

Detailed seating plan for examinations.

#### Information

- Student roll numbers
- Assigned rooms
- Seat numbers
- Exam dates and times
- Invigilator assignments (if configured)

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Issue 1: Backend Server Won't Start

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**

Windows (PowerShell):
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Restart backend
npm start
```

macOS/Linux:
```bash
# Find and kill process using port 5000
lsof -ti:5000 | xargs kill -9

# Restart backend
npm start
```

#### Issue 2: Frontend UI Won't Start

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**

Windows (PowerShell):
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <PID> /F

# Restart UI
npm run start:ui
```

macOS/Linux:
```bash
# Find and kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Restart UI
npm run start:ui
```

#### Issue 3: File Upload Fails

**Symptoms:**
- Upload button doesn't work
- Files don't show green checkmark
- Error message appears

**Solutions:**

1. **Check file format:**
   - Must be `.csv` files
   - Use UTF-8 encoding
   - No special characters in filename

2. **Verify file content:**
   - Open in Excel or text editor
   - Check column headers match exactly
   - Ensure no empty rows in middle of data

3. **Check browser console:**
   - Press F12 to open developer tools
   - Look for error messages in Console tab

4. **Restart servers:**
   - Stop both backend and frontend
   - Delete `uploads/` folder
   - Restart servers

#### Issue 4: Timetable Generation Fails

**Error Messages and Solutions:**

**"No suitable room found"**
- Add more rooms to `rooms.csv`
- Increase room capacities
- Check that room types match course requirements (labs need COMPUTER_LAB)

**"Faculty conflict detected"**
- Review faculty assignments in `combined.csv`
- Check for duplicate faculty names with different spellings
- Verify Schedule column is set correctly

**"Invalid CSV format"**
- Check all required columns are present
- Verify column names match exactly (case-sensitive)
- Ensure data types are correct (numbers vs text)

**"Python script failed"**
- Check Python is installed and in PATH
- Verify all Python dependencies installed
- Check backend terminal for detailed error message

#### Issue 5: Download Doesn't Work

**Solutions:**

1. **Check if files were generated:**
   - Look in `TimeTable-main/` folder
   - Check for `.xlsx` files
   - Verify file sizes (>0 bytes)

2. **Browser issues:**
   - Clear browser cache
   - Try different browser
   - Check download settings/permissions
   - Disable pop-up blocker

3. **Alternative download:**
   - Navigate to project folder
   - Copy files manually from `outputs/` or root directory

#### Issue 6: Python Dependencies Error

**Error Message:**
```
ModuleNotFoundError: No module named 'pandas'
```

**Solution:**
```bash
# Activate virtual environment
.\venv\Scripts\Activate.ps1  # Windows
source venv/bin/activate      # macOS/Linux

# Reinstall dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Verify installation
pip list
```

#### Issue 7: Out of Memory Error

**Symptoms:**
- Generation takes very long
- Browser becomes unresponsive
- "Out of memory" error

**Solutions:**

1. **Reduce data size:**
   - Split into smaller department batches
   - Generate one semester at a time

2. **Increase memory:**
   - Close other applications
   - Restart computer
   - Use machine with more RAM

3. **Optimize settings:**
   - Reduce `max_lectures_per_day` in `config.json`
   - Disable unnecessary features

### Getting Detailed Error Information

**Backend Terminal:**
- Check terminal where `npm start` is running
- Look for Python stack traces
- Note any error codes

**Frontend Browser Console:**
- Press F12
- Go to Console tab
- Look for red error messages
- Check Network tab for failed requests

**Log Files:**
- Check `TimeTable-main/logs/` if exists
- Review error logs for timestamps and details

---

## 🎓 Advanced Usage

### Command Line Usage

For automation or advanced users, you can run scripts directly:

#### Generate Timetable via Command Line

```bash
cd TimeTable-main
python TT_gen.py
```

#### Generate Exam Timetable with Custom Start Date

```bash
python exam_timetable.py --start-date 2025-12-01
```

#### Generate with Custom Output File

```bash
python exam_timetable.py --out custom_exam_schedule.xlsx --start-date 2025-12-01
```

### Batch Processing

Create a script to generate multiple timetables:

**Windows (batch.bat):**
```batch
@echo off
cd TimeTable-main

echo Generating Main Timetable...
python TT_gen.py

echo Generating Exam Timetable...
python exam_timetable.py --start-date 2025-12-01

echo Generating Faculty Schedules...
python comprehensive_timetable.py

echo All timetables generated successfully!
pause
```

**macOS/Linux (batch.sh):**
```bash
#!/bin/bash
cd TimeTable-main

echo "Generating Main Timetable..."
python3 TT_gen.py

echo "Generating Exam Timetable..."
python3 exam_timetable.py --start-date 2025-12-01

echo "Generating Faculty Schedules..."
python3 comprehensive_timetable.py

echo "All timetables generated successfully!"
```

### API Usage

The backend provides REST API endpoints:

#### Upload Files
```javascript
POST http://localhost:5000/upload
Content-Type: multipart/form-data

Form Data:
- combined: File
- rooms: File
```

#### Generate Timetable
```javascript
POST http://localhost:5000/generate
Content-Type: application/json

Response:
{
  "success": true,
  "files": ["timetable_all_departments.xlsx", "all_faculty_timetables.xlsx"]
}
```

#### Generate Exam Timetable
```javascript
POST http://localhost:5000/generate-exam
Content-Type: application/json

Body:
{
  "startDate": "2025-12-01"
}

Response:
{
  "success": true,
  "file": "exam_timetable.xlsx"
}
```

#### Download File
```javascript
GET http://localhost:5000/download/:filename

Example:
GET http://localhost:5000/download/timetable_all_departments.xlsx
```

### Custom Scheduling Algorithms

For developers who want to modify the scheduling logic:

1. **Edit `TT_gen.py`** for main timetable generation
2. **Edit `exam_timetable.py`** for exam scheduling
3. **Modify `config.json`** for parameter adjustments

Key functions to customize:
- `assign_rooms()`: Room allocation logic
- `schedule_courses()`: Course scheduling algorithm
- `check_conflicts()`: Conflict detection
- `optimize_schedule()`: Optimization routines

---

## 💡 Best Practices

### Data Preparation

1. **Clean Your Data:**
   - Remove duplicate entries
   - Standardize faculty name formatting
   - Verify course codes are unique
   - Check for typos in department names

2. **Plan Room Allocation:**
   - Have 10-20% extra rooms as buffer
   - Ensure adequate lab facilities
   - Match room capacities to class sizes

3. **Faculty Assignments:**
   - Use consistent name formatting: "Dr. First Last"
   - Verify faculty availability
   - Balance faculty workload
   - Consider faculty preferences when possible

### Scheduling Strategy

1. **Start Small:**
   - Generate for one department first
   - Verify output quality
   - Adjust settings as needed
   - Scale to full institution

2. **Iterative Approach:**
   - Generate → Review → Adjust → Regenerate
   - Keep previous versions for comparison
   - Document changes and rationale

3. **Conflict Resolution:**
   - Review faculty schedules carefully
   - Check for room double-bookings
   - Verify student group separations
   - Ensure break times are respected

### File Management

1. **Version Control:**
   - Name files with dates: `combined_2025-11-17.csv`
   - Keep backup copies of CSV files
   - Archive previous timetables
   - Document configuration changes

2. **Organization:**
   ```
   Timetables/
   ├── 2025-Fall/
   │   ├── inputs/
   │   │   ├── combined.csv
   │   │   └── rooms.csv
   │   ├── outputs/
   │   │   ├── timetable_all_departments.xlsx
   │   │   └── all_faculty_timetables.xlsx
   │   └── config/
   │       └── config.json
   └── 2026-Spring/
       └── ...
   ```

3. **Backup Strategy:**
   - Daily backups of CSV files
   - Weekly archives of generated timetables
   - Cloud storage for critical files
   - Version control with Git (optional)

### Testing and Validation

1. **Pre-Generation Checks:**
   - ✅ All courses have faculty assigned
   - ✅ Room capacities exceed class sizes
   - ✅ Lab courses have lab rooms available
   - ✅ No obvious conflicts in input data

2. **Post-Generation Validation:**
   - ✅ No time slot conflicts for faculty
   - ✅ No room double-bookings
   - ✅ Breaks are properly scheduled
   - ✅ All courses are scheduled
   - ✅ Lab sessions in appropriate rooms

3. **Faculty Review:**
   - Share individual schedules for approval
   - Collect feedback
   - Make adjustments as needed
   - Get final sign-off

### Communication

1. **Before Generation:**
   - Announce timetable generation timeline
   - Request input data from departments
   - Set deadline for changes
   - Communicate constraints and limitations

2. **After Generation:**
   - Share preliminary version for review
   - Allow feedback period (2-3 days)
   - Make necessary adjustments
   - Publish final version
   - Distribute individual faculty schedules

3. **Documentation:**
   - Keep change log
   - Document special requests
   - Note any compromises made
   - Archive communication threads

---

## ❓ Frequently Asked Questions

### General Questions

**Q: How long does timetable generation take?**
A: Typically 10-30 seconds, depending on the number of courses, departments, and rooms. Large institutions (100+ courses) may take up to 2 minutes.

**Q: Can I generate timetables for multiple semesters?**
A: Yes, include all semesters in your `combined.csv` file. The system will generate separate timetables for each department-semester combination.

**Q: What happens if there's no suitable room for a course?**
A: The system will report an error. You'll need to either add more rooms, increase room capacities, or reduce class sizes.

**Q: Can I modify the timetable after generation?**
A: Currently, you must edit the Excel file manually. Future versions may include in-browser editing.

### File Upload Questions

**Q: What file formats are supported?**
A: Only CSV (Comma-Separated Values) files are supported. Export from Excel using "Save As" → "CSV UTF-8".

**Q: My CSV has special characters. Will it work?**
A: Use UTF-8 encoding to preserve special characters (é, ñ, ö, etc.). Most modern editors save in UTF-8 by default.

**Q: Can I upload files with different column names?**
A: No, column names must match exactly as specified in this manual. They are case-sensitive.

**Q: What's the maximum file size?**
A: The system can handle files up to 10 MB. For larger institutions, consider splitting by academic year or department.

### Configuration Questions

**Q: Can I change the working days?**
A: Yes, edit `config.json` and modify the `working_days` array. You can include/exclude Saturday or have a 4-day week.

**Q: How do I add a morning break?**
A: In `config.json`, set `morning_break.enabled` to `true` and specify the `start_time` and `duration_minutes`.

**Q: Can I schedule classes on weekends?**
A: Yes, add "Saturday" and/or "Sunday" to the `working_days` array in `config.json`.

**Q: How do I change exam duration?**
A: Edit `exam_config.json` and change `exam_duration_minutes` (e.g., 120 for 2 hours, 180 for 3 hours).

### Scheduling Questions

**Q: How does the system handle basket courses?**
A: Courses with codes starting with `B1-`, `B2-`, etc. are grouped together and scheduled in the same time slot since students choose one from the group.

**Q: Can two lectures be scheduled back-to-back?**
A: Yes, if `allow_back_to_back_lectures` is `true` in `config.json`. Set to `false` to force breaks between lectures.

**Q: How are labs scheduled?**
A: Labs require rooms of type `COMPUTER_LAB` or `HARDWARE_LAB`. If `prefer_morning_labs` is true, they're scheduled in morning slots when possible.

**Q: What if a faculty teaches multiple courses?**
A: The system automatically detects conflicts and ensures the same faculty isn't scheduled in two places at once.

### Output Questions

**Q: Where are the generated files saved?**
A: Files are saved in the `TimeTable-main/` directory and can be downloaded through the web interface.

**Q: Can I get output in PDF format?**
A: Currently only Excel (.xlsx) format is supported. You can open the Excel file and export to PDF manually.

**Q: Why are some cells colored?**
A: Colors indicate course types: Blue (lectures), Green (labs), Yellow (tutorials), Orange (electives).

**Q: Can I customize the Excel formatting?**
A: Yes, but you'll need to edit the Python code (`TT_gen.py`) where styles are defined.

### Troubleshooting Questions

**Q: Generation failed with "No module named 'pandas'". What now?**
A: Run `pip install -r requirements.txt` to install all Python dependencies.

**Q: The web interface is blank. What's wrong?**
A: Check that both backend (port 5000) and frontend (port 3000) are running. Open browser console (F12) for errors.

**Q: Can I run this on a server without a desktop?**
A: Yes, use the command-line interface. The web UI is optional.

**Q: How do I report a bug?**
A: Check existing issues on the project's GitHub repository or contact the development team.

### Technical Questions

**Q: What database does the system use?**
A: None. All data is processed in-memory from CSV files.

**Q: Can I integrate this with our existing student system?**
A: Yes, export data from your system to the CSV format required by this application.

**Q: Is the code open source?**
A: Check the project's LICENSE file for details.

**Q: Can I contribute to the project?**
A: Yes! Check the CONTRIBUTING.md file (if available) or contact the maintainers.

---

## 📞 Support and Resources

### Documentation Files

The `readme/` folder contains additional documentation:

- **ARCHITECTURE.md**: Technical architecture details
- **EXAM_TIMETABLE_GUIDE.md**: Exam scheduling specifics
- **SEAT_ARRANGEMENT_GUIDE.md**: Seating arrangement features
- **QUICK_REFERENCE.md**: Quick command reference
- **REFACTORING_SUMMARY.md**: Recent code changes
- **UI_SETUP_GUIDE.md**: Frontend setup details

### Getting Help

1. **Check Documentation**: Review this manual and other docs first
2. **Check Logs**: Look at terminal output and browser console
3. **Search Issues**: Check if others have reported similar problems
4. **Ask the Team**: Contact your system administrator or development team

### Contact Information

For support, contact:
- **Email**: [Your institution's IT support]
- **Phone**: [Support hotline]
- **Website**: [Project website or documentation portal]

---

## 📝 Appendix

### Glossary

- **Basket Course**: Elective course group where students choose one option
- **Conflict**: Two events scheduled for the same resource (faculty/room) at the same time
- **Lab**: Practical session requiring specialized room (computer/hardware lab)
- **Lecture**: Theory class in a standard classroom
- **Slot**: Time period unit (typically 15 or 30 minutes)
- **Tutorial**: Small group discussion or problem-solving session
- **Faculty**: Instructor or professor teaching courses
- **Room Allocation**: Process of assigning rooms to courses based on capacity and type

### Keyboard Shortcuts (Web Interface)

- **Ctrl/Cmd + U**: Focus on file upload
- **Ctrl/Cmd + G**: Generate timetable (when files uploaded)
- **Ctrl/Cmd + E**: Generate exam timetable
- **Ctrl/Cmd + R**: Refresh page
- **F12**: Open browser developer tools

### Sample Commands

**Check Python version:**
```bash
python --version
```

**Check Node.js version:**
```bash
node --version
```

**Install dependencies:**
```bash
npm install
pip install -r requirements.txt
```

**Start servers:**
```bash
npm start
npm run start:ui
```

**Generate timetable via CLI:**
```bash
python TT_gen.py
```

**Generate exam timetable:**
```bash
python exam_timetable.py --start-date 2025-12-01
```

---

## 📄 Changelog

### Version 1.0 (November 17, 2025)
- Initial user manual release
- Complete documentation for web interface
- CSV format guide
- Configuration options
- Troubleshooting section
- Advanced usage examples
- Best practices guide

---

## 📜 License

[Include your license information here]

---

## 🙏 Acknowledgments

This system was developed to streamline academic timetable generation and improve efficiency for educational institutions. Special thanks to all contributors and users who provided feedback.

---

**End of User Manual**

For the latest version of this manual, visit: [Your documentation portal]
Last updated: November 17, 2025
