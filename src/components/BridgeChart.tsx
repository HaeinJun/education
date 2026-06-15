"use client";

interface BridgeItem { label: string; value: number; type: "base" | "positive" | "negative" | "result"; }

export default function BridgeChart({ bridge }: { bridge: Record<string, unknown>[] }) {
  const b = bridge[0];
  const items: BridgeItem[] = b ? [
    { label: b.from_quarter as string, value: 3634, type: "base" },
    { label: "환율", value: b.fx_impact as number, type: (b.fx_impact as number) >= 0 ? "positive" : "negative" },
    { label: "물량", value: b.volume_impact as number, type: (b.volume_impact as number) >= 0 ? "positive" : "negative" },
    { label: "믹스", value: b.mix_impact as number, type: (b.mix_impact as number) >= 0 ? "positive" : "negative" },
    { label: "금융", value: b.finance_impact as number, type: (b.finance_impact as number) >= 0 ? "positive" : "negative" },
    { label: "관세", value: b.tariff_impact as number, type: (b.tariff_impact as number) >= 0 ? "positive" : "negative" },
    { label: "기타", value: b.other_impact as number, type: (b.other_impact as number) >= 0 ? "positive" : "negative" },
    { label: b.to_quarter as string, value: 2515, type: "result" },
  ] : [];

  const maxAbs = 3634;

  return (
    <div className="rounded-xl p-5 border" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: "#e8eaf0" }}>
        영업이익 증감 분석 <span className="text-xs font-normal ml-2" style={{ color: "#7a8099" }}>십억원</span>
      </h3>
      <div className="flex items-end gap-2 overflow-x-auto scrollbar-thin pb-2">
        {items.map((item) => {
          const isBase = item.type === "base" || item.type === "result";
          const barColor = isBase ? "#002C5F" : item.value > 0 ? "#00AAD2" : "#ff6b6b";
          const height = Math.max(Math.abs(item.value) / maxAbs * 140, 8);
          return (
            <div key={item.label} className="flex flex-col items-center gap-1 min-w-[64px]">
              <span className="text-xs font-semibold" style={{ color: isBase ? "#e8eaf0" : item.value > 0 ? "#00AAD2" : "#ff6b6b" }}>
                {item.value > 0 && !isBase ? "+" : ""}{item.value.toLocaleString()}
              </span>
              <div className="w-10 rounded" style={{ height: `${height}px`, background: barColor }} />
              <span className="text-xs text-center leading-tight" style={{ color: "#7a8099" }}>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
