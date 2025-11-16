import React, { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

export default function ActionButtons({ setStatus, setDownloads, config }) {
  const [examDates, setExamDates] = useState("");
  const [showExamInput, setShowExamInput] = useState(false);
  const [dateRangeInfo, setDateRangeInfo] = useState(null);

  const handleAction = async (endpoint, label, data = {}) => {
    try {
      setStatus(`⚙️ ${label}...`);
      const res = await axios.post(`${API_BASE}/${endpoint}`, { ...data, config });
      setStatus(res.data.message || `✅ ${label} completed.`);
      if (res.data.outputs) {
        setDownloads(res.data.outputs);
      }
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.message || err.message;
      setStatus(`❌ ${label} failed: ${errorMsg}`);
    }
  };

  const parseDate = (dateStr) => {
    const formats = [
      { pattern: /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/, // DD-MM-YYYY or DD/MM/YYYY
        parse: (match) => {
          const day = parseInt(match[1]);
          const month = parseInt(match[2]);
          const year = parseInt(match[3]);
          if (month >= 1 && month <= 12 && day >= 1 && day <= 31 && year >= 2000) {
            return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          }
        }
      },
      { pattern: /^(\d{4})[-\/](\d{2})[-\/](\d{2})$/,
        parse: (match) => {
          const year = parseInt(match[1]);
          const month = parseInt(match[2]);
          const day = parseInt(match[3]);
          if (month >= 1 && month <= 12 && day >= 1 && day <= 31 && year >= 2000) {
            return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          }
        }
      },
      { pattern: /^(\d{2})[-\/](\d{2})[-\/](\d{2})$/,
        parse: (match) => {
          const day = parseInt(match[1]);
          const month = parseInt(match[2]);
          const year = 2000 + parseInt(match[3]);
          if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
            return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          }
        }
      }
    ];

    for (const format of formats) {
      const match = dateStr.match(format.pattern);
      if (match) {
        const result = format.parse(match);
        if (result) return result;
      }
    }
    return null;
  };

  const formatDate = (dateStr) => {
    try {
      const [year, month, day] = dateStr.split('-');
      return `${day}-${month}-${year}`;
    } catch {
      return dateStr;
    }
  };

  const updateDateRangeInfo = (dateStrings) => {
    const validDates = [];
    dateStrings.forEach(dateStr => {
      const parsedDate = parseDate(dateStr);
      if (parsedDate) {
        validDates.push(parsedDate);
      }
    });
    
    if (validDates.length > 0) {
      const sortedDates = validDates.sort();
      const startDate = sortedDates[0];
      const endDate = sortedDates[sortedDates.length - 1];
      const totalDays = sortedDates.length;
      const uniqueDays = new Set(sortedDates).size;
      
      setDateRangeInfo({
        startDate: startDate,
        endDate: endDate,
        startDateFormatted: formatDate(startDate),
        endDateFormatted: formatDate(endDate),
        totalDays: totalDays,
        uniqueDays: uniqueDays
      });
    } else {
      setDateRangeInfo(null);
    }
  };

  const handleDateInputChange = (e) => {
    setExamDates(e.target.value);
    const dateStrings = e.target.value
      .split(/[,\n]/)
      .map(d => d.trim())
      .filter(d => d.length > 0);
    updateDateRangeInfo(dateStrings);
  };

  const handleGenerateExam = () => {
    const dateStrings = examDates
      .split(/[,\n]/)
      .map(d => d.trim())
      .filter(d => d.length > 0);
    
    if (dateStrings.length === 0) {
      setStatus("❌ Please enter at least one exam date");
      return;
    }

    const validDates = [];
    const invalidDates = [];

    dateStrings.forEach(dateStr => {
      const parsedDate = parseDate(dateStr);
      if (parsedDate) {
        validDates.push(parsedDate);
      } else {
        invalidDates.push(dateStr);
      }
    });

    if (invalidDates.length > 0) {
      setStatus(`❌ Invalid date format: ${invalidDates.join(', ')}. Please use DD-MM-YYYY, DD/MM/YYYY, YYYY-MM-DD, or YYYY/MM/DD format.`);
      return;
    }

    if (validDates.length === 0) {
      setStatus("❌ No valid dates found. Please check the date format.");
      return;
    }

    handleAction("generate-exam", "Generating Exam Timetable", { dates: validDates });
  };

  return (
    <div className="card actions">
      <h2>⚡ Actions</h2>
      <div className="button-group">
        <button
          className="action-button primary"
          onClick={() => handleAction("generate-timetable", "Generating Timetable")}
        >
          🗓️ Generate Timetable
        </button>
        <button
          className="action-button secondary"
          onClick={() => setShowExamInput(!showExamInput)}
        >
          📝 Generate Exam Timetable
        </button>
      </div>
      
      {showExamInput && (
        <div style={{ 
          marginTop: "20px", 
          padding: "15px", 
          backgroundColor: "rgba(0, 0, 0, 0.6)", 
          borderRadius: "8px",
          border: "1px solid #2d2d2d"
        }}>
          <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold", color: "#e0e0e0" }}>
            Enter Exam Dates (one per line or comma-separated):
          </label>
          <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "10px" }}>
            Accepted formats: <strong>DD-MM-YYYY</strong>, DD/MM/YYYY, YYYY-MM-DD, or YYYY/MM/DD<br/>
            Examples: 15-01-2024, 15/01/2024, 2024-01-15, or 2024/01/15
          </p>
          <textarea
            value={examDates}
            onChange={handleDateInputChange}
            placeholder="15-01-2024&#10;16-01-2024&#10;17-01-2024"
            rows={5}
            style={{
              width: "100%",
              minHeight: "100px",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #3d3d3d",
              fontFamily: "monospace",
              fontSize: "14px",
              marginBottom: "10px",
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              color: "#e0e0e0"
            }}
          />
          {dateRangeInfo && (
            <div style={{
              padding: "10px",
              backgroundColor: "rgba(147, 51, 234, 0.15)",
              borderRadius: "4px",
              marginBottom: "10px",
              border: "1px solid #9333ea"
            }}>
              <div style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "5px", color: "#a855f7" }}>
                📅 Exam Date Range:
              </div>
              <div style={{ fontSize: "12px", color: "#e0e0e0", lineHeight: "1.6" }}>
                <strong>📌 Start Date:</strong> {dateRangeInfo.startDateFormatted || dateRangeInfo.startDate}
                <br/>
                <strong>📌 End Date:</strong> {dateRangeInfo.endDateFormatted || dateRangeInfo.endDate}
              </div>
            </div>
          )}
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              className="action-button primary"
              onClick={handleGenerateExam}
              style={{ flex: 1 }}
            >
              ✅ Generate Exam Timetable
            </button>
            <button
              className="action-button"
              onClick={() => {
                setExamDates("");
                setShowExamInput(false);
              }}
              style={{ flex: 1, backgroundColor: "#6c757d" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}