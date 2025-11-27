import React from "react";

const API_BASE = "http://localhost:5000";

export default function StatusBox({ status, downloads }) {
  const handleDownload = (file) => {
    // Handle both string filenames and file objects with path property
    const fileName = typeof file === 'string' ? file : file.name;
    const filePath = typeof file === 'string' ? file : (file.path || file.name);
    
    const link = document.createElement('a');
    link.href = `${API_BASE}/download?file=${encodeURIComponent(filePath)}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Ensure downloads is always an array and filter out invalid entries
  const validDownloads = Array.isArray(downloads) ? downloads.filter(file => {
    if (typeof file === 'string') return file.length > 0;
    if (typeof file === 'object' && file !== null) return file.name && file.name.length > 0;
    return false;
  }) : [];

  return (
    <div className="card status-box">
      <h2>Status</h2>
      <p className="status-text">{status}</p>
      {validDownloads.length > 0 && (
        <div className="downloads">
          <h3>📥 Download Generated Files:</h3>
          <div className="download-list">
            {validDownloads.map((file, i) => {
              const fileName = typeof file === 'string' ? file : file.name;
              return (
                <button
                  key={i}
                  className="download-button"
                  onClick={() => handleDownload(file)}
                  title={`Download ${fileName}`}
                >
                  📄 {fileName}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}