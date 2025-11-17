# 📋 New Features Implementation Guide

## Overview
This document describes the newly implemented features to complete the remaining requirements.

---

## ✅ REQ-11: Faculty Preference System (MANDATORY)

### Implementation
Faculty can now specify their preferred teaching days and times, which will be prioritized during scheduling.

### Configuration File: `faculty_preferences.csv`

**Format:**
```csv
Faculty,Course Code,Preferred Day,Preferred Time,Priority
Dr. Smith,CS162,Monday,09:00,HIGH
Dr. Johnson,CS201,Wednesday,14:00,MEDIUM
Prof. Williams,EC301,Friday,10:30,HIGH
```

**Columns:**
- `Faculty`: Faculty name (must match combined.csv)
- `Course Code`: Course code to schedule
- `Preferred Day`: Monday/Tuesday/Wednesday/Thursday/Friday
- `Preferred Time`: Start time in HH:MM format (24-hour)
- `Priority`: HIGH/MEDIUM/LOW (HIGH preferences scheduled first)

### How It Works
1. System loads faculty preferences before scheduling
2. HIGH priority preferences are scheduled first
3. MEDIUM and LOW priorities scheduled after core requirements
4. If preferred slot unavailable, system finds next best slot

### Usage
```python
# Preferences are automatically loaded in TT_gen.py
faculty_preferences = load_faculty_preferences()
```

---

## ✅ REQ-12: Coordinator Slot Reservation (MANDATORY)

### Implementation
Coordinators can reserve specific time slots that will be blocked from course scheduling.

### Configuration File: `reserved_slots.json`

**Format:**
```json
{
  "description": "Reserved time slots for coordinators",
  "reserved_slots": {
    "Wednesday": {
      "CSE": {
        "semesters": ["2", "4"],
        "slots": [["13:00", "14:00"]]
      }
    },
    "Friday": {
      "ALL": {
        "semesters": ["ALL"],
        "slots": [["16:00", "17:00"]]
      }
    }
  }
}
```

**Structure:**
- Day name → Department → Semesters → Time ranges
- Use "ALL" for all departments or all semesters
- Time ranges in HH:MM format

### How It Works
1. System loads reserved slots before scheduling
2. Checks each slot against reserved times
3. Skips scheduling courses in reserved slots
4. Works across departments and semesters

---

## ✅ REQ-01: Incremental Timetable Modification (DESIRED)

### Implementation
New `timetable_modifier.py` module allows reading and modifying existing timetables without regenerating everything.

### Features
- Read existing timetable Excel files
- Add new courses with minimal disruption
- Remove courses while preserving rest of schedule
- Automatic conflict detection
- Change logging

### Usage

**Add a Course:**
```python
from timetable_modifier import add_course_to_timetable

add_course_to_timetable(
    course_code='CS999',
    course_name='Advanced AI',
    faculty='Dr. Smith',
    department='CSE',
    semester='6',
    l=3, t=1, p=0
)
```

**Remove a Course:**
```python
from timetable_modifier import remove_course_from_timetable

remove_course_from_timetable(
    course_code='CS999',
    department='CSE',
    semester='6'
)
```

**Advanced Usage:**
```python
from timetable_modifier import TimetableModifier

modifier = TimetableModifier('timetable_all_departments.xlsx')

# Add multiple courses
modifier.add_course('CSE_2', course_info)
modifier.add_course('CSE_4', course_info2)

# Save changes
modifier.save_timetable()

# Export change log
modifier.export_changes_log('changes.json')
```

---

## ✅ REQ-17: Teaching Assistant Allocation (DESIRED)

### Implementation
Automatic TA allocation for courses with >100 students (configurable threshold).

### Configuration File: `teaching_assistants.csv`

**Format:**
```csv
TA Name,Email,Department,Available Days,Available Times,Course Preferences,Type
John Doe,john@example.com,CSE,"Monday,Wednesday,Friday",09:00-17:00,CS162;CS201,TEACHING
Jane Smith,jane@example.com,CSE,"Tuesday,Thursday",10:00-16:00,CS162,LAB
```

**Columns:**
- `TA Name`: Full name
- `Email`: Contact email
- `Department`: CSE/DSAI/ECE
- `Available Days`: Comma-separated days
- `Available Times`: Time range
- `Course Preferences`: Semicolon-separated course codes (or "ALL")
- `Type`: TEACHING/LAB/BOTH

### How It Works
1. System loads TA information
2. For each course with >100 students:
   - Filters TAs by department
   - Matches course preferences
   - Allocates 1 TA per 50 students
3. TA allocations saved in `ta_allocations` dictionary
4. Can be exported to Excel

### Usage
```python
# Automatic allocation during timetable generation
tas = load_teaching_assistants()
allocated = allocate_teaching_assistants(
    course_code='CS162',
    course_name='Data Structures',
    faculty='Dr. Smith',
    total_students=150,
    department='CSE',
    tas=tas,
    ta_allocations={},
    threshold=100
)
# Returns: ['John Doe', 'Jane Smith', 'Mike Johnson']
```

---

## ✅ REQ-16: Analytics and Reporting (DESIRED)

