# 📖 User Guide - Timetable Automation System

## Quick Start in 3 Steps

### Step 1: Start the Application
```bash
cd TimeTable-main
./start.sh
```
Or manually:
```bash
# Terminal 1
npm start

# Terminal 2  
npm run start:ui
```

### Step 2: Upload Your CSV Files

1. Open your browser to **http://localhost:3000**
2. You'll see a beautiful purple gradient interface
3. Click on the "Upload Input Files" section
4. Select your **combined.csv** file (course data)
5. Select your **rooms.csv** file (room information)
6. Click **📤 Upload Files**
7. Wait for "✅ Files uploaded successfully" message

### Step 3: Generate & Download

1. Click **🗓️ Generate Timetable** button
2. Wait for processing (you'll see status updates)
3. When complete, download buttons will appear
4. Click any file to download:
   - `timetable_all_departments.xlsx` - Complete timetable
   - `all_faculty_timetables.xlsx` - Faculty schedules
   - `exam_timetable.xlsx` - Exam schedule (if generated)

---

## 📊 What Each File Contains

### `timetable_all_departments.xlsx`
Contains timetables for all departments and semesters:
- Overview sheet with all department/semester combinations
- Individual sheets for each department-semester
- Color-coded courses
- Room allocations
- Faculty assignments
- Time slots from 9:00 AM to 6:30 PM

### `all_faculty_timetables.xlsx`
Individual schedules for every faculty member:
- Overview sheet listing all faculty
- One sheet per faculty member
- Shows all their classes across the week
- Includes course codes, names, rooms, and departments

### `exam_timetable.xlsx`
Examination schedule:
- Date-wise exam slots
- Morning and afternoon sessions
- Room allocations based on student count
- Department and semester wise organization

---

## 🎨 UI Features Explained

### File Upload Section
- **Before Upload**: White input boxes
- **File Selected**: Green checkmark (✓) with filename
- **Upload Button**: Disabled until both files selected
- **After Upload**: Success message with green checkmark

### Action Buttons
- **Generate Timetable**: Purple gradient button
- **Generate Exam Timetable**: Pink gradient button
- Hover effects with shadow elevation
- Disabled during processing

### Status Box
- **Blue Background**: Shows current operation
- **Status Messages**:
  - 📤 "Uploading files..."
  - ⚙️ "Generating Timetable..."
  - ✅ "Timetable generated successfully!"
  - ❌ "Error: [specific issue]"

### Download Section
- Appears after successful generation
- Green gradient buttons for each file
- Click to download immediately
- Files download to your default Downloads folder

---

## 📝 CSV File Format Guide

### combined.csv Structure
```csv
Department,Semester,Course Code,Course Name,L,T,P,S,C,Faculty,Schedule,total_students
CSE,2,CS162,Optimization,3,1,0,0,2,Dr. Smith,Yes,70
```

**Column Explanations:**
- `Department`: CSE, ECE, DSAI, etc.
- `Semester`: 2, 4, 6, 8
- `Course Code`: Unique identifier (CS162, B1-CS471, etc.)
- `Course Name`: Full course title
- `L`: Lecture hours per week
- `T`: Tutorial hours per week
- `P`: Practical/Lab hours per week
- `S`: Self-study hours per week
- `C`: Credits
- `Faculty`: Professor name (use "/" for multiple: "Dr. A/Dr. B")
- `Schedule`: "Yes" to include in timetable
- `total_students`: Number of enrolled students

**Special Course Codes:**
- Regular: `CS162`, `MA202`
- Basket Courses: `B1-CS471`, `B2-abc005` (grouped electives)

### rooms.csv Structure
```csv
id,capacity,type,roomNumber
R001,70,LECTURE_ROOM,101
R002,35,COMPUTER_LAB,Lab1
R003,120,SEATER_120,Auditorium
```

**Room Types:**
- `LECTURE_ROOM`: Regular classrooms
- `COMPUTER_LAB`: Lab with computers
- `HARDWARE_LAB`: Engineering/hardware lab
- `SEATER_120`: Large auditorium
- `LIBRARY`: Not used for scheduling

---

## 🔧 Configuration Options

### ConfigPanel in UI
- **Lecture Duration**: Default 3 half-hour slots (1.5 hours)
- **Lab Duration**: Default 4 half-hour slots (2 hours)
- **Exam Slots**: Default 2 slots per day

### exam_config.json
```json
{
  "exam_duration_minutes": 180,
  "morning_start": "09:00",
  "afternoon_start": "14:00",
  "slots_per_day": 2,
  "course_room_capacity_buffer": 1.1
}
```

### config.json (Advanced)
```json
{
  "duration_constants": {
    "hour_slots": 2,
    "lecture_duration": 3,
    "lab_duration": 4,
    "tutorial_duration": 2,
    "self_study_duration": 2,
    "break_duration": 1
  }
}
```

---

## ❓ Common Questions

### Q: What happens when I upload files?
A: Files are copied to the `uploads/` directory and then moved to the project root where Python scripts can access them.

### Q: How long does generation take?
A: Typically 10-30 seconds depending on:
- Number of departments
- Number of courses
- Number of semesters
- Complexity of scheduling constraints

### Q: Can I generate timetables multiple times?
A: Yes! Each generation overwrites previous files. Download your files before generating again if you want to keep old versions.

### Q: What if generation fails?
A: Check the status box for error messages:
- "Please upload CSV files first" - Upload files before generating
- "No suitable room found" - Add more rooms to rooms.csv
- "Faculty conflict" - Review faculty assignments in combined.csv

### Q: Where are downloaded files saved?
A: Your browser's default Downloads folder (usually `~/Downloads` on Mac, `C:\Users\YourName\Downloads` on Windows)

### Q: Can I modify the timetable after generation?
A: Currently, you must edit the Excel file manually. Future versions will support in-browser editing.

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000

# Kill process if needed
kill -9 <PID>

# Restart backend
npm start
```

### UI won't start
```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill process if needed
kill -9 <PID>

# Restart UI
npm run start:ui
```

### Upload fails
- Check file formats (.csv only)
- Verify column headers match exactly
- Ensure no special characters in filenames
- Check backend terminal for Python errors

### Generation fails
- Review uploaded CSV files for errors
- Check Python terminal output
- Verify all required columns present
- Ensure faculty names don't have typos

### Downloads don't work
- Check if files were generated (look in project root)
- Try right-click → "Save Link As"
- Clear browser cache
- Check browser's download settings

---

## 💡 Tips & Best Practices

### CSV File Preparation
1. **Use UTF-8 encoding** for special characters
2. **No empty rows** in the middle of data
3. **Consistent formatting** for faculty names
4. **Verify room capacities** match actual rooms

### Faculty Names
- Use consistent spelling: "Dr. Smith" not "Dr Smith" or "Dr. smith"
- For team-taught courses: "Dr. A/Dr. B" or "Dr. A and Dr. B"
- Include titles for clarity

### Course Codes
- Keep them short and meaningful
- Use department prefix: CS, EC, DS, MA, HS
- Basket courses start with B: B1-CS471

### Room Management
- Add 10-20% buffer rooms for flexibility
- Ensure lab rooms match course requirements
- Use large rooms (SEATER_120) for combined classes

---

## 🎯 Workflow Example

1. **Monday Morning**: Prepare CSV files
   - Export course data from registrar system
   - Update room information
   - Review faculty assignments

2. **Upload & Generate** (5 minutes)
   - Open http://localhost:3000
   - Upload both CSV files
   - Click Generate Timetable
   - Wait for confirmation

3. **Review** (10-15 minutes)
   - Download all Excel files
   - Open in Excel/LibreOffice
   - Check for conflicts
   - Verify room allocations

4. **Iterate if Needed**
   - Modify CSV files based on review
   - Re-upload and regenerate
   - Compare versions

5. **Finalize & Distribute**
   - Download final versions
   - Email faculty their individual schedules
   - Post department timetables
   - Archive for records

---

## 📧 Need Help?

- Check the **REFACTORING_SUMMARY.md** for technical details
- Review **README_SETUP.md** for installation issues
- Look at **exam_config.json** for exam settings
- Contact Software Psych team for support

---

**Happy Scheduling! 🎓📅**
