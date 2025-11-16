# Seat Arrangement Quick Reference

## Quick Start

```bash
python exam_timetable.py
```

## What You Get

✅ **5 New Sheets** added to exam timetable:

1. **Seat Arrangement** - Detailed student seat allocations
2. **Seat Maps** - Visual grid-based seat layouts  
3. Enhanced **Detailed Schedule** with seat counts per room

## Key Features

| Feature | Description |
|---------|-------------|
| 🪑 Auto Seat Assignment | Students automatically assigned to seats |
| 🏢 Multi-Room Support | Students distributed across multiple rooms |
| 📊 Visual Grid Maps | 10-seat-per-row grid layout |
| 🎫 Student IDs | Format: `DEPT-S#-###` (e.g., CSE-S2-001) |
| 📋 Roll Ranges | Shows student range per room |
| 🖨️ Print-Ready | Seat maps ready to print and display |

## Seat Arrangement Sheet Format

```
Course: CS162 - Optimization
Date: 2024-01-15 (Monday)  Time: 09:00

Room    | Room Number | Capacity | Students | Roll Range
--------|-------------|----------|----------|------------------
C101    | 101        | 70       | 70       | CSE-S2-001 to CSE-S2-070
```

## Visual Seat Map Format

```
Room 101 - CS162 - 2024-01-15 09:00

Row\Col  C1          C2          C3          C4          C5
R1       CSE-S2-001  CSE-S2-002  CSE-S2-003  CSE-S2-004  CSE-S2-005
R2       CSE-S2-011  CSE-S2-012  CSE-S2-013  CSE-S2-014  CSE-S2-015
R3       ---         ---         ---         ---         ---
```

## Customization

### Change Seats Per Row
```python
# In exam_timetable.py, find:
seats_per_row = 10  # Change this value
```

### Change Student ID Format
```python
# In exam_timetable.py, find:
student_id = f"{department}-S{semester}-{current_student:03d}"
# Modify to your format
```

## Common Use Cases

### 1. Print Room Seat Maps
- Open `exam_timetable.xlsx`
- Go to "Seat Maps" sheet
- Find your room number
- Print the grid section
- Post outside exam room

### 2. Generate Student Hall Tickets
- Use "Seat Arrangement" sheet
- Extract student ID and room number
- Generate hall tickets with seat info

### 3. Check Room Utilization
- Go to "Detailed Schedule" sheet
- Check "Rooms (Seats)" column
- Example: `101(35), 102(35)` = 70 students in 2 rooms

## Room Allocation Logic

1. **Largest Room First**: Tries to fit all students in one large room
2. **Split Efficiently**: If needed, splits across multiple rooms
3. **Capacity-Based**: Allocates based on room capacity from rooms.csv
4. **Exam Rooms Only**: Uses LECTURE_ROOM, SEATER_120, SEATER_240 types

## Student ID Generation

Format: `{DEPT}-S{SEM}-{NUM}`

Examples:
- `CSE-S2-001` - CSE Dept, Semester 2, Student 1
- `DSAI-S4-025` - DSAI Dept, Semester 4, Student 25

## Excel Sheets Overview

| Sheet | Purpose |
|-------|---------|
| Overview | Summary stats |
| Exam Schedule | Date-wise list |
| Detailed Schedule | Full details + rooms (seats) |
| **Seat Arrangement** | 🆕 Student seat allocations |
| **Seat Maps** | 🆕 Visual seat grids |
| Date-wise | Individual date schedules |
| Unscheduled Exams | Conflicts/issues |

## Tips & Tricks

### For Exam Coordinators
- Use "Seat Arrangement" for capacity planning
- Export to PDF for archival
- Check "Unscheduled Exams" sheet for conflicts

### For Exam Supervisors
- Print "Seat Maps" for your rooms
- Laminate for reusable display boards
- Verify student count matches allocated seats

### For Students
- Check "Seat Arrangement" for room assignment
- Note your seat number from visual grid
- Arrive early to locate your seat

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Wrong student count | Check `total_students` in combined.csv |
| Room not showing | Verify room type in rooms.csv (exclude LIBRARY) |
| IDs not sequential | Modify student_id generation logic |
| Grid too small | Increase seats_per_row value |

## File Requirements

✅ **combined.csv** - Must have `total_students` column  
✅ **rooms.csv** - Must have room capacity and type  
✅ **exam_dates.json** - Specify exam dates (optional)  
✅ **exam_config.json** - Configure slots per day (optional)

## Output File

📄 **exam_timetable.xlsx** - Contains all sheets including seat arrangements

## Documentation

📖 **Full Guide**: [SEAT_ARRANGEMENT_GUIDE.md](SEAT_ARRANGEMENT_GUIDE.md)  
📖 **Exam Timetable**: [EXAM_TIMETABLE_GUIDE.md](EXAM_TIMETABLE_GUIDE.md)  
📖 **Main README**: [README.md](README.md)

## Support

For issues or questions:
1. Check SEAT_ARRANGEMENT_GUIDE.md
2. Verify input files format
3. Review generated Excel file
4. Test with sample data first

---

**Version**: 2.0 with Seat Arrangement  
**Status**: ✅ Production Ready
