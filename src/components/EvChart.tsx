"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { SalesData } from "@/lib/supabase";

export default function EvChart({ sales }: { sales: SalesData[] }) {
  const data = sales.map((r) => ({
    quarter: r.quarter,
    HEV: r.sales_hev,
    EV: r.sales_ev,
    PHEV: r.sales_phev,
  }));

  return (
    <div className="rounded-xl p-5 border" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: "#e8eaf0" }}>친환경차 판매 추이 (천대)</h3>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="hevGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00AAD2" stopOpacity={0.3} /><stop offset="95%" stopColor="#00AAD2" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="evGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f0a500" stopOpacity={0.3} /><stop offset="95%" stopColor="#f0a500" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2235" />
          <XAxis dataKey="quarter" tick={{ fill: "#7a8099", fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#7a8099", fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: "#0f1117", border: "1px solid #1e2235", borderRadius: 8, fontSize: 12 }} formatter={(v) => [`${v}천대`]} />
          <Legend wrapperStyle={{ fontSize: 11, color: "#7a8099" }} />
          <Area type="monotone" dataKey="HEV" stroke="#00AAD2" fill="url(#hevGrad)" strokeWidth={2} />
          <Area type="monotone" dataKey="EV" stroke="#f0a500" fill="url(#evGrad)" strokeWidth={2} />
          <Area type="monotone" dataKey="PHEV" stroke="#6bcb77" fill="none" strokeWidth={1.5} strokeDasharray="4 2" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
