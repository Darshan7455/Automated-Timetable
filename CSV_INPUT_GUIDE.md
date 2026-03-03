# CSV Input Configuration Guide

## Overview
The timetable generation system has been modified to read configuration data from CSV files instead of hardcoded values. This makes the system more flexible and easier to customize without modifying the code.

## Related Documentation
- **[How to Add New Subjects](HOW_TO_ADD_SUBJECTS.md)** - Complete guide on adding courses to the timetable
- **[Quick Add Subject Example](QUICK_ADD_SUBJECT_EXAMPLE.md)** - Simple step-by-step example
- This document - Configuration for colors and excluded rooms

## New CSV Files Created

### 1. colors.csv
Location: Root directory and TimeTable-main directory

**Purpose**: Defines color schemes for timetable visualization

**Columns**:
- `color_type`: Type of color (palette, subject, basket_group)
- `identifier`: Unique identifier for the color (numeric for palette/subject, group code for basket_group)
- `hex_color`: Hexadecimal color code (without #)

**Example**:
```csv
color_type,identifier,hex_color
palette,1,FF5733
subject,1,FF6B6B
basket_group,B1,FFA07A
```

**Usage**: You can add, remove, or modify colors by editing this file. The system will automatically load these colors when generating timetables.

### 2. excluded_rooms.csv
Location: Root directory and TimeTable-main directory

**Purpose**: Lists rooms that should be excluded from exam scheduling (e.g., large halls reserved for special events)

**Columns**:
- `roomNumber`: Room number to exclude
- `reason`: Description of why the room is excluded

**Example**:
```csv
roomNumber,reason
C002,Large hall - reserved for special events
C003,Large hall - reserved for special events
```

**Usage**: Add or remove room numbers from this file to control which rooms are excluded from exam scheduling.

## Existing CSV Files Already in Use

The project was already using the following CSV files:

1. **combined.csv** - Course data (Department, Semester, Course Code, Course Name, Faculty, etc.)
2. **rooms.csv** - Room information (room ID, room number, capacity, type)
3. **faculty_preferences.csv** - Faculty scheduling preferences (optional)
4. **teaching_assistants.csv** - TA information (optional)

## Code Changes Made

### Modified Files:
1. **TT_gen.py** (both root and TimeTable-main directories)
   - Added `load_colors()` function to read colors from colors.csv
   - Replaced hardcoded COLOR_PALETTE, subject_colors, and basket_group_colors with CSV-based loading
   - Includes fallback to default values if colors.csv is not found

2. **exam_timetable.py** (both root and TimeTable-main directories)
   - Added `load_excluded_rooms()` function to read excluded rooms from excluded_rooms.csv
   - Replaced all hardcoded excluded rooms lists with CSV-based loading
   - Includes fallback to default values if excluded_rooms.csv is not found

## Benefits

1. **No Code Modification Required**: Change colors or excluded rooms by simply editing CSV files
2. **Easy Customization**: Administrators can customize settings without programming knowledge
3. **Version Control Friendly**: Configuration changes are tracked separately from code
4. **Fallback Safety**: System uses default values if CSV files are missing or corrupted
5. **Scalability**: Easy to add new colors or excluded rooms without touching code

## How to Customize

### To Change Colors:
1. Open `colors.csv` in any spreadsheet application or text editor
2. Modify existing colors or add new rows
3. Save the file
4. Run the timetable generation - new colors will be applied automatically

### To Exclude Additional Rooms:
1. Open `excluded_rooms.csv` in any spreadsheet application or text editor
2. Add new rows with room numbers and reasons
3. Save the file
4. Run the exam timetable generation - excluded rooms will be respected

### To Modify Course or Room Data:
1. Edit `combined.csv` for course information
2. Edit `rooms.csv` for room information
3. Save the files
4. Run the timetable generation with updated data

## Error Handling

All CSV loading functions include error handling:
- If a CSV file is not found, the system uses default hardcoded values
- Error messages are printed to console for debugging
- The system continues to operate even if CSV files are missing

## Migration Notes

**Before**: Colors and excluded rooms were hardcoded in Python files
**After**: Colors and excluded rooms are loaded from CSV files with fallback to defaults

This ensures backward compatibility - the system will work even if you don't create the new CSV files, but you get the added flexibility of CSV-based configuration when needed.
