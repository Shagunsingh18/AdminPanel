import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const userActivityData = [
  { name: 'Mon', users: 400 },
  { name: 'Tue', users: 300 },
  { name: 'Wed', users: 500 },
  { name: 'Thu', users: 200 },
  { name: 'Fri', users: 600 },
  { name: 'Sat', users: 100 },
  { name: 'Sun', users: 300 },
];

const revenueData = [
  { name: 'Jan', revenue: 12000 },
  { name: 'Feb', revenue: 15000 },
  { name: 'Mar', revenue: 18000 },
  { name: 'Apr', revenue: 17000 },
  { name: 'May', revenue: 20000 },
  { name: 'Jun', revenue: 21000 },
];

const performanceData = [
  { name: 'Fast', value: 45 },
  { name: 'Average', value: 35 },
  { name: 'Slow', value: 20 },
];

const COLORS = ['#3b82f6', '#10b981', '#f97316'];

export default function Reports() {
  return (
    <div className="p-8 space-y-10 bg-gray-300">
      <h1 className="text-3xl font-bold text-black">📊 Reports Dashboard</h1>

      {/* User Activity Chart */}
      <section>
        <h2 className="text-xl font-semibold text-black mb-3">User Activity (Weekly)</h2>
        <div className="bg-white border-2 text-black rounded-2xl shadow-md p-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#F06292" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Revenue Chart */}
      <section>
        <h2 className="text-xl font-semibold text-black mb-3">Revenue Trend (Monthly)</h2>
        <div className="bg-white border-2 rounded-2xl shadow-md p-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#008000" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Performance Chart */}
      <section>
        <h2 className="text-xl font-semibold text-black mb-3">System Performance</h2>
        <div className="bg-white border-2 rounded-2xl shadow-md p-4">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={performanceData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

