// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";


// export default function TripDetails() {
//   // const { tripId } = useParams();
//   // const [trip, setTrip] = useState(null);
//   // const navigate = useNavigate();

//   // useEffect(() => {
//   //   const fetchTrip = async () => {
//   //     try {
//   //       const res = await axios.get(`${BASE_URL}/api/trips/${tripId}`);
//   //       setTrip(res.data);
//   //     } catch (err) {
//   //       console.error("Failed to load trip", err);
//   //       alert("Trip not found");
//   //     }
//   //   };
//   //   fetchTrip();
//   // }, [tripId]);

//   // if (!trip) return <div className="p-4">Loading trip...</div>;

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-6">
//       <div className="bg-green-600 text-white p-6 rounded-xl shadow-md space-y-4">
//         <div className="flex justify-between">
//           <div>
//             <h1 className="text-2xl font-bold">{trip.name}</h1>
//             <p>{trip.type} Pilgrimage</p>
//           </div>
//           <button onClick={() => navigate(`/trips/${tripId}/edit`)} className="bg-white text-green-600 px-4 py-2 rounded hover:bg-green-100">Edit Trip</button>
//         </div>

//         <div className="grid grid-cols-4 gap-4 text-center">
//           <div>
//             <p className="text-sm">Start Date</p>
//             <strong>{trip.start_date}</strong>
//           </div>
//           <div>
//             <p className="text-sm">End Date</p>
//             <strong>{trip.end_date}</strong>
//           </div>
//           <div>
//             <p className="text-sm">Rituals</p>
//             <strong>{trip.rituals_count ?? 0}</strong>
//           </div>
//           <div>
//             <p className="text-sm">Stages</p>
//             <strong>{trip.stages_count ?? 0}</strong>
//           </div>
//         </div>

//         <div>
//           <p className="text-sm mb-1">Overall Progress</p>
//           <div className="w-full h-2 bg-green-300 rounded-full">
//             <div className="h-full bg-white rounded-full" style={{ width: `${trip.progress || 0}%` }} />
//           </div>
//           <p className="text-right text-sm mt-1">{trip.progress || 0}%</p>
//         </div>
//       </div>

//       {/* Tabs: Overview / Rituals / etc. */}
//       <div className="flex space-x-4 border-b pb-2">
//         {["Overview", "Rituals", "Stages", "Packing", "Notes"].map((tab) => (
//           <button key={tab} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-600">
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* You can insert other components like OverviewTab, RitualsTab here */}
//     </div>
//   );
// }
