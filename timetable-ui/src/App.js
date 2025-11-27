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
    timetable_settings: {
      working_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      start_time: "09:00",
      end_time: "17:30",
      slot_duration_minutes: 30
    },
    break_settings: {
      lunch_break: {
        enabled: true,
        start_time: "13:30",
        end_time: "14:30",
        duration_minutes: 60
      }
    },
    duration_constants: {
      lecture_slots: 3,
      lab_slots: 4,
      tutorial_slots: 2
    },
    exam_settings: {
      enabled_slots: ["morning", "afternoon"]
    },
    scheduling_preferences: {
      allow_back_to_back_lectures: true,
      max_lectures_per_day: 6,
      prefer_morning_labs: true
    }
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
        <ConfigPanel config={config} setConfig={setConfig} />
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