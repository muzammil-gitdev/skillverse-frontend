"use client";

import { useEffect, useState } from "react";
import { getAdminDashboard } from "../services/adminApi";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getAdminDashboard();

        setStats([
          {
            label: "Total Users",
            value: data.totalUsers,
            trend: "+0%",
            trendUp: true,
          },
          {
            label: "Revenue",
            value: `$${data.revenue}`,
            trend: "+0%",
            trendUp: true,
          },
          {
            label: "Active Freelancers",
            value: data.freelancers,
            trend: "+0%",
            trendUp: true,
          },
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">Last updated: Just now</div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>

            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>

              <span
                className={`text-sm font-medium ${
                  stat.trendUp ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mt-8 min-h-[300px]">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Recent Activity
        </h2>

        <div className="flex flex-col gap-4">
          {/* Later replace with real data */}
          <p className="text-gray-500 text-sm">No recent activity yet</p>
        </div>
      </div>
    </div>
  );
}
