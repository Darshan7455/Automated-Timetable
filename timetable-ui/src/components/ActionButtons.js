import React from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

export default function ActionButtons({ setStatus, setDownloads, config }) {
  const handleAction = async (endpoint, label) => {
    try {
      setStatus(`⚙️ ${label}...`);
      const res = await axios.post(`${API_BASE}/${endpoint}`, { config });
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

  return (
    <div className="card actions">
      <h2>⚡ Actions</h2>
      <div className="button-group">
        <button
          className="action-button primary"
          onClick={() => handleAction("generate-timetable","generate-exam", "Generating Timetable")}
        >
          🗓️ Generate Timetable
        </button>
        {/* <button
          className="action-button secondary"
          onClick={() => handleAction("generate-exam", "Generating Exam Timetable")}
        >
          📝 Generate Exam Timetable
        </button> */}
      </div>
    </div>
  );
}