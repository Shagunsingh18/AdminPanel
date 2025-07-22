import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const enrollmentData = [
  { name: 'Jan', enrolled: 120 },
  { name: 'Feb', enrolled: 150 },
  { name: 'Mar', enrolled: 180 },
];

const stats = [
  { title: 'Total Users', value: 3200 },
  { title: 'Total Courses', value: 120 },
  { title: 'Completed Courses', value: 85 },
];

export default function SystemMonitoring() {
  return (
    <div className="p-5 space-y-6 dark:bg-gray-400">
      <h2 className="text-3xl font-bold text-black ">System Monitoring</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-whiten border-2 bg-gradient-to-r from-pink-500 to-teal-300 shadow-md rounded-xl p-6 flex flex-col items-start"
          >
            <h4 className="text-lg font-semibold text-white dark:text-white">{item.title}</h4>
            <p className="mt-2 text-2xl font-bold text-white dark:text-white">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Enrollment Line Chart */}
      <div className="bg-white border-2 dark:bg-gray-500 p-6 shadow-md rounded-xl">
        <h3 className="text-xl font-semibold mb-4 text-black">
          Enrollment Trends
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={enrollmentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="name" stroke="#FFFFFF" />
            <YAxis stroke="#FFFFFF" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="enrolled"
              stroke="#FFFFFF"
              strokeWidth={3}
              activeDot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
