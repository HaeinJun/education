"use client";
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { incomeStatement } from "@/lib/data";

const chartData = [
  { name: "Q1 2025", 매출액: 44408, 영업이익: 3634, OPM: 8.2 },
  { name: "Q4 2025", 매출액: 46839, 영업이익: 1695, OPM: 3.6 },
  { name: "Q1 2026", 매출액: 45939, 영업이익: 2515, OPM: 5.5 },
];

export default function RevenueChart() {
  return (
    <div className="rounded-xl p-5 border" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: "#e8eaf0" }}>매출 & 영업이익 추이</h3>
      <ResponsiveContainer width="100%" height={240}>
        <ComposedChart data={chartData} margin={{ top: 4, right: 24, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2235" />
          <XAxis dataKey="name" tick={{ fill: "#7a8099", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="left" tick={{ fill: "#7a8099", fontSize: 10 }} axisLine={false} tickLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}T`} />
          <YAxis yAxisId="right" orientation="right" tick={{ fill: "#7a8099", fontSize: 10 }} axisLine={false} tickLine={false}
            tickFormatter={(v) => `${v}%`} domain={[0, 12]} />
          <Tooltip
            contentStyle={{ background: "#0f1117", border: "1px solid #1e2235", borderRadius: 8, fontSize: 12 }}
            formatter={(value, name) =>
              name === "OPM" ? [`${value}%`, name as string] : [`${Number(value).toLocaleString()}십억원`, name as string]
            }
          />
          <Legend wrapperStyle={{ fontSize: 11, color: "#7a8099" }} />
          <Bar yAxisId="left" dataKey="매출액" fill="#002C5F" radius={[4, 4, 0, 0]} />
          <Bar yAxisId="left" dataKey="영업이익" fill="#00AAD2" radius={[4, 4, 0, 0]} />
          <Line yAxisId="right" type="monotone" dataKey="OPM" stroke="#f0a500" strokeWidth={2} dot={{ fill: "#f0a500" }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
