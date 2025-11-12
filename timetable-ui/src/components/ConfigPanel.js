import React from "react";

// export default function ConfigPanel({ config, setConfig }) {
//   return (
//     <div className="card">
//       <h2>Configuration</h2>
//       <div className="config-grid">
//         <div>
//           <label>Lecture Duration (hrs)</label>
//           <input
//             type="number"
//             value={config.lectureDuration}
//             onChange={(e) =>
//               setConfig({ ...config, lectureDuration: parseInt(e.target.value) })
//             }
//           />
//         </div>
//         <div>
//           <label>Lab Duration (hrs)</label>
//           <input
//             type="number"
//             value={config.labDuration}
//             onChange={(e) =>
//               setConfig({ ...config, labDuration: parseInt(e.target.value) })
//             }
//           />
//         </div>
//         <div>
//           <label>Exam Slots / Day</label>
//           <input
//             type="number"
//             value={config.examSlots}
//             onChange={(e) =>
//               setConfig({ ...config, examSlots: parseInt(e.target.value) })
//             }
//           />
//         </div>
//       </div>
//     </div>
//   );
// }