"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { SalesData } from "@/lib/supabase";

const regions = [
  { key: "sales_us", label: "미국" },
  { key: "sales_europe", label: "유럽" },
  { key: "sales_korea", label: "국내" },
  { key: "sales_india", label: "인도" },
  { key: "sales_china", label: "중국" },
  { key: "sales_latam", label: "중남미" },
];

export default function RegionalChart({ sales }: { sales: SalesData[] }) {
  const q1_2025 = sales.find((r) => r.year === 2025 && r.quarter_num === 1);
  const q1_2026 = sales.find((r) => r.year === 2026 && r.quarter_num === 1);

  const data = regions.map((r) => ({
    region: r.label,
    "Q1 2025": q1_2025?.[r.key as keyof SalesData] as number ?? 0,
    "Q1 2026": q1_2026?.[r.key as keyof SalesData] as number ?? 0,
  }));

  return (
    <div className="rounded-xl p-5 border" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: "#e8eaf0" }}>지역별 판매 비교 (천대)</h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2235" />
          <XAxis dataKey="region" tick={{ fill: "#7a8099", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#7a8099", fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: "#0f1117", border: "1px solid #1e2235", borderRadius: 8, fontSize: 12 }} formatter={(v) => [`${v}천대`]} />
          <Legend wrapperStyle={{ fontSize: 11, color: "#7a8099" }} />
          <Bar dataKey="Q1 2025" fill="#002C5F" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Q1 2026" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.region} fill={entry["Q1 2026"] >= entry["Q1 2025"] ? "#00AAD2" : "#ff6b6b"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
