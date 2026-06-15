"use client";
import { IncomeStatement } from "@/lib/supabase";

function Delta({ value }: { value: number | null | undefined }) {
  if (value == null) return <span style={{ color: "#7a8099" }}>-</span>;
  const color = value > 0 ? "text-emerald-400" : value < 0 ? "text-red-400" : "text-slate-400";
  return <span className={`text-xs font-semibold ${color}`}>{value > 0 ? "+" : ""}{value.toFixed(1)}%</span>;
}

const rows: { label: string; key: keyof IncomeStatement; indent: number }[] = [
  { label: "매출액", key: "revenue", indent: 0 },
  { label: "자동차", key: "revenue_auto", indent: 1 },
  { label: "금융", key: "revenue_finance", indent: 1 },
  { label: "기타", key: "revenue_other", indent: 1 },
  { label: "매출원가", key: "cost_of_sales", indent: 0 },
  { label: "매출총이익", key: "gross_profit", indent: 0 },
  { label: "판매관리비", key: "sga", indent: 0 },
  { label: "영업이익", key: "operating_income", indent: 0 },
  { label: "경상이익", key: "ordinary_income", indent: 0 },
  { label: "당기순이익", key: "net_income", indent: 0 },
  { label: "EBITDA", key: "ebitda", indent: 0 },
];

export default function IncomeTable({ income }: { income: IncomeStatement[] }) {
  const q1_2025 = income.find((r) => r.year === 2025 && r.quarter_num === 1);
  const q4_2025 = income.find((r) => r.year === 2025 && r.quarter_num === 4);
  const q1_2026 = income.find((r) => r.year === 2026 && r.quarter_num === 1);

  const yoy = (a?: number, b?: number) => (a && b ? ((a - b) / Math.abs(b)) * 100 : null);
  const qoq = (a?: number, b?: number) => (a && b ? ((a - b) / Math.abs(b)) * 100 : null);

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
          {rows.map(({ label, key, indent }) => {
            const v1 = q1_2025?.[key] as number;
            const v4 = q4_2025?.[key] as number;
            const v2 = q1_2026?.[key] as number;
            return (
              <tr key={label} className="border-b transition-colors hover:bg-white/5" style={{ borderColor: "var(--border)" }}>
                <td className="py-2.5 px-3 font-medium" style={{ color: indent ? "#9ca3b4" : "#e8eaf0", paddingLeft: indent ? "24px" : "12px" }}>{label}</td>
                <td className="py-2.5 px-3" style={{ color: "#c0c8d8" }}>{v1?.toLocaleString() ?? "-"}</td>
                <td className="py-2.5 px-3" style={{ color: "#c0c8d8" }}>{v4?.toLocaleString() ?? "-"}</td>
                <td className="py-2.5 px-3 font-semibold" style={{ color: "#e8eaf0" }}>{v2?.toLocaleString() ?? "-"}</td>
                <td className="py-2.5 px-3"><Delta value={yoy(v2, v1)} /></td>
                <td className="py-2.5 px-3"><Delta value={qoq(v2, v4)} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
