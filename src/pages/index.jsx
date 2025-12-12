"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const studentGrowth = [
  { month: "Jan", students: 120 },
  { month: "Feb", students: 150 },
  { month: "Mar", students: 200 },
  { month: "Apr", students: 280 },
];

const feesTrend = [
  { month: "Jan", amount: 40000 },
  { month: "Feb", amount: 52000 },
  { month: "Mar", amount: 68000 },
  { month: "Apr", amount: 75000 },
];

const departmentData = [
  { name: "CS", value: 300 },
  { name: "IT", value: 200 },
  { name: "ECE", value: 150 },
  { name: "EEE", value: 120 },
];

const COLORS = ["#557A66", "#D3C9B6", "#A7C4BC", "#8E9775"];

export default function IndexPage() {
  return (
    <div className="space-y-6 p-6">
      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="py-6"><div className="text-center"><p className="text-gray-500 text-sm">Total Students</p><h2 className="text-2xl font-bold">1,200</h2></div></CardContent></Card>
        <Card><CardContent className="py-6"><div className="text-center"><p className="text-gray-500 text-sm">Teachers</p><h2 className="text-2xl font-bold">45</h2></div></CardContent></Card>
        <Card><CardContent className="py-6"><div className="text-center"><p className="text-gray-500 text-sm">Classrooms</p><h2 className="text-2xl font-bold">32</h2></div></CardContent></Card>
        <Card><CardContent className="py-6"><div className="text-center"><p className="text-gray-500 text-sm">Monthly Fees</p><h2 className="text-2xl font-bold">₹ 67,000</h2></div></CardContent></Card>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Student Growth */}
        <Card>
          <CardHeader><CardTitle>Student Growth</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={studentGrowth}>
                <Line type="monotone" dataKey="students" stroke="#557A66" strokeWidth={3} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fee Collection Trend */}
        <Card>
          <CardHeader><CardTitle>Fee Collection</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={feesTrend}>
                <Bar dataKey="amount" fill="#557A66" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Pie Chart */}
      <Card>
        <CardHeader><CardTitle>Students By Department</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={departmentData} dataKey="value" nameKey="name" outerRadius={120} label>
                {departmentData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
