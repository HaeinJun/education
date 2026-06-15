"use client";
import { incomeStatement } from "@/lib/data";

function DeltaBadge({ value }: { value: string }) {
  const isPos = value.startsWith("+");
  const isNeg = value.startsWith("-");
  const color = isPos ? "text-emerald-400" : isNeg ? "text-red-400" : "text-slate-400";
  return <span className={`text-xs font-semibold ${color}`}>{value}</span>;
}

export default function IncomeTable() {
  return (
    <div className="rounded-xl p-5 border overflow-x-auto scrollbar-thin" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: "#e8eaf0" }}>손익계산서 (십억원)</h3>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border)" }}>
            {["항목", "Q1 2025", "Q4 2025", "Q1 2026", "전년비", "전분기비"].map((h) => (
              <th key={h} className="py-2 px-3 text-left font-semibold uppercase tracking-wide" style={{ color: "#7a8099" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {incomeStatement.map((row, i) => (
            <tr
              key={i}
              className="border-b transition-colors hover:bg-white/5"
              style={{ borderColor: "var(--border)" }}
            >
              <td className="py-2.5 px-3 font-medium" style={{ color: row.indent ? "#9ca3b4" : "#e8eaf0", paddingLeft: row.indent ? "24px" : "12px" }}>
                {row.label}
              </td>
              <td className="py-2.5 px-3" style={{ color: "#c0c8d8" }}>{typeof row.q1_2025 === "number" ? row.q1_2025.toLocaleString() : row.q1_2025}</td>
              <td className="py-2.5 px-3" style={{ color: "#c0c8d8" }}>{typeof row.q4_2025 === "number" ? row.q4_2025.toLocaleString() : row.q4_2025}</td>
              <td className="py-2.5 px-3 font-semibold" style={{ color: "#e8eaf0" }}>{typeof row.q1_2026 === "number" ? row.q1_2026.toLocaleString() : row.q1_2026}</td>
              <td className="py-2.5 px-3"><DeltaBadge value={row.yoy} /></td>
              <td className="py-2.5 px-3"><DeltaBadge value={row.qoq} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
