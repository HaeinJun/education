"use client";
import KpiCard from "@/components/KpiCard";
import RevenueChart from "@/components/RevenueChart";
import SalesChart from "@/components/SalesChart";
import EvChart from "@/components/EvChart";
import Heatmap from "@/components/Heatmap";
import RegionalChart from "@/components/RegionalChart";
import BridgeChart from "@/components/BridgeChart";
import IncomeTable from "@/components/IncomeTable";

const kpiCards = [
  { label: "매출액", value: 45939, unit: "십억원", change: "+3.4%", changeLabel: "YoY", isPositive: true },
  { label: "영업이익", value: 2515, unit: "십억원", change: "-30.8%", changeLabel: "YoY", isPositive: false },
  { label: "영업이익률 (OPM)", value: "5.5%", unit: "", change: "-2.7%p", changeLabel: "YoY", isPositive: false },
  { label: "당기순이익", value: 2585, unit: "십억원", change: "-23.6%", changeLabel: "YoY", isPositive: false },
  { label: "EBITDA", value: 3926, unit: "십억원", change: "-20.3%", changeLabel: "YoY", isPositive: false },
  { label: "글로벌 판매", value: 976, unit: "천대", change: "-2.5%", changeLabel: "YoY", isPositive: false },
  { label: "친환경차 판매", value: 243, unit: "천대", change: "+14.6%", changeLabel: "YoY", isPositive: true },
  { label: "HEV 판매", value: 174, unit: "천대", change: "+27.0%", changeLabel: "YoY", isPositive: true },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b" style={{ background: "#002C5F", borderColor: "#001f45" }}>
        <div className="max-w-screen-2xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded flex items-center justify-center font-black text-white text-sm" style={{ background: "#00AAD2" }}>H</div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">현대자동차</p>
              <p className="text-xs" style={{ color: "#8ab4d4" }}>경영실적 대시보드</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1.5 rounded-full font-semibold" style={{ background: "#00AAD2", color: "#fff" }}>
              2026년 1분기 실적
            </span>
            <span className="text-xs" style={{ color: "#8ab4d4" }}>업데이트: 2026-06-15</span>
          </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-6 py-6 space-y-6">
        {/* Section: KPI Cards */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00AAD2" }}>핵심 KPI</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {kpiCards.map((card) => (
              <KpiCard key={card.label} {...card} />
            ))}
          </div>
        </section>

        {/* Section: Heatmap */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00AAD2" }}>KPI 히트맵</h2>
          <Heatmap />
        </section>

        {/* Section: Charts Row 1 */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00AAD2" }}>손익 분석</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <RevenueChart />
            <BridgeChart />
          </div>
        </section>

        {/* Section: Charts Row 2 */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00AAD2" }}>판매 분석</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SalesChart />
            <RegionalChart />
          </div>
          <div className="mt-4">
            <EvChart />
          </div>
        </section>

        {/* Section: Income Table */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00AAD2" }}>손익계산서 상세</h2>
          <IncomeTable />
        </section>

        {/* Footer */}
        <footer className="text-center py-4 text-xs" style={{ color: "#3a4060", borderTop: "1px solid var(--border)" }}>
          ※ 단위: 십억원(손익) / 천대(판매) · 본 자료는 내부 경영 분석 용도로만 사용
        </footer>
      </main>
    </div>
  );
}
