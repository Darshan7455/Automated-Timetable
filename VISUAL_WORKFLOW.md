# Adding Subjects to Timetable - Visual Workflow

```
┌─────────────────────────────────────────────────────────────────────┐
│                     ADD NEW SUBJECT WORKFLOW                         │
└─────────────────────────────────────────────────────────────────────┘

STEP 1: Edit combined.csv
┌─────────────────────────────────────────────────────────────────────┐
│ Department,Semester,Course Code,Course Name,L,T,P,S,C,Faculty,...   │
│ CSE,2,CS162,Optimization,3,1,0,0,2,Dr. Name,Yes,70                  │
│ CSE,4,CS301,Software Engineering,3,1,0,0,4,Dr. Name,Yes,70          │
│ CSE,6,CS608,Cloud Computing,3,1,2,0,5,Dr. Expert,Yes,55  ← ADD THIS │
│                                                                       │
│ Just add a new row with course details!                              │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
                                    
STEP 2: Save File
┌─────────────────────────────────────────────────────────────────────┐
│ Save combined.csv                                                    │
│ ✓ File saved successfully                                            │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
                                    
STEP 3: Run Generator
┌─────────────────────────────────────────────────────────────────────┐
│ Terminal / Command Prompt                                            │
│                                                                       │
│ C:\...> python TT_gen.py                                             │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
                                    
STEP 4: System Processes Automatically
┌─────────────────────────────────────────────────────────────────────┐
│ ==============================================================       │
│ COURSE LOADING SUMMARY                                               │
│ ==============================================================       │
│ Total courses in combined.csv: 132                                   │
│ Courses marked for scheduling: 131                                   │
│ Courses excluded (Schedule=No): 1                                    │
│ ==============================================================       │
│                                                                       │
│ Processing CSE Semester 6: 11 courses                                │
│   - CS307: Machine Learning (L=3, T=0, P=2)                          │
│   - CS608: Cloud Computing (L=3, T=1, P=2) ← YOUR NEW COURSE!       │
│   - CS310: Database Systems (L=3, T=1, P=2)                          │
│   ...                                                                 │
│                                                                       │
│ ✓ Assigning color to CS608...                                        │
│ ✓ Scheduling 3 lectures for CS608...                                 │
│ ✓ Scheduling 1 tutorial for CS608...                                 │
│ ✓ Scheduling 2 labs for CS608...                                     │
│ ✓ Allocating rooms for CS608...                                      │
│ ✓ Faculty assigned: Dr. Expert                                       │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
                                    
STEP 5: Check Output Excel File
┌─────────────────────────────────────────────────────────────────────┐
│ Timetable_2026_03_03_14_30_45.xlsx                                  │
│                                                                       │
│ Sheet: CSE_6                                                         │
│ ┌──────────┬─────────┬─────────┬─────────┬─────────┬─────────┐      │
│ │ Time     │ Monday  │ Tuesday │ Wed     │ Thu     │ Friday  │      │
│ ├──────────┼─────────┼─────────┼─────────┼─────────┼─────────┤      │
│ │ 09:00-   │         │ CS608   │         │         │ CS608   │      │
│ │ 10:30    │         │ Cloud   │         │         │ Cloud   │      │
│ │          │         │ Lecture │         │         │ Lab     │      │
│ │          │         │ Room:A1 │         │         │ Lab:CL2 │      │
│ ├──────────┼─────────┼─────────┼─────────┼─────────┼─────────┤      │
│ │ 11:00-   │ CS608   │         │         │ CS608   │         │      │
│ │ 12:00    │ Cloud   │         │         │ Cloud   │         │      │
│ │          │ Tutorial│         │         │ Lecture │         │      │
│ └──────────┴─────────┴─────────┴─────────┴─────────┴─────────┘      │
│                                                                       │
│ ✓ All sessions scheduled!                                            │
└─────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════

WHAT THE SYSTEM DOES AUTOMATICALLY:

┌─────────────────────────────────────────────────────────────────────┐
│ 🎨 COLOR ASSIGNMENT                                                  │
│    Picks color from colors.csv for the course                        │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│ 📅 SESSION CALCULATION                                               │
│    L=3 → 3 lecture sessions (1.5 hrs each)                           │
│    T=1 → 1 tutorial session (1 hour)                                 │
│    P=2 → 2 lab sessions (2 hrs each)                                 │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│ 🏢 ROOM ALLOCATION                                                   │
│    Lectures → LECTURE_ROOM (from rooms.csv)                          │
│    Labs → COMPUTER_LAB (from rooms.csv)                              │
│    Capacity check: 55 students                                       │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│ 👨‍🏫 FACULTY MANAGEMENT                                               │
│    Assign: Dr. Expert (from Faculty column)                          │
│    Check: No double-booking conflicts                                │
│    Apply: Faculty preferences (if in faculty_preferences.csv)        │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│ ⏰ TIME SLOT ALLOCATION                                              │
│    Find available slots avoiding:                                    │
│      • Faculty conflicts                                             │
│      • Student conflicts (same dept/semester)                        │
│      • Break times                                                   │
│      • Reserved slots                                                │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│ ✅ TIMETABLE GENERATED                                               │
│    Excel file with complete schedule ready!                          │
└─────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════

FIELD REFERENCE:

Department     → CSE, ECE, ME, etc. (your department code)
Semester       → 2, 4, 6, 8 (semester number)
Course Code    → CS608 (unique identifier)
Course Name    → Cloud Computing (full name)
L              → 3 (lectures per week)
T              → 1 (tutorials per week)
P              → 2 (practicals/labs per week)
S              → 0 (self-study hours)
C              → 5 (total credits)
Faculty        → Dr. Expert (faculty name, use / for multiple options)
Schedule       → Yes (include in timetable) or No (exclude)
total_students → 55 (number of students)


═══════════════════════════════════════════════════════════════════════

QUICK EXAMPLES:

┌─────────────────────────────────────────────────────────────────────┐
│ Theory Course (Lectures + Tutorials only)                            │
│ CSE,4,CS401,Operating Systems,3,1,0,0,4,Dr. OS,Yes,70               │
│                                                                       │
│ Result: 3 lectures + 1 tutorial scheduled                            │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ Lab Course (Practicals only)                                         │
│ CSE,4,CS402,Advanced Lab,0,0,4,0,4,Prof. Lab,Yes,70                 │
│                                                                       │
│ Result: 4 lab sessions in computer labs                              │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ Full Course (Theory + Lab)                                           │
│ CSE,6,CS608,Cloud Computing,3,1,2,0,5,Dr. Expert,Yes,55             │
│                                                                       │
│ Result: 3 lectures + 1 tutorial + 2 labs scheduled                   │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ Elective Course (Basket course)                                      │
│ CSE,4,B1-CS450,IoT Systems,2,0,0,2,0,Dr. IoT,Yes,40                 │
│                                                                       │
│ Result: Synchronized across all sections, 2 lectures scheduled       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ Project Course (Excluded from timetable)                             │
│ CSE,8,CS899,Final Project,0,0,0,10,10,Faculty,No,70                 │
│                                                                       │
│ Result: NOT scheduled (Schedule=No)                                  │
└─────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════

RELATED CSV FILES:

combined.csv          → Course data (add your subjects here) ★
rooms.csv             → Room information (capacity, type)
colors.csv            → Color scheme for visualization
excluded_rooms.csv    → Rooms to exclude from scheduling
faculty_preferences.csv  → Faculty time preferences (optional)
teaching_assistants.csv  → TA information (optional)


═══════════════════════════════════════════════════════════════════════

TIPS:

✓ Always set Schedule=Yes to include course in timetable
✓ Use meaningful course codes (they appear in timetable)
✓ Provide accurate student count for room allocation
✓ Use faculty/faculty format for multiple faculty options
✓ L, T, P values determine how many sessions are scheduled
✓ Check console output to verify course is loaded
✓ Self-study courses (only S>0) don't need classroom slots


═══════════════════════════════════════════════════════════════════════
