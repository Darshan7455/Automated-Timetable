# Exam Timetable Generator

This module generates exam schedules from course data, with configurable time slots and room assignments.

## Setup

Requirements:
```
pandas>=1.3.0  # for data loading/processing
openpyxl>=3.0.0  # if using Excel output
```

Install:
```bash
pip install -r requirements.txt
```

## Usage

### Basic Usage

Generate an exam schedule using course data from `combined.csv`:

```bash
python TimeTable-main/exam_timetable.py
```

This writes `exam_timetable.csv` in the repository root with columns:
- Department 
- Semester
- Course Code
- Course Name 
- Students (total)
- Day
- Slot (1=morning, 2=afternoon)
- Time
- Rooms (comma-separated room IDs)
- Date (if --start-date provided)

### Options

Specify output path and start date:

```bash
python TimeTable-main/exam_timetable.py --out my_exams.csv --start-date 2025-12-01
```

### Configuration 

The module reads these files if present:

1. `combined.csv` (required) - Course data with columns:
   - Department
   - Semester  
   - Course Code
   - Course Name
   - total_students (optional)

2. `rooms.csv` (optional) - Room data with columns:
   - id
   - roomNumber
   - capacity 
   - type

3. `TimeTable-main/exam_config.json` (optional) - Scheduling parameters:
   ```json
   {
     "exam_duration": 3,
     "slots_per_day": 2,
     "morning_start": "09:00",
     "afternoon_start": "14:00", 
     "gap_between_exams": 1,
     "rooms_per_exam": 2,
     "students_per_room": 30,
     "buffer_time": 30
   }
   ```

## Notes

- Schedules exams grouped by department and semester
- Skips weekends when --start-date provided
- Tries to minimize room splits using greedy allocation
- Uses defaults if config files missing