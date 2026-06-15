"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { regionalSales } from "@/lib/data";

export default function RegionalChart() {
  return (
    <div className="rounded-xl p-5 border" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: "#e8eaf0" }}>지역별 판매 비교 (천대)</h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={regionalSales} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2235" />
          <XAxis dataKey="region" tick={{ fill: "#7a8099", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#7a8099", fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: "#0f1117", border: "1px solid #1e2235", borderRadius: 8, fontSize: 12 }}
            formatter={(v, name) => [`${v}천대`, name === "q1_2025" ? "Q1 2025" : "Q1 2026"]}
          />
          <Legend
            formatter={(value) => value === "q1_2025" ? "Q1 2025" : "Q1 2026"}
            wrapperStyle={{ fontSize: 11, color: "#7a8099" }}
          />
          <Bar dataKey="q1_2025" name="q1_2025" fill="#002C5F" radius={[4, 4, 0, 0]} />
          <Bar dataKey="q1_2026" name="q1_2026" radius={[4, 4, 0, 0]}>
            {regionalSales.map((entry) => (
              <Cell
                key={entry.region}
                fill={parseFloat(entry.yoy) >= 0 ? "#00AAD2" : "#ff6b6b"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
