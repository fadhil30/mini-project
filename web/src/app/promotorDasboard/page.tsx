"use client";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DashboardData {
  promotor: {
    id: number;
    fullName: string;
    email: string;
  };
  events: {
    id: number;
    title: string;
    Attendee: unknown[];
    PromotorTrans: { amount: string }[];
  }[];
  totalEvents: number;
  totalAttendees: number;
  totalRevenue: number;
  stats: {
    daily: Record<string, number>;
    monthly: Record<string, number>;
    yearly: Record<string, number>;
  };
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<"daily" | "monthly" | "yearly">("daily");
  const promotorId = 1; // TODO: Gantilah dengan ID promotor yang sesuai

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`http://localhost:8000/api/v1/dashboard/${promotorId}`);
      if (!response.ok) {
        throw new Error(
          "Failed to fetch dashboard data. Status: " + response.status
        );
      }
      const data = await response.json();
      console.log("Fetched data:", data); // Debugging data response
      setDashboardData(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An error occurred while fetching dashboard.");
      }
    } finally {
      setLoading(false);
    }
  }

  function createRechartsData(stats: Record<string, number>) {
    const sortedDates = Object.keys(stats).sort();
    return sortedDates.map((date) => ({
      date,
      value: stats[date],
    }));
  }

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!dashboardData) {
    return null;
  }

  const { totalEvents, totalAttendees, totalRevenue, events, stats } = dashboardData;

  let chartTitle: string;
  let chartData: { date: string; value: number }[] = [];

  if (viewMode === "daily") {
    chartTitle = "Daily Registrations";
    chartData = createRechartsData(stats.daily);
  } else if (viewMode === "monthly") {
    chartTitle = "Monthly Registrations";
    chartData = createRechartsData(stats.monthly);
  } else {
    chartTitle = "Yearly Registrations";
    chartData = createRechartsData(stats.yearly);
  }

  return (
    <div>
      <h1>Organizer Dashboard</h1>
      <p>Total Events: {totalEvents}</p>
      <p>Total Attendees: {totalAttendees}</p>
      <p>Total Revenue: ${totalRevenue.toLocaleString()}</p>

      <div>
        <button onClick={() => setViewMode("daily")}>Daily</button>
        <button onClick={() => setViewMode("monthly")}>Monthly</button>
        <button onClick={() => setViewMode("yearly")}>Yearly</button>
      </div>

      <h2>{chartTitle}</h2>
      <ResponsiveContainer width="100%" height={400}>
        {viewMode === "daily" ? (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#4a90e2" />
          </LineChart>
        ) : (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#4a90e2" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}