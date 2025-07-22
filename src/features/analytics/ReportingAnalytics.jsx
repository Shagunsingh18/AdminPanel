import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const dummyData = [
  { course: "React", score: 87, users: 30 },
  { course: "Node.js", score: 72, users: 20 },
  { course: "Python", score: 95, users: 35 },
];

export default function ReportingAnalytics() {
  const exportCSV = () => {
    const headers = ["Course", "Score", "Users"];
    const rows = dummyData.map(d => [d.course, d.score, d.users].join(","));
    const csvContent = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "analytics_report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-8 bg-white">
      <h2 className="text-2xl font-bold">Reporting & Analytics</h2>

      <div className="flex items-center space-x-4">
        <input type="date" className="border rounded px-3 py-1" />
        <input type="date" className="border rounded px-3 py-1" />
        <button
          onClick={exportCSV}
          className="bg-white text-white px-4 py-1 rounded"
        >
          Export CSV
        </button>
      </div>

      {/* Chart Section */}
      <div className="w-full h-80">
        <ResponsiveContainer>
          <BarChart data={dummyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="course" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#6B8E23" name="Avg Score" />
            <Bar dataKey="users" fill="#808080 " name="Users Enrolled" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
