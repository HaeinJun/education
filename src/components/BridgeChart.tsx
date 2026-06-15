"use client";
import { opBridgeData } from "@/lib/data";

export default function BridgeChart() {
  return (
    <div className="rounded-xl p-5 border" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: "#e8eaf0" }}>
        영업이익 증감 분석 <span className="text-xs font-normal ml-2" style={{ color: "#7a8099" }}>Q1 2025 → Q1 2026 (십억원)</span>
      </h3>
      <div className="flex items-end gap-2 overflow-x-auto scrollbar-thin pb-2">
        {opBridgeData.map((item) => {
          const isBase = item.type === "base" || item.type === "result";
          const isPositive = item.value > 0;
          const barColor = isBase ? "#002C5F" : isPositive ? "#00AAD2" : "#ff6b6b";
          const maxAbs = 3634;
          const height = Math.max(Math.abs(item.value) / maxAbs * 140, 8);

          return (
            <div key={item.label} className="flex flex-col items-center gap-1 min-w-[64px]">
              <span className="text-xs font-semibold" style={{
                color: isBase ? "#e8eaf0" : isPositive ? "#00AAD2" : "#ff6b6b"
              }}>
                {item.value > 0 && !isBase ? "+" : ""}{item.value.toLocaleString()}
              </span>
              <div
                className="w-10 rounded"
                style={{
                  height: `${height}px`,
                  background: barColor,
                  opacity: isBase ? 1 : 0.85,
                  alignSelf: item.value < 0 ? "flex-start" : "flex-end",
                }}
              />
              <span className="text-xs text-center leading-tight" style={{ color: "#7a8099" }}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
