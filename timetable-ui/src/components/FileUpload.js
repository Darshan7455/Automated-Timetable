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
      console.log('Uploading files:', { 
        combined: combined.name, 
        rooms: rooms.name 
      });
      
      const res = await axios.post(`${API_BASE}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000 // 30 second timeout
      });
      
      console.log('Upload response:', res.data);
      setStatus(res.data.message || "✅ Files uploaded successfully.");
    } catch (err) {
      console.error('Upload error:', err);
      console.error('Error response:', err.response);
      
      let errorMsg = "Check backend connection.";
      
      if (err.response) {
        // Server responded with error
        errorMsg = err.response.data?.message || err.response.data?.error || errorMsg;
        if (err.response.data?.details) {
          console.error('Error details:', err.response.data.details);
        }
      } else if (err.request) {
        // Request made but no response
        errorMsg = "No response from server. Is the backend running?";
      } else {
        // Error setting up request
        errorMsg = err.message;
      }
      
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