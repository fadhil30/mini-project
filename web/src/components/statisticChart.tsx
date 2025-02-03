"use client"; // Required for client-side components in Next.js 13+
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { events } from "../data/mockData";

const data = events.map((event) => ({
  name: event.name,
  attendees: event.attendees,
  revenue: event.revenue,
}));

export default function StatisticsChart() {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Event Statistics</h2>
      {/* Responsive container untuk menyesuaikan ukuran grafik */}
      <div className="w-full h-[300px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="attendees" stroke="#8884d8" />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}