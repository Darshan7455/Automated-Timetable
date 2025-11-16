# Exam Timetable Generation Guide

## Overview
The exam timetable generator allows you to create exam schedules with custom dates. It automatically schedules exams for all courses while avoiding conflicts (same faculty, same students, same rooms).

## Features
- ✅ Input custom exam dates
- ✅ Automatic conflict detection (faculty, students, rooms)
- ✅ Room allocation based on student capacity
- ✅ Multiple time slots per day (morning and afternoon)
- ✅ Excel output with multiple sheets (overview, schedule, date-wise breakdown)

## Usage

### Method 1: Using the Web UI

1. Start the server:
   ```bash
   cd TimeTable-main
   npm start
   ```

2. Open the web interface (usually at `http://localhost:3000`)

3. Click "📝 Generate Exam Timetable" button

4. Enter exam dates in the text area:
   - **Accepted formats:**
     - `DD-MM-YYYY` (e.g., `15-01-2024`) - **Recommended**
     - `DD/MM/YYYY` (e.g., `15/01/2024`)
     - `YYYY-MM-DD` (e.g., `2024-01-15`)
     - `YYYY/MM/DD` (e.g., `2024/01/15`)
   - One date per line or comma-separated
   - Example:
     ```
     15-01-2024
     16-01-2024
     17-01-2024
     ```

5. Click "✅ Generate Exam Timetable"

6. Download the generated `exam_timetable.xlsx` file

### Method 2: Using Command Line

1. **With dates as command line argument:**
   ```bash
   # Using DD-MM-YYYY format (recommended)
   python exam_timetable.py '["15-01-2024","16-01-2024","17-01-2024"]'
   
   # Or using YYYY-MM-DD format
   python exam_timetable.py '["2024-01-15","2024-01-16","2024-01-17"]'
   ```

2. **With dates in JSON file:**
   Create `exam_dates.json`:
   ```json
   {
     "dates": ["15-01-2024", "16-01-2024", "17-01-2024"]
   }
   ```
   
   **Note:** You can use any of these formats: `DD-MM-YYYY`, `DD/MM/YYYY`, `YYYY-MM-DD`, or `YYYY/MM/DD`
   Then run:
   ```bash
   python exam_timetable.py
   ```

3. **Without dates (uses default - next 10 weekdays):**
   ```bash
   python exam_timetable.py
   ```

## Configuration

Edit `exam_config.json` to customize:
- `exam_duration_minutes`: Duration of each exam (default: 180 minutes = 3 hours)
- `exam_slots_per_day`: Number of exam slots per day (default: 2)
- `morning_slot_start`: Start time for morning slot (default: "09:00")
- `afternoon_slot_start`: Start time for afternoon slot (default: "14:00")

Example:
```json
{
    "exam_duration_minutes": 180,
    "exam_slots_per_day": 2,
    "morning_slot_start": "09:00",
    "afternoon_slot_start": "14:00"
}
```

## Output

The generator creates `exam_timetable.xlsx` with the following sheets:

1. **Overview**: Summary of scheduled exams and dates
2. **Exam Schedule**: Complete list of all exams with details
3. **Date-wise sheets**: One sheet per exam date showing exams for that day
4. **Unscheduled Exams** (if any): List of exams that couldn't be scheduled

## Conflict Avoidance

The system automatically avoids:
- **Faculty conflicts**: Same faculty can't have two exams at the same time
- **Student conflicts**: Same department-semester can't have two exams at the same time
- **Room conflicts**: Same room can't be used for two exams at the same time

## Requirements

- `combined.csv`: Course data with columns: Department, Semester, Course Code, Course Name, Faculty, total_students
- `rooms.csv`: Room data with columns: id, roomNumber, capacity, type

## Notes

- Exams are scheduled in order of priority (larger courses first)
- Room allocation is based on student capacity
- If a course can't be scheduled, it will appear in the "Unscheduled Exams" sheet
- The system tries to minimize the number of days required

