import React from "react";

const API_BASE = "http://localhost:5000";

export default function StatusBox({ status, downloads }) {
  const handleDownload = (file) => {
    const link = document.createElement('a');
    link.href = `${API_BASE}/download?file=${encodeURIComponent(file)}`;
    link.download = file;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="card status-box">
      <h2>Status</h2>
      <p className="status-text">{status}</p>
      {downloads.length > 0 && (
        <div className="downloads">
          <h3>📥 Download Generated Files:</h3>
          <div className="download-list">
            {downloads.map((file, i) => (
              <button
                key={i}
                className="download-button"
                onClick={() => handleDownload(file)}
                title={`Download ${file}`}
              >
                📄 {file}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}