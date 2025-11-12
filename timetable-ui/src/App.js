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
      <h1>🕒 Timetable Automation System</h1>
      <p className="subtext">
        Upload CSV files, set configurations, and generate timetables easily.
      </p>

      <FileUpload setStatus={setStatus} />
      {/* <ConfigPanel config={config} setConfig={setConfig} /> */}
      <ActionButtons
        setStatus={setStatus}
        setDownloads={setDownloads}
        config={config}
      />
      <StatusBox status={status} downloads={downloads} />
    </div>
  );
}

export default App;