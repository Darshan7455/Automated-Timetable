# How to Add New Subjects to the Timetable System

## Overview
The timetable system **automatically** allocates any new subject you add to the input CSV files. When you add a course to `combined.csv` and run the timetable generator, it will be scheduled automatically.

## Steps to Add a New Subject

### 1. Add Course to combined.csv

Open `combined.csv` and add a new row with the following required columns:

**Required Columns:**
- `Department` - Department code (e.g., CSE, ECE, ME)
- `Semester` - Semester number (e.g., 2, 4, 6, 8)
- `Course Code` - Unique course identifier (e.g., CS301, MA202)
- `Course Name` - Full name of the course
- `L` - Number of lecture hours per week
- `T` - Number of tutorial hours per week
- `P` - Number of practical/lab hours per week
- `S` - Number of self-study hours per week
- `C` - Credits
- `Faculty` - Faculty name (use "/" to separate multiple faculty options)
- `Schedule` - Set to "Yes" to include in timetable (or leave empty, defaults to Yes)
- `total_students` - Number of students enrolled

**Example Entry:**
```csv
CSE,4,CS402,Artificial Intelligence,3,1,2,0,4,Dr. John Smith,Yes,65
```

### 2. System Processing

When you run the timetable generator, the system will:

1. ✅ **Read all courses** from combined.csv
2. ✅ **Filter by Department and Semester**
3. ✅ **Check Schedule column** (only "Yes" or empty entries are included)
4. ✅ **Calculate required sessions** based on L, T, P, S values:
   - Lectures (L): Each lecture = 3 time slots (1.5 hours)
   - Tutorials (T): Each tutorial = 2 time slots (1 hour)
   - Labs (P): Each lab = 4 time slots (2 hours)
   - Self-Study (S): Scheduled as needed
5. ✅ **Assign colors** automatically from colors.csv
6. ✅ **Allocate time slots** based on:
   - Professor availability
   - Room availability
   - Student timetable conflicts
   - Faculty preferences (if specified in faculty_preferences.csv)
7. ✅ **Assign rooms** from rooms.csv based on course type:
   - Lectures → LECTURE_ROOM
   - Labs → COMPUTER_LAB
   - Large sections → SEATER_120

### 3. What Happens Automatically

**The system handles:**
- ✅ Color assignment for the new course
- ✅ Time slot allocation avoiding conflicts
- ✅ Room assignment based on student count
- ✅ Faculty schedule management
- ✅ Elective course synchronization (if applicable)
- ✅ TA assignment (if teaching_assistants.csv is configured)

## Course Types

### Core Courses
Regular departmental courses that all students must take.

**Example:**
```csv
CSE,4,CS301,Operating Systems,3,1,0,0,4,Dr. Kumar,Yes,70
```

### Elective Courses (Basket Courses)
Courses with codes starting with "B" followed by a number and hyphen.

**Example:**
```csv
CSE,4,B1-CS401,Cloud Computing,2,0,0,2,0,Dr. Sharma,Yes,45
```

**Note:** Elective courses are synchronized across sections - all sections have the same elective at the same time.

### Lab Courses
Courses with P (practical) hours greater than 0.

**Example:**
```csv
CSE,4,CS305,Database Lab,0,0,2,0,2,Prof. Reddy,Yes,70
```

### Self-Study Courses
Courses with only S (self-study) hours and L, T, P all zero.

**Example:**
```csv
CSE,4,CS399,Research Methods,0,0,0,2,2,Dr. Gupta,Yes,70
```

## Schedule Control

### Include in Timetable
Set `Schedule` column to "Yes" or leave empty:
```csv
CSE,4,CS402,AI,3,1,2,0,4,Dr. Smith,Yes,65
```

### Exclude from Timetable
Set `Schedule` column to "No":
```csv
CSE,4,CS499,Project,0,0,0,4,4,Dr. Brown,No,70
```

## Faculty Assignment

### Single Faculty
```csv
...,Dr. John Smith,...
```

### Multiple Faculty Options
Use "/" to separate faculty names - system picks one:
```csv
...,Dr. John Smith/Prof. Jane Doe/Dr. Kumar,...
```

