# 🚀 Quick Reference Card

## Start the System
```bash
cd TimeTable-main
./start.sh
```

## URLs
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## Basic Workflow
1. Upload `combined.csv` and `rooms.csv`
2. Click "Generate Timetable"
3. Download Excel files

## Key Commands
```bash
# Start everything
./start.sh

# Start backend only
npm start

# Start UI only
npm run start:ui

# Install dependencies
npm run install:all
pip install -r requirements.txt

# Stop servers
Ctrl+C
```

## File Locations
- **Uploads**: `uploads/`
- **Outputs**: Root directory (`.xlsx` files)
- **Logs**: Terminal output

## Common Issues

### Port in use
```bash
lsof -i :5000  # Check backend
lsof -i :3000  # Check UI
kill -9 <PID>  # Kill process
```

### Python errors
```bash
source .venv/bin/activate
pip install -r requirements.txt
```

### Backend won't start
- Check if port 5000 is free
- Verify Node.js is installed
- Check server.js exists

### UI won't start
- Check if port 3000 is free
- Run `npm --prefix timetable-ui install`

## API Endpoints
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/upload` | Upload CSVs |
| POST | `/generate-timetable` | Generate timetables |
| POST | `/generate-exam` | Generate exam schedule |
| GET | `/download?file=xxx` | Download file |
| GET | `/health` | Health check |

## CSV Formats

### combined.csv
```
Department,Semester,Course Code,Course Name,L,T,P,S,C,Faculty,Schedule,total_students
```

### rooms.csv
```
id,capacity,type,roomNumber
```

## Output Files
1. `timetable_all_departments.xlsx` - All department timetables
2. `all_faculty_timetables.xlsx` - Individual faculty schedules
3. `exam_timetable.xlsx` - Exam schedule

## Documentation
- **Setup**: `README_SETUP.md`
- **Usage**: `USER_GUIDE.md`
- **Architecture**: `ARCHITECTURE.md`
- **Changes**: `REFACTORING_SUMMARY.md`

## Support
Check documentation or contact Software Psych team.

---
**Version**: 2.0 (Refactored)  
**Last Updated**: November 2025
