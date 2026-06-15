"use client";

const metrics = ["매출액", "영업이익", "OPM", "당기순이익", "EBITDA"];
const quarters = ["Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025", "Q1 2026"];

// YoY growth rates by quarter (estimated from available data)
const heatmapData: Record<string, Record<string, number>> = {
  "매출액":     { "Q1 2025": 8.1, "Q2 2025": 5.2, "Q3 2025": 4.8, "Q4 2025": 2.1, "Q1 2026": 3.4 },
  "영업이익":   { "Q1 2025": 2.1, "Q2 2025": -5.1, "Q3 2025": -12.3, "Q4 2025": -47.9, "Q1 2026": -30.8 },
  "OPM":        { "Q1 2025": 0.5, "Q2 2025": -0.9, "Q3 2025": -1.7, "Q4 2025": -4.8, "Q1 2026": -2.7 },
  "당기순이익": { "Q1 2025": 3.2, "Q2 2025": -3.4, "Q3 2025": -8.9, "Q4 2025": -53.2, "Q1 2026": -23.6 },
  "EBITDA":     { "Q1 2025": 5.4, "Q2 2025": 1.2, "Q3 2025": -5.6, "Q4 2025": -30.1, "Q1 2026": -20.3 },
};

function getColor(value: number): string {
  if (value >= 5) return "#1a4d2e";
  if (value >= 0) return "#1a3d4d";
  if (value >= -10) return "#3d2a1a";
  if (value >= -25) return "#4d1a1a";
  return "#6b1a1a";
}

function getTextColor(value: number): string {
  if (value >= 5) return "#6bcb77";
  if (value >= 0) return "#00AAD2";
  if (value >= -10) return "#f0a500";
  if (value >= -25) return "#ff8c42";
  return "#ff6b6b";
}

export default function Heatmap() {
  return (
    <div className="rounded-xl p-5 border" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: "#e8eaf0" }}>
        KPI 히트맵 <span className="text-xs font-normal ml-2" style={{ color: "#7a8099" }}>YoY 증감률 (%)</span>
      </h3>
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left py-2 pr-4 font-normal" style={{ color: "#7a8099", minWidth: 80 }}>지표</th>
              {quarters.map((q) => (
                <th key={q} className="text-center py-2 px-2 font-normal" style={{ color: "#7a8099", minWidth: 80 }}>{q}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => (
              <tr key={metric}>
                <td className="py-1.5 pr-4 font-medium" style={{ color: "#c0c8d8" }}>{metric}</td>
                {quarters.map((q) => {
                  const val = heatmapData[metric][q];
                  return (
                    <td key={q} className="py-1.5 px-2">
                      <div
                        className="rounded text-center py-1.5 font-semibold"
                        style={{ background: getColor(val), color: getTextColor(val) }}
                      >
                        {val > 0 ? "+" : ""}{val}%
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
        {[
          { color: "#1a4d2e", text: "#6bcb77", label: "+5% 이상" },
          { color: "#1a3d4d", text: "#00AAD2", label: "0~+5%" },
          { color: "#3d2a1a", text: "#f0a500", label: "-10~0%" },
          { color: "#4d1a1a", text: "#ff8c42", label: "-25~-10%" },
          { color: "#6b1a1a", text: "#ff6b6b", label: "-25% 미만" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded" style={{ background: item.color }}></div>
            <span className="text-xs" style={{ color: item.text }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
