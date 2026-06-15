"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { quarterlyTrend } from "@/lib/data";

export default function SalesChart() {
  return (
    <div className="rounded-xl p-5 border" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: "#e8eaf0" }}>분기별 차급 판매 추이 (천대)</h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={quarterlyTrend} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2235" />
          <XAxis dataKey="quarter" tick={{ fill: "#7a8099", fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#7a8099", fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: "#0f1117", border: "1px solid #1e2235", borderRadius: 8, fontSize: 12 }}
            formatter={(v) => [`${v}천대`]}
          />
          <Legend wrapperStyle={{ fontSize: 11, color: "#7a8099" }} />
          <Bar dataKey="suv" name="SUV" stackId="a" fill="#002C5F" />
          <Bar dataKey="sedan" name="승용" stackId="a" fill="#00558a" />
          <Bar dataKey="commercial" name="상용" stackId="a" fill="#00AAD2" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