**Note:** For lab courses with theory, specify both faculty:
```csv
...,Dr. Smith/Prof. Kumar,...
```

## Advanced Features

### 1. Faculty Preferences (Optional)
Create or edit `faculty_preferences.csv`:

```csv
Faculty,Course Code,Preferred Day,Preferred Time,Priority
Dr. John Smith,CS402,Monday,09:00,HIGH
```

### 2. Teaching Assistants (Optional)
Create or edit `teaching_assistants.csv`:

```csv
TA Name,Email,Department,Available Days,Available Times,Course Preferences,Type
Alice Kumar,alice@example.com,CSE,"Monday,Wednesday",09:00-17:00,CS402;CS301,Graduate
```

### 3. Reserved Time Slots (Optional)
Edit `reserved_slots.json` to block specific time slots:

```json
{
  "reserved_slots": {
    "Monday": {
      "CSE": {
        "semesters": [2, 4, 6],
        "slots": ["14:00-15:00"]
      }
    }
  }
}
```

## Verification After Adding

After adding new subjects and generating the timetable:

1. **Check the Excel output** - New subjects should appear in the timetable
2. **Review console output** - Look for scheduling messages
3. **Check for unscheduled components** - Listed at the end of generation
4. **Verify room assignments** - Ensure appropriate rooms are allocated
5. **Check faculty conflicts** - No professor double-booking

## Common Issues and Solutions

### Issue: Course Not Appearing in Timetable

**Possible Causes:**
1. Schedule column set to "No" → Change to "Yes"
2. Missing required columns → Add all required fields
3. Department/Semester mismatch → Verify correct values
4. CSV format error → Check for proper commas, no extra quotes

### Issue: Course Scheduled but No Room

**Solution:**
- Check `rooms.csv` has available rooms
- Verify room capacity matches student count
- Ensure room type matches course type (LECTURE_ROOM, COMPUTER_LAB)

### Issue: Professor Conflict

**Solution:**
- System will try alternative time slots automatically
- Check faculty_preferences.csv if specific times needed
- May need to adjust L/T/P values if schedule is too tight

### Issue: Colors Not Applied

**Solution:**
- Check `colors.csv` exists and is properly formatted
- System uses default colors if CSV missing
- Add more colors if you have many new courses

## Running the Timetable Generator

After adding subjects to `combined.csv`:

### For Regular Timetable:
```bash
python TT_gen.py
```

### For Exam Timetable:
```bash
python exam_timetable.py
```

### Via Web Interface:
1. Upload updated `combined.csv` via web UI
2. Click "Generate Timetable"
3. Download the generated Excel file

## Example: Adding a Complete New Course

### Step 1: Add to combined.csv
```csv
CSE,6,CS601,Machine Learning Advanced,3,1,2,0,5,Dr. AI Expert/Prof. ML Guru,Yes,60
```

### Step 2: (Optional) Add Faculty Preference
```csv
Dr. AI Expert,CS601,Tuesday,10:00,HIGH
```

### Step 3: (Optional) Add TA Support
```csv
Bob ML,bob@example.com,CSE,"Tuesday,Thursday",10:00-16:00,CS601,Graduate
```

### Step 4: Generate Timetable
```bash
python TT_gen.py
```

### Result:
- ✅ Course appears in CSE Semester 6 timetable
- ✅ 3 lecture sessions (1.5 hours each) scheduled
- ✅ 1 tutorial session (1 hour) scheduled  
- ✅ 2 lab sessions (2 hours each) scheduled
- ✅ Automatically assigned color from colors.csv
- ✅ Room allocated based on 60 students
- ✅ Faculty Dr. AI Expert or Prof. ML Guru assigned
- ✅ TA Bob ML assigned to help

## Summary

**You don't need to modify any code!** Simply:

1. Add a row to `combined.csv` with course details
2. Set `Schedule` = "Yes"
3. Run `python TT_gen.py`
4. The course is automatically allocated to the timetable

The system handles all the complexity of:
- Time slot allocation
- Room assignment
- Faculty scheduling
- Color assignment
- Conflict resolution
- Section management

**The timetable generation is fully data-driven through CSV files!**