### Implementation
New `analytics.py` module generates comprehensive reports on room usage, faculty effort, and student load.

### Generated Report: `analytics_report.xlsx`

**Sheets:**
1. **Overview** - Summary and navigation
2. **Room Usage** - Classroom utilization statistics
3. **Faculty Effort** - Teaching load distribution
4. **Student Effort** - Course load by semester

### Features

**Room Usage Analysis:**
- Usage hours per week
- Utilization percentage
- Peak usage days
- Status indicators (High/Moderate/Low)

**Faculty Effort Analysis:**
- Courses taught
- Total credits
- Lecture/Lab/Tutorial hours breakdown
- Load status (Overloaded/Optimal/Underutilized)

**Student Effort Analysis:**
- Department and semester grouping
- Total courses and credits
- Contact hours per week
- Load status (Heavy/Moderate/Light)

### Usage
```bash
# Generate analytics report
python analytics.py
```

Or programmatically:
```python
from analytics import generate_analytics_report

report_file = generate_analytics_report(
    timetable_file='timetable_all_departments.xlsx',
    faculty_file='all_faculty_timetables.xlsx',
    combined_csv='combined.csv',
    rooms_csv='rooms.csv'
)
# Generates: analytics_report.xlsx
```

---

## ✅ REQ-13: Google Calendar Integration (SPECIAL)

### Implementation
New `calendar_export.py` module generates iCalendar (.ics) files that can be imported into any calendar application.

### Features
- Generate .ics files for all faculty
- Import into Google Calendar, Outlook, Apple Calendar
- Recurring weekly events (16-week semester)
- Includes course details, room, and timings

### Generated Files
- Individual .ics file per faculty member
- Saved in `calendar_exports/` directory
- Format: `FacultyName_schedule.ics`

### Usage

**Generate All Faculty Calendars:**
```bash
python calendar_export.py
```

**Generate Single Faculty Calendar:**
```python
from calendar_export import generate_single_faculty_calendar

calendar_file = generate_single_faculty_calendar('Dr. Smith')
# Generates: Dr_Smith_schedule.ics
```

### How to Import

**Google Calendar:**
1. Open Google Calendar
2. Click Settings (gear icon) → Settings
3. Click "Import & Export" in left sidebar
4. Click "Select file from your computer"
5. Choose the .ics file
6. Select calendar to import into
7. Click "Import"

**Outlook:**
1. File → Open & Export → Import/Export
2. Select "Import an iCalendar (.ics) file"
3. Browse and select .ics file
4. Click "Import"

**Apple Calendar:**
1. File → Import
2. Select .ics file
3. Choose calendar
4. Click "Import"

---

## 📊 Summary of Completions

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| REQ-01 (Desired) | ✅ | `timetable_modifier.py` |
| REQ-11 (Mandatory) | ✅ | `faculty_preferences.csv` + TT_gen.py |
| REQ-12 (Mandatory) | ✅ | `reserved_slots.json` + TT_gen.py |
| REQ-13 (Special) | ✅ | `calendar_export.py` + .ics files |
| REQ-16 (Desired) | ✅ | `analytics.py` + analytics_report.xlsx |
| REQ-17 (Desired) | ✅ | `teaching_assistants.csv` + TT_gen.py |

---

## 🚀 Quick Start

1. **Install new dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure preferences (optional):**
   - Edit `faculty_preferences.csv`
   - Edit `reserved_slots.json`
   - Edit `teaching_assistants.csv`

3. **Generate timetable:**
   ```bash
   python TT_gen.py
   ```

4. **Generate analytics:**
   ```bash
   python analytics.py
   ```

5. **Export calendars:**
   ```bash
   python calendar_export.py
   ```

6. **Modify existing timetable:**
   ```bash
   python timetable_modifier.py
   ```

---

## 📝 Notes

- All new features are **backward compatible**
- Works with existing `combined.csv` and `rooms.csv`
- Configuration files are optional (system works without them)
- Sample configuration files provided with examples
- Analytics require completed timetable generation first
- Calendar export requires `all_faculty_timetables.xlsx`

---

## 🔧 Troubleshooting

**Faculty preferences not working:**
- Check faculty names match exactly in `combined.csv` and `faculty_preferences.csv`
- Verify time format is HH:MM (24-hour)
- Ensure day names are spelled correctly

**Reserved slots being ignored:**
- Verify JSON syntax in `reserved_slots.json`
- Check department and semester values match data
- Time ranges must be in HH:MM format

**TA allocation not happening:**
- Verify student count in `combined.csv` exceeds threshold (default 100)
- Check TA department matches course department
- Ensure course codes in preferences match actual courses

**Calendar import fails:**
- Verify `all_faculty_timetables.xlsx` exists
- Check .ics file is valid (open in text editor)
- Try importing into different calendar app

**Analytics report empty:**
- Run `TT_gen.py` first to generate timetables
- Verify input files exist and have data
- Check file paths are correct

---

## 📧 Support

For issues or questions, refer to the main README.md or contact the development team.

**Version:** 3.0
**Last Updated:** November 16, 2025
