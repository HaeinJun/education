"use client";

interface KpiCardProps {
  label: string;
  value: string | number;
  unit: string;
  change: string;
  changeLabel: string;
  isPositive?: boolean | null;
}

export default function KpiCard({ label, value, unit, change, changeLabel, isPositive }: KpiCardProps) {
  const color =
    isPositive === true ? "text-emerald-400" :
    isPositive === false ? "text-red-400" :
    "text-slate-400";

  const arrow = isPositive === true ? "▲" : isPositive === false ? "▼" : "–";

  return (
    <div className="rounded-xl p-4 border" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
      <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#7a8099" }}>{label}</p>
      <p className="text-2xl font-bold mb-1" style={{ color: "#e8eaf0" }}>
        {typeof value === "number" ? value.toLocaleString() : value}
        <span className="text-sm font-normal ml-1" style={{ color: "#7a8099" }}>{unit}</span>
      </p>
      <p className={`text-xs font-semibold ${color}`}>
        {arrow} {change} <span className="font-normal text-slate-500">{changeLabel}</span>
      </p>
    </div>
  );
}
