# 🚀 How to Run the UI

## Step-by-Step Instructions

### Prerequisites
Make sure you have installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Python 3.10+** (for backend processing)
- **npm** (comes with Node.js)

### Step 1: Navigate to the Project Directory
```bash
cd TimeTable-main
```

### Step 2: Install Dependencies

#### Option A: Install Everything at Once (Recommended)
```bash
npm run install:all
```

This will install:
- Backend dependencies (Express, CORS, Multer)
- Frontend dependencies (React, Axios, etc.)

#### Option B: Install Separately

**Backend dependencies:**
```bash
npm install
```

**Frontend dependencies:**
```bash
cd timetable-ui
npm install
cd ..
```

### Step 3: Install Python Dependencies (if not already done)
```bash
pip install pandas openpyxl
```

Or if you have a requirements.txt:
```bash
pip install -r requirements.txt
```

### Step 4: Run the Application

#### Option 1: Run Both Backend and Frontend Together (Easiest)
```bash
npm run dev:all
```

This starts both:
- Backend server on `http://localhost:5000`
- Frontend UI on `http://localhost:3000`

#### Option 2: Run Separately (Two Terminal Windows)

**Terminal 1 - Backend Server:**
```bash
npm start
```
You should see: `🚀 Server running on http://localhost:5000`

**Terminal 2 - Frontend UI:**
```bash
npm run start:ui
```
Or:
```bash
cd timetable-ui
npm start
```

The React development server will start and automatically open your browser at `http://localhost:3000`

### Step 5: Access the UI

Open your web browser and go to:
```
http://localhost:3000
```

You should see the Timetable Automation System interface!

## 🎯 Using the Exam Timetable Feature

1. **Upload CSV Files:**
   - Click "Choose File" under "Combined CSV" and select your `combined.csv`
   - Click "Choose File" under "Rooms CSV" and select your `rooms.csv`
   - Click "Upload Files"

2. **Generate Exam Timetable:**
   - Click the "📝 Generate Exam Timetable" button
   - Enter exam dates in the text area (one per line or comma-separated)
     - Format: `YYYY-MM-DD` (e.g., `2024-01-15`)
     - Example:
       ```
       2024-01-15
       2024-01-16
       2024-01-17
       ```
   - Click "✅ Generate Exam Timetable"

3. **Download Results:**
   - The generated `exam_timetable.xlsx` will appear in the downloads section
   - Click on it to download

## 🔧 Troubleshooting

### Port Already in Use
If you see "Port 3000 is already in use" or "Port 5000 is already in use":

**For Port 3000 (React):**
- Kill the process using port 3000:
  ```bash
  # Windows
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -ti:3000 | xargs kill
  ```

**For Port 5000 (Backend):**
- Change the port in `server.js` (line 9):
  ```javascript
  const PORT = 5001; // Change to any available port
  ```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
rm -rf timetable-ui/node_modules timetable-ui/package-lock.json
npm run install:all
```

### Python Script Errors
Make sure Python is in your PATH and you have the required packages:
```bash
python --version  # Should be 3.10+
pip install pandas openpyxl
```

### CORS Errors
If you see CORS errors, make sure:
- Backend server is running on port 5000
- Frontend is trying to connect to `http://localhost:5000`
- Check `timetable-ui/src/components/ActionButtons.js` - API_BASE should be `http://localhost:5000`

## 📝 Quick Reference

| Command | Description |
|---------|-------------|
| `npm run install:all` | Install all dependencies |
| `npm run dev:all` | Run both backend and frontend |
| `npm start` | Run backend server only |
| `npm run start:ui` | Run frontend UI only |

## 🎉 You're All Set!

Once both servers are running, you can:
- Upload CSV files
- Generate regular timetables
- Generate exam timetables with custom dates
- Download all generated Excel files

Happy scheduling! 🗓️

