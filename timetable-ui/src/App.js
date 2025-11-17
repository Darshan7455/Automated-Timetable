import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import ConfigPanel from "./components/ConfigPanel";
import ActionButtons from "./components/ActionButtons";
import StatusBox from "./components/StatusBox";
import "./style.css";

function App() {
  const [status, setStatus] = useState("Ready.");
  const [downloads, setDownloads] = useState([]);
  const [config, setConfig] = useState({
    lectureDuration: 3,
    labDuration: 4,
    examSlots: 2,
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <span className="logo-icon">📅</span>
            <div>
              <h1>Timetable Generator</h1>
              <p className="subtext">
                Advanced scheduling system for academic institutions
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="main-content">
        <FileUpload setStatus={setStatus} />
        <ActionButtons
          setStatus={setStatus}
          setDownloads={setDownloads}
          config={config}
        />
        <StatusBox status={status} downloads={downloads} />
      </div>
    </div>
  );
}

export default App;