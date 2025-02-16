// "use client";
// import { useEffect, useState } from "react";
// import { fetcher } from "@/utils/api";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// interface Stats {
//   eventId: string;
//   _sum: { amount: number };
// }

// export default function StatsChart() {
//   const [stats, setStats] = useState<Stats[]>([]);

//   useEffect(() => {
//     fetcher("/stats?range=month")
//       .then((data) => setStats(data))
//       .catch((err) => console.error("Error fetching stats:", err));
//   }, []);

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">Event Statistics</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={stats}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="eventId" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="_sum.amount" stroke="#8884d8" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
