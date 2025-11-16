# Exam Seat Arrangement Guide

## Overview

The exam timetable system now includes comprehensive seat arrangement functionality that automatically assigns students to specific seats in exam rooms.

## Features Added

### 1. **Seat Arrangement Sheet**
- Detailed seat allocations for each exam
- Room-wise breakdown showing:
  - Room ID and number
  - Room capacity
  - Number of students allocated
  - Student roll number ranges

### 2. **Visual Seat Maps Sheet**
- Grid-based visual representation of seating
- Shows exact seat positions (Row x Column)
- Student IDs mapped to specific seats
- 10 seats per row layout (configurable)
- Easy to print for room displays

### 3. **Enhanced Detailed Schedule**
- Rooms column now shows seat counts: `RoomNumber(StudentCount)`
- Example: `101(35), 102(35)` means 35 students in room 101 and 35 in room 102

## How Seat Arrangement Works

### Student ID Generation
Students are assigned sequential IDs in the format: `DEPT-S#-###`
- **DEPT**: Department code (e.g., CSE, DSAI)
- **S#**: Semester number
- **###**: Sequential student number (001, 002, 003...)

Example: `CSE-S2-001`, `CSE-S2-002`, `DSAI-S4-001`

### Seat Allocation Algorithm
1. Students are distributed across multiple rooms based on room capacity
2. Seats are numbered sequentially within each room
3. Grid layout assumes 10 seats per row
4. Alternate seating can be implemented for exam spacing

### Room Distribution
- Larger rooms are filled first to minimize room fragmentation
- Students are split efficiently across available rooms
- Each room shows exactly how many students are allocated

## Excel Output Sheets

The generated `exam_timetable.xlsx` now contains:

1. **Overview** - Summary statistics
2. **Exam Schedule** - Date-wise exam list
3. **Detailed Schedule** - Complete exam details with room allocations
4. **Seat Arrangement** ⭐ NEW - Student seat allocations
5. **Seat Maps** ⭐ NEW - Visual room-wise seat maps
6. **Date-wise sheets** - Individual date schedules
7. **Unscheduled Exams** - Courses that couldn't be scheduled (if any)

## Using the Seat Arrangement

### For Administrators
1. **Print Seat Maps** - Use the "Seat Maps" sheet to print and display outside exam rooms
2. **Student Lists** - Use the "Seat Arrangement" sheet to create student-wise seat allocation lists
3. **Room Planning** - Check room capacity utilization in the "Detailed Schedule"

### For Exam Supervisors
1. Navigate to "Seat Maps" sheet
2. Find the room number you're supervising
3. Print the visual grid showing student positions
4. Post outside the exam room for student reference

### For Students
- Students can be provided with their seat numbers via:
  - Hall tickets with room and seat information
  - Notice boards showing the seat arrangement sheets
  - Digital displays showing room-wise allocations

## Customization Options

### Modify Seats Per Row
In `exam_timetable.py`, locate the `generate_seat_arrangement()` function:
```python
seats_per_row = 10  # Change this value
```

### Modify Student ID Format
In `exam_timetable.py`, locate this line:
```python
student_id = f"{department}-S{semester}-{current_student:03d}"
```
Modify the format string to match your institution's ID format.

### Alternate Seating Pattern
To implement alternate seating (every other seat):
1. Modify the seat number calculation in `generate_seat_arrangement()`
2. Multiply seat indices by 2 to skip seats
3. Update capacity calculations accordingly

## Example Output

### Seat Arrangement Sheet Format
```
Course: CS162 - Optimization
Date: 2024-01-15 (Monday)  Time: 09:00  Dept: CSE  Semester: 2

Room    Room Number   Capacity   Students Allocated   Student Roll Range
C101    101          70         70                   CSE-S2-001 to CSE-S2-070
```

### Visual Seat Map Format
```
Room 101 - Seat Map
CS162 - 2024-01-15 09:00

Row\Col  C1          C2          C3          C4          C5     ...
R1       CSE-S2-001  CSE-S2-002  CSE-S2-003  CSE-S2-004  CSE-S2-005
R2       CSE-S2-011  CSE-S2-012  CSE-S2-013  CSE-S2-014  CSE-S2-015
...
```

## Benefits

1. **Automated Assignment** - No manual seat allocation needed
2. **Fair Distribution** - Students evenly distributed across rooms
3. **Visual Clarity** - Easy-to-read seat maps for printing
4. **Audit Trail** - Complete record of who sits where
5. **Exam Integrity** - Proper spacing and room management
6. **Time Savings** - Eliminates hours of manual planning

## Integration with Student Data

For real student data integration:
1. Modify `generate_seat_arrangement()` to read from student database
2. Replace generated IDs with actual enrollment numbers
3. Sort students by roll number or name
4. Apply any special requirements (accessibility needs, etc.)

## Troubleshooting

### Issue: Wrong number of students shown
- Check `total_students` column in `combined.csv`
- Verify room capacity in `rooms.csv`

### Issue: Student IDs not matching format
- Modify the student ID format in `generate_seat_arrangement()`
- Ensure department codes match your data

### Issue: Room layout doesn't match actual room
- Adjust `seats_per_row` parameter
- Modify grid generation in visual seat map section

## Future Enhancements

Potential additions:
- Import actual student enrollment data
- Export seat arrangements to PDF
- QR codes for seat verification
- Special accommodation handling
- Random seat assignment option
- Department-wise mixing for anti-cheating

## Support

For questions or issues with seat arrangements:
1. Check this guide first
2. Review the generated Excel file structure
3. Examine the `generate_seat_arrangement()` function in `exam_timetable.py`
4. Test with sample data before production use
