#!/bin/bash

echo "🚀 Starting Timetable Automation System..."
echo ""

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

if [ ! -d ".venv" ]; then
    echo "${BLUE}Creating Python virtual environment...${NC}"
    python3 -m venv .venv
    echo "${GREEN}✓ Virtual environment created${NC}"
fi

echo "${BLUE}Activating virtual environment...${NC}"
source .venv/bin/activate
echo "${GREEN}✓ Virtual environment activated${NC}"

if ! python -c "import pandas" 2>/dev/null; then
    echo "${BLUE}Installing Python dependencies...${NC}"
    pip install -r requirements.txt
    echo "${GREEN}✓ Python dependencies installed${NC}"
fi

if [ ! -d "node_modules" ]; then
    echo "${BLUE}Installing Node dependencies...${NC}"
    npm install
    echo "${GREEN}✓ Node dependencies installed${NC}"
fi

if [ ! -d "timetable-ui/node_modules" ]; then
    echo "${BLUE}Installing UI dependencies...${NC}"
    npm --prefix timetable-ui install
    echo "${GREEN}✓ UI dependencies installed${NC}"
fi

echo ""
echo "${GREEN}========================================${NC}"
echo "${GREEN}  All dependencies are ready!${NC}"
echo "${GREEN}========================================${NC}"
echo ""
echo "${BLUE}Starting servers...${NC}"
echo ""
echo "Backend API: http://localhost:5000"
echo "Frontend UI: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

npm run dev:all
