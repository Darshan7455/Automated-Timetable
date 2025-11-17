import React, { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

export default function FileUpload({ setStatus }) {
  const [combined, setCombined] = useState(null);
  const [rooms, setRooms] = useState(null);

  const handleUpload = async () => {
    if (!combined || !rooms) {
      alert("Please select both combined.csv and rooms.csv files.");
      return;
    }

    const formData = new FormData();
    formData.append("combined", combined);
    formData.append("rooms", rooms);

    try {
      setStatus("📤 Uploading files...");
      const res = await axios.post(`${API_BASE}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setStatus(res.data.message || "✅ Files uploaded successfully.");
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.message || "Check backend connection.";
      setStatus(`❌ File upload failed: ${errorMsg}`);
    }
  };

  return (
    <div className="card">
      <h2>📁 Upload Input Files</h2>
      <div className="file-input-group">
        <div className="file-input-wrapper">
          <label htmlFor="combined">combined.csv</label>
          <input
            id="combined"
            type="file"
            accept=".csv"
            onChange={(e) => setCombined(e.target.files[0])}
          />
          {combined && <span className="file-name">✓ {combined.name}</span>}
        </div>
        <div className="file-input-wrapper">
          <label htmlFor="rooms">rooms.csv</label>
          <input
            id="rooms"
            type="file"
            accept=".csv"
            onChange={(e) => setRooms(e.target.files[0])}
          />
          {rooms && <span className="file-name">✓ {rooms.name}</span>}
        </div>
      </div>
      <button
        className="upload-button"
        onClick={handleUpload}
        disabled={!combined || !rooms}
      >
        📤 Upload Files
      </button>
    </div>
  );
}