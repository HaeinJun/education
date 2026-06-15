"use client";
import Link from "next/link";
import KpiCard from "@/components/KpiCard";
import RevenueChart from "@/components/RevenueChart";
import SalesChart from "@/components/SalesChart";
import EvChart from "@/components/EvChart";
import Heatmap from "@/components/Heatmap";
import RegionalChart from "@/components/RegionalChart";
import BridgeChart from "@/components/BridgeChart";
import IncomeTable from "@/components/IncomeTable";
import { IncomeStatement, SalesData } from "@/lib/supabase";

interface Props {
  data: {
    income: IncomeStatement[];
    sales: SalesData[];
    balance: Record<string, unknown>[];
    bridge: Record<string, unknown>[];
  };
}

export default function DashboardClient({ data }: Props) {
  // 최신 분기 (Q1 2026) vs 전년 동기 (Q1 2025)
  const latest = data.income.find((r) => r.year === 2026 && r.quarter_num === 1);
  const prevYear = data.income.find((r) => r.year === 2025 && r.quarter_num === 1);
  const latestSales = data.sales.find((r) => r.year === 2026 && r.quarter_num === 1);
  const prevSales = data.sales.find((r) => r.year === 2025 && r.quarter_num === 1);

  const pct = (a?: number, b?: number) => {
    if (!a || !b) return "N/A";
    const v = ((a - b) / b) * 100;
    return `${v >= 0 ? "+" : ""}${v.toFixed(1)}%`;
  };

  const kpiCards = latest && prevYear ? [
    { label: "매출액", value: latest.revenue, unit: "십억원", change: pct(latest.revenue, prevYear.revenue), changeLabel: "YoY", isPositive: latest.revenue >= prevYear.revenue },
    { label: "영업이익", value: latest.operating_income, unit: "십억원", change: pct(latest.operating_income, prevYear.operating_income), changeLabel: "YoY", isPositive: latest.operating_income >= prevYear.operating_income },
    { label: "영업이익률", value: `${latest.opm}%`, unit: "", change: `${(latest.opm - prevYear.opm).toFixed(1)}%p`, changeLabel: "YoY", isPositive: latest.opm >= prevYear.opm },
    { label: "당기순이익", value: latest.net_income, unit: "십억원", change: pct(latest.net_income, prevYear.net_income), changeLabel: "YoY", isPositive: latest.net_income >= prevYear.net_income },
    { label: "EBITDA", value: latest.ebitda, unit: "십억원", change: pct(latest.ebitda, prevYear.ebitda), changeLabel: "YoY", isPositive: latest.ebitda >= prevYear.ebitda },
    { label: "글로벌 판매", value: latestSales?.sales_global ?? 0, unit: "천대", change: pct(latestSales?.sales_global, prevSales?.sales_global), changeLabel: "YoY", isPositive: (latestSales?.sales_global ?? 0) >= (prevSales?.sales_global ?? 0) },
    { label: "친환경차 판매", value: latestSales?.sales_eco_total ?? 0, unit: "천대", change: pct(latestSales?.sales_eco_total, prevSales?.sales_eco_total), changeLabel: "YoY", isPositive: (latestSales?.sales_eco_total ?? 0) >= (prevSales?.sales_eco_total ?? 0) },
    { label: "HEV 판매", value: latestSales?.sales_hev ?? 0, unit: "천대", change: pct(latestSales?.sales_hev, prevSales?.sales_hev), changeLabel: "YoY", isPositive: (latestSales?.sales_hev ?? 0) >= (prevSales?.sales_hev ?? 0) },
  ] : [];

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
            <Link href="/insights" className="text-xs px-3 py-1.5 rounded-full border transition-colors hover:bg-white/10 font-semibold"
              style={{ color: "#00AAD2", borderColor: "#00AAD2" }}>
              ✦ AI 인사이트
            </Link>
            <span className="text-xs" style={{ color: "#8ab4d4" }}>업데이트: {latest?.updated_at ? new Date(latest.updated_at).toLocaleDateString("ko-KR") : "-"}</span>
          </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-6 py-6 space-y-6">
        {/* KPI Cards */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00AAD2" }}>핵심 KPI</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {kpiCards.map((card) => (
              <KpiCard key={card.label} {...card} />
            ))}
          </div>
        </section>

        {/* Heatmap */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00AAD2" }}>KPI 히트맵</h2>
          <Heatmap income={data.income} />
        </section>

        {/* 손익 차트 */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00AAD2" }}>손익 분석</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <RevenueChart income={data.income} />
            <BridgeChart bridge={data.bridge} />
          </div>
        </section>

        {/* 판매 차트 */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00AAD2" }}>판매 분석</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SalesChart sales={data.sales} />
            <RegionalChart sales={data.sales} />
          </div>
          <div className="mt-4">
            <EvChart sales={data.sales} />
          </div>
        </section>

        {/* 손익계산서 테이블 */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#00AAD2" }}>손익계산서 상세</h2>
          <IncomeTable income={data.income} />
        </section>

        <footer className="text-center py-4 text-xs" style={{ color: "#3a4060", borderTop: "1px solid var(--border)" }}>
          ※ 단위: 십억원(손익) / 천대(판매) · 본 자료는 내부 경영 분석 용도로만 사용
        </footer>
      </main>
    </div>
  );
}
