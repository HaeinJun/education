"use client";
import { useState } from "react";
import Link from "next/link";

interface Insight {
  summary: string;
  positives: { title: string; detail: string; impact: string }[];
  risks: { title: string; detail: string; impact: string }[];
  actions: { title: string; detail: string; timeline: string; priority: number }[];
  outlook: string;
}

const impactColor: Record<string, string> = {
  high: "#ff6b6b",
  medium: "#f0a500",
  low: "#00AAD2",
};

const impactLabel: Record<string, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

const timelineColor: Record<string, string> = {
  "단기(1개월)": "#00AAD2",
  "중기(3개월)": "#f0a500",
  "장기(6개월+)": "#a78bfa",
};

export default function InsightsPage() {
  const [data, setData] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generated, setGenerated] = useState(false);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/insights", { method: "POST" });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setData(json.data);
      setGenerated(true);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b" style={{ background: "#002C5F", borderColor: "#001f45" }}>
        <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded flex items-center justify-center font-black text-white text-sm" style={{ background: "#00AAD2" }}>H</div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">현대자동차</p>
              <p className="text-xs" style={{ color: "#8ab4d4" }}>AI 경영 인사이트</p>
            </div>
          </div>
          <Link href="/" className="text-xs px-3 py-1.5 rounded-full border transition-colors hover:bg-white/10"
            style={{ color: "#8ab4d4", borderColor: "#1e4a7a" }}>
            ← 대시보드로
          </Link>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="rounded-2xl p-8 mb-8 text-center border" style={{ background: "linear-gradient(135deg, #001a3a 0%, #002C5F 50%, #003d7a 100%)", borderColor: "#1e4a7a" }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-semibold" style={{ background: "rgba(0,170,210,0.15)", color: "#00AAD2", border: "1px solid rgba(0,170,210,0.3)" }}>
            ✦ Powered by Gemini 2.5 Flash
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">경영실적 AI 인사이트</h1>
          <p className="text-sm mb-6" style={{ color: "#8ab4d4" }}>
            2026년 1분기 실적 데이터를 Gemini AI가 분석하여<br />경영진을 위한 실행 가능한 전략 인사이트를 도출합니다.
          </p>
          <button
            onClick={generate}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:scale-105"
            style={{ background: loading ? "#004a8a" : "#00AAD2", color: "#fff" }}
          >
            {loading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Gemini 분석 중...
              </>
            ) : generated ? "↺ 재분석" : "✦ AI 인사이트 생성"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl p-4 mb-6 border text-sm" style={{ background: "#2d1a1a", borderColor: "#5a2020", color: "#ff8080" }}>
            ⚠ {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl p-6 border animate-pulse" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
                <div className="h-4 rounded mb-3" style={{ background: "#1e2235", width: "40%" }} />
                <div className="h-3 rounded mb-2" style={{ background: "#1e2235", width: "90%" }} />
                <div className="h-3 rounded" style={{ background: "#1e2235", width: "70%" }} />
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {data && !loading && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="rounded-xl p-6 border" style={{ background: "var(--card-bg)", borderColor: "#00AAD2" }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">📋</span>
                <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: "#00AAD2" }}>핵심 요약</h2>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#c0c8d8" }}>{data.summary}</p>
            </div>

            {/* Positives & Risks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Positives */}
              <div className="rounded-xl p-6 border" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">✅</span>
                  <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: "#6bcb77" }}>긍정 요인</h2>
                </div>
                <div className="space-y-4">
                  {data.positives.map((item, i) => (
                    <div key={i} className="border-l-2 pl-4" style={{ borderColor: "#6bcb77" }}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm" style={{ color: "#e8eaf0" }}>{item.title}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: `${impactColor[item.impact]}22`, color: impactColor[item.impact] }}>
                          {impactLabel[item.impact]}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: "#9ca3b4" }}>{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risks */}
              <div className="rounded-xl p-6 border" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">⚠️</span>
                  <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: "#ff8080" }}>리스크 요인</h2>
                </div>
                <div className="space-y-4">
                  {data.risks.map((item, i) => (
                    <div key={i} className="border-l-2 pl-4" style={{ borderColor: "#ff6b6b" }}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm" style={{ color: "#e8eaf0" }}>{item.title}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: `${impactColor[item.impact]}22`, color: impactColor[item.impact] }}>
                          {impactLabel[item.impact]}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: "#9ca3b4" }}>{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Items */}
            <div className="rounded-xl p-6 border" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🚀</span>
                <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: "#f0a500" }}>전략적 실행 과제</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.actions.sort((a, b) => a.priority - b.priority).map((item, i) => (
                  <div key={i} className="rounded-lg p-4 border" style={{ background: "#0f1117", borderColor: "#1e2235" }}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                          style={{ background: "#002C5F", color: "#00AAD2" }}>{item.priority}</span>
                        <span className="font-semibold text-sm" style={{ color: "#e8eaf0" }}>{item.title}</span>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
                        style={{ background: `${timelineColor[item.timeline] ?? "#7a8099"}22`, color: timelineColor[item.timeline] ?? "#7a8099" }}>
                        {item.timeline}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "#9ca3b4" }}>{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Outlook */}
            <div className="rounded-xl p-6 border" style={{ background: "linear-gradient(135deg, #0f1a2e 0%, #1a1f2e 100%)", borderColor: "#1e4a7a" }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🔭</span>
                <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: "#a78bfa" }}>향후 전망</h2>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#c0c8d8" }}>{data.outlook}</p>
            </div>

            {/* Footer note */}
            <p className="text-center text-xs" style={{ color: "#3a4060" }}>
              ※ 본 인사이트는 Gemini 2.5 Flash AI가 생성한 참고 자료이며, 최종 의사결정은 담당자의 판단에 따릅니다.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
