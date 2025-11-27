import React, { useState } from "react";

export default function ConfigPanel({ config, setConfig }) {
  const [isOpen, setIsOpen] = useState(false);

  console.log("ConfigPanel rendered, config:", config);

  const updateConfig = (section, key, value) => {
    setConfig({
      ...config,
      [section]: {
        ...config[section],
        [key]: value
      }
    });
  };

  const updateNestedConfig = (section, subsection, key, value) => {
    setConfig({
      ...config,
      [section]: {
        ...config[section],
        [subsection]: {
          ...config[section][subsection],
          [key]: value
        }
      }
    });
  };

  if (!isOpen) {
    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "20px 0" }}>
        <button 
          className="action-button"
          onClick={() => setIsOpen(true)}
          style={{ 
            backgroundColor: "#6c757d", 
            color: "#ffffff",
            padding: "12px 24px",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          ⚙️ Open Configuration Panel
        </button>
      </div>
    );
  }

  return (
    <div className="card" style={{ marginTop: "20px", padding: "20px", backgroundColor: "rgba(15, 15, 15, 0.98)", border: "1px solid #2d2d2d" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0, color: "#ffffff" }}>⚙️ Timetable Configuration</h2>
        <button 
          className="action-button"
          onClick={() => setIsOpen(false)}
          style={{ backgroundColor: "#dc3545", padding: "8px 16px" }}
        >
          ✖ Close
        </button>
      </div>

      {/* Timetable Settings */}
      <div style={{ marginBottom: "25px", padding: "15px", backgroundColor: "rgba(0, 0, 0, 0.6)", borderRadius: "8px", border: "1px solid #2d2d2d" }}>
        <h3 style={{ marginTop: 0, color: "#9333ea" }}>🕐 Timetable Settings</h3>
        <div className="config-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
          <div>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Start Time</label>
            <input
              type="time"
              value={config.timetable_settings?.start_time || "09:00"}
              onChange={(e) => updateConfig("timetable_settings", "start_time", e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #3d3d3d", backgroundColor: "rgba(0, 0, 0, 0.9)", color: "#e0e0e0" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>End Time</label>
            <input
              type="time"
              value={config.timetable_settings?.end_time || "18:30"}
              onChange={(e) => updateConfig("timetable_settings", "end_time", e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #3d3d3d", backgroundColor: "rgba(0, 0, 0, 0.9)", color: "#e0e0e0" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Slot Duration (min)</label>
            <input
              type="number"
              value={config.timetable_settings?.slot_duration_minutes || 30}
              onChange={(e) => updateConfig("timetable_settings", "slot_duration_minutes", parseInt(e.target.value))}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #3d3d3d", backgroundColor: "rgba(0, 0, 0, 0.9)", color: "#e0e0e0" }}
            />
          </div>
        </div>
      </div>

      {/* Break Settings */}
      <div style={{ marginBottom: "25px", padding: "15px", backgroundColor: "rgba(0, 0, 0, 0.6)", borderRadius: "8px", border: "1px solid #2d2d2d" }}>
        <h3 style={{ marginTop: 0, color: "#9333ea" }}>☕ Break Settings</h3>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>
            <input
              type="checkbox"
              checked={config.break_settings?.lunch_break?.enabled || false}
              onChange={(e) => updateNestedConfig("break_settings", "lunch_break", "enabled", e.target.checked)}
              style={{ marginRight: "8px" }}
            />
            Enable Lunch Break
          </label>
        </div>
        {config.break_settings?.lunch_break?.enabled && (
          <div className="config-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
            <div>
              <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Lunch Start Time</label>
              <input
                type="time"
                value={config.break_settings?.lunch_break?.start_time || "12:30"}
                onChange={(e) => updateNestedConfig("break_settings", "lunch_break", "start_time", e.target.value)}
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #3d3d3d", backgroundColor: "rgba(0, 0, 0, 0.9)", color: "#e0e0e0" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Lunch End Time</label>
              <input
                type="time"
                value={config.break_settings?.lunch_break?.end_time || "14:00"}
                onChange={(e) => updateNestedConfig("break_settings", "lunch_break", "end_time", e.target.value)}
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #3d3d3d", backgroundColor: "rgba(0, 0, 0, 0.9)", color: "#e0e0e0" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Duration (min)</label>
              <input
                type="number"
                value={config.break_settings?.lunch_break?.duration_minutes || 60}
                onChange={(e) => updateNestedConfig("break_settings", "lunch_break", "duration_minutes", parseInt(e.target.value))}
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #3d3d3d", backgroundColor: "rgba(0, 0, 0, 0.9)", color: "#e0e0e0" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Duration Constants */}
      <div style={{ marginBottom: "25px", padding: "15px", backgroundColor: "rgba(0, 0, 0, 0.6)", borderRadius: "8px", border: "1px solid #2d2d2d" }}>
        <h3 style={{ marginTop: 0, color: "#9333ea" }}>⏱️ Class Duration (in slots)</h3>
        <div className="config-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
          <div>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Lecture Slots</label>
            <input
              type="number"
              value={config.duration_constants?.lecture_slots || 3}
              onChange={(e) => updateConfig("duration_constants", "lecture_slots", parseInt(e.target.value))}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #3d3d3d", backgroundColor: "rgba(0, 0, 0, 0.9)", color: "#e0e0e0" }}
            />
            <small style={{ color: "#9ca3af" }}>({(config.duration_constants?.lecture_slots || 3) * 30} minutes)</small>
          </div>
          <div>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Lab Slots</label>
            <input
              type="number"
              value={config.duration_constants?.lab_slots || 4}
              onChange={(e) => updateConfig("duration_constants", "lab_slots", parseInt(e.target.value))}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #3d3d3d", backgroundColor: "rgba(0, 0, 0, 0.9)", color: "#e0e0e0" }}
            />
            <small style={{ color: "#9ca3af" }}>({(config.duration_constants?.lab_slots || 4) * 30} minutes)</small>
          </div>
          <div>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Tutorial Slots</label>
            <input
              type="number"
              value={config.duration_constants?.tutorial_slots || 2}
              onChange={(e) => updateConfig("duration_constants", "tutorial_slots", parseInt(e.target.value))}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #3d3d3d", backgroundColor: "rgba(0, 0, 0, 0.9)", color: "#e0e0e0" }}
            />
            <small style={{ color: "#9ca3af" }}>({(config.duration_constants?.tutorial_slots || 2) * 30} minutes)</small>
          </div>
        </div>
      </div>

      {/* Exam Configuration */}
      <div style={{ marginBottom: "25px", padding: "15px", backgroundColor: "rgba(0, 0, 0, 0.6)", borderRadius: "8px", border: "1px solid #2d2d2d" }}>
        <h3 style={{ marginTop: 0, color: "#9333ea" }}>📝 Exam Settings</h3>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "10px" }}>
            Enabled Exam Slots:
          </label>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <label style={{ display: "flex", alignItems: "center", fontWeight: "normal" }}>
              <input
                type="checkbox"
                checked={config.exam_settings?.enabled_slots?.includes('morning') ?? true}
                onChange={(e) => {
                  const currentSlots = config.exam_settings?.enabled_slots || ['morning', 'afternoon'];
                  const newSlots = e.target.checked 
                    ? [...new Set([...currentSlots, 'morning'])]
                    : currentSlots.filter(s => s !== 'morning');
                  updateConfig("exam_settings", "enabled_slots", newSlots.length > 0 ? newSlots : ['morning']);
                }}
                style={{ marginRight: "8px" }}
              />
              Morning Slot (9:00 AM)
            </label>
            <label style={{ display: "flex", alignItems: "center", fontWeight: "normal" }}>
              <input
                type="checkbox"
                checked={config.exam_settings?.enabled_slots?.includes('afternoon') ?? true}
                onChange={(e) => {
                  const currentSlots = config.exam_settings?.enabled_slots || ['morning', 'afternoon'];
                  const newSlots = e.target.checked 
                    ? [...new Set([...currentSlots, 'afternoon'])]
                    : currentSlots.filter(s => s !== 'afternoon');
                  updateConfig("exam_settings", "enabled_slots", newSlots.length > 0 ? newSlots : ['afternoon']);
                }}
                style={{ marginRight: "8px" }}
              />
              Afternoon Slot (2:00 PM)
            </label>
          </div>
          <small style={{ color: "#9ca3af", display: "block", marginTop: "10px" }}>
            ℹ️ Select which time slots to use for exams. You can choose one or both.
          </small>
        </div>
      </div>

      {/* Scheduling Preferences */}
      <div style={{ padding: "15px", backgroundColor: "rgba(0, 0, 0, 0.6)", borderRadius: "8px", border: "1px solid #2d2d2d" }}>
        <h3 style={{ marginTop: 0, color: "#9333ea" }}>📋 Scheduling Preferences</h3>
        <div className="config-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
          <div>
            <label style={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>
              <input
                type="checkbox"
                checked={config.scheduling_preferences?.allow_back_to_back_lectures || false}
                onChange={(e) => updateConfig("scheduling_preferences", "allow_back_to_back_lectures", e.target.checked)}
                style={{ marginRight: "8px" }}
              />
              Allow Back-to-Back Lectures
            </label>
          </div>
          <div>
            <label style={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>
              <input
                type="checkbox"
                checked={config.scheduling_preferences?.prefer_morning_labs || false}
                onChange={(e) => updateConfig("scheduling_preferences", "prefer_morning_labs", e.target.checked)}
                style={{ marginRight: "8px" }}
              />
              Prefer Morning Labs
            </label>
          </div>
          <div>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Max Lectures/Day</label>
            <input
              type="number"
              value={config.scheduling_preferences?.max_lectures_per_day || 6}
              onChange={(e) => updateConfig("scheduling_preferences", "max_lectures_per_day", parseInt(e.target.value))}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #3d3d3d", backgroundColor: "rgba(0, 0, 0, 0.9)", color: "#e0e0e0" }}
            />
          </div>
        </div>
      </div>

      <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "rgba(16, 185, 129, 0.15)", borderRadius: "4px", border: "1px solid #059669" }}>
        <small style={{ color: "#10b981" }}>
          ℹ️ <strong>Note:</strong> Changes will apply when you generate a new timetable. The configuration is saved with each generation.
        </small>
      </div>
    </div>
  );
}