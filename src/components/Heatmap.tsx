"use client";
import { IncomeStatement } from "@/lib/supabase";

const metrics: { key: keyof IncomeStatement; label: string }[] = [
  { key: "revenue", label: "매출액" },
  { key: "operating_income", label: "영업이익" },
  { key: "opm", label: "OPM (%)" },
  { key: "net_income", label: "당기순이익" },
  { key: "ebitda", label: "EBITDA" },
];

function getColor(value: number) {
  if (value >= 5) return { bg: "#1a4d2e", text: "#6bcb77" };
  if (value >= 0) return { bg: "#1a3d4d", text: "#00AAD2" };
  if (value >= -10) return { bg: "#3d2a1a", text: "#f0a500" };
  if (value >= -25) return { bg: "#4d1a1a", text: "#ff8c42" };
  return { bg: "#6b1a1a", text: "#ff6b6b" };
}

export default function Heatmap({ income }: { income: IncomeStatement[] }) {
  // 전년 동기 대비 YoY 계산
  const grouped: Record<string, IncomeStatement> = {};
  income.forEach((r) => { grouped[`${r.year}-${r.quarter_num}`] = r; });

  const quarters = income.map((r) => r.quarter);

  return (
    <div className="rounded-xl p-5 border" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: "#e8eaf0" }}>
        KPI 히트맵 <span className="text-xs font-normal ml-2" style={{ color: "#7a8099" }}>전분기비 변동</span>
      </h3>
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left py-2 pr-4 font-normal" style={{ color: "#7a8099", minWidth: 90 }}>지표</th>
              {quarters.map((q) => (
                <th key={q} className="text-center py-2 px-2 font-normal" style={{ color: "#7a8099", minWidth: 90 }}>{q}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map(({ key, label }) => (
              <tr key={key}>
                <td className="py-1.5 pr-4 font-medium" style={{ color: "#c0c8d8" }}>{label}</td>
                {income.map((r, i) => {
                  const prev = income[i - 1];
                  const curr = Number(r[key]);
                  const prevVal = prev ? Number(prev[key]) : null;
                  const pct = prevVal ? ((curr - prevVal) / Math.abs(prevVal)) * 100 : null;
                  const colors = pct !== null ? getColor(pct) : { bg: "#1a1f2e", text: "#7a8099" };
                  return (
                    <td key={r.quarter} className="py-1.5 px-2">
                      <div className="rounded text-center py-1.5 font-semibold" style={{ background: colors.bg, color: colors.text }}>
                        {pct !== null ? `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%` : `${curr}${key === "opm" || key === "npm" ? "%" : ""}`}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-3 mt-3 flex-wrap">
        {[{ bg: "#1a4d2e", text: "#6bcb77", label: "+5% 이상" }, { bg: "#1a3d4d", text: "#00AAD2", label: "0~+5%" }, { bg: "#3d2a1a", text: "#f0a500", label: "-10~0%" }, { bg: "#4d1a1a", text: "#ff8c42", label: "-25~-10%" }, { bg: "#6b1a1a", text: "#ff6b6b", label: "-25% 미만" }].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded" style={{ background: item.bg }}></div>
            <span className="text-xs" style={{ color: item.text }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
