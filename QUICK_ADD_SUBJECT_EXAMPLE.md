# Quick Example: Adding a New Subject

## Scenario
You want to add a new course "Cloud Computing" to CSE Department, Semester 6.

## Step 1: Open combined.csv
Find the file `combined.csv` in the project root directory.

## Step 2: Add a New Row
Add this line to the end of the CSV file (or anywhere in the file):

```csv
CSE,6,CS608,Cloud Computing,3,1,2,0,5,Dr. Cloud Expert/Prof. AWS Master,Yes,55
```

### Field Breakdown:
- **CSE** = Department (Computer Science Engineering)
- **6** = Semester (6th semester)
- **CS608** = Course Code (unique identifier)
- **Cloud Computing** = Course Name
- **3** = Lectures per week (3 lectures)
- **1** = Tutorials per week (1 tutorial)
- **2** = Practicals/Labs per week (2 lab sessions)
- **0** = Self-study hours
- **5** = Total credits
- **Dr. Cloud Expert/Prof. AWS Master** = Faculty (system picks one)
- **Yes** = Include in timetable (Schedule column)
- **55** = Number of students enrolled

## Step 3: Save the File
Save `combined.csv` with your changes.

## Step 4: Generate Timetable
Run the timetable generator:

```bash
python TT_gen.py
```

## Step 5: Check Output
You'll see console output like this:

```
==============================================================
COURSE LOADING SUMMARY
==============================================================
Total courses in combined.csv: 132
Courses marked for scheduling: 131
Courses excluded (Schedule=No): 1
==============================================================

Processing CSE Semester 6: 11 courses
  - CS307: Machine Learning (L=3, T=0, P=2)
  - CS608: Cloud Computing (L=3, T=1, P=2)    ← YOUR NEW COURSE!
  - ...
```

## Step 6: Verify in Excel Output
Open the generated `Timetable_<timestamp>.xlsx` file:

1. Go to the "CSE_6" sheet tab
2. You'll see your new course scheduled:
   - 3 lecture sessions (1.5 hours each)
   - 1 tutorial session (1 hour)
   - 2 lab sessions (2 hours each)
3. Each session will have:
   - Course code: CS608
   - Course name: Cloud Computing
   - Faculty assigned: Dr. Cloud Expert or Prof. AWS Master
   - Room allocated: Based on 55 students

## That's It!
✅ Your new subject is automatically allocated to the timetable.

## What the System Does Automatically:

1. **Calculates Sessions Required:**
   - Lectures: 3 sessions × 3 slots each = 9 time slots
   - Tutorials: 1 session × 2 slots = 2 time slots
   - Labs: 2 sessions × 4 slots each = 8 time slots
   - **Total: 19 time slots per week**

2. **Assigns Colors:**
   - Picks a color from `colors.csv` for visualization

3. **Allocates Rooms:**
   - Lectures/tutorials: LECTURE_ROOM from `rooms.csv`
   - Labs: COMPUTER_LAB from `rooms.csv`
   - Room capacity matches 55 students

4. **Schedules Appropriately:**
   - Avoids faculty conflicts (Dr. Cloud Expert won't be double-booked)
   - Avoids student conflicts (no two CSE-6 courses at the same time)
   - Respects break times (lunch, etc.)
   - Uses faculty preferences if specified

5. **Manages Faculty:**
   - If Dr. Cloud Expert is busy, assigns Prof. AWS Master

## Advanced: Adding Multiple Courses at Once

You can add multiple courses in one go:

```csv
CSE,6,CS608,Cloud Computing,3,1,2,0,5,Dr. Cloud Expert,Yes,55
CSE,6,CS609,Blockchain Technology,3,0,2,0,4,Dr. Crypto Master,Yes,48
CSE,6,CS610,DevOps Practices,2,1,0,0,3,Prof. Jenkins,Yes,60
CSE,8,CS801,Advanced AI,3,1,2,0,5,Dr. Deep Learning,Yes,40
```

Then run:
```bash
python TT_gen.py
```

All four courses will be automatically scheduled!

## Excluding a Course from Timetable

If you want a course in the CSV but NOT in the timetable (e.g., project courses):

```csv
CSE,8,CS899,Final Year Project,0,0,0,10,10,Multiple Faculty,No,70
```

Set `Schedule` column to **"No"** - the course will be ignored by the timetable generator.

## Common Patterns

### Theory Course (only lectures and tutorials)
```csv
CSE,4,CS401,Theory Course,3,1,0,0,4,Dr. Theory,Yes,70
```

### Lab Course (only practicals)
```csv
CSE,4,CS402,Advanced Lab,0,0,4,0,4,Prof. Lab,Yes,70
```

### Elective/Basket Course
```csv
CSE,4,B1-CS450,Elective Option A,2,0,0,2,0,Dr. Elective,Yes,40
```

### Self-Study Course (no classroom time)
```csv
CSE,4,CS499,Independent Study,0,0,0,4,4,Dr. Advisor,No,70
```

## Troubleshooting

### "Course not appearing in timetable"
- Check `Schedule` column is "Yes" or empty
- Verify all columns have values (no blank required fields)
- Check console output for error messages

### "Course scheduled but seems incomplete"
- Verify L, T, P values are correct numbers (not blank or text)
- Check if there's a scheduling conflict (console will show warnings)

### "No room assigned"
- Check `rooms.csv` has enough rooms
- Verify room capacity matches student count
- Check room type (LECTURE_ROOM for lectures, COMPUTER_LAB for labs)

## Summary

**To add a subject:**
1. Add one line to `combined.csv`
2. Run `python TT_gen.py`
3. Done! ✅

**The system automatically handles everything else.**
