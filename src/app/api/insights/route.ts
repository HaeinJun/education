import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const PROMPT = `
당신은 현대자동차 경영전략 전문 애널리스트입니다.
아래 2026년 1분기 경영실적 데이터를 분석하여 경영진을 위한 실행 가능한 인사이트를 한국어로 도출해주세요.

## 손익 데이터 (단위: 십억원)
| 항목 | Q1 2025 | Q4 2025 | Q1 2026 | YoY | QoQ |
|------|---------|---------|---------|-----|-----|
| 매출액 | 44,408 | 46,839 | 45,939 | +3.4% | -1.9% |
| 영업이익 | 3,634 | 1,695 | 2,515 | -30.8% | +48.4% |
| OPM | 8.2% | 3.6% | 5.5% | -2.7%p | +1.9%p |
| 당기순이익 | 3,382 | 1,184 | 2,585 | -23.6% | +118.3% |
| EBITDA | 4,923 | 3,063 | 3,926 | -20.3% | +28.2% |

## 영업이익 증감 요인 (Q1 2025 → Q1 2026)
- 환율: +25십억원
- 물량: -247십억원
- 믹스: -337십억원
- 금융: +8십억원
- 관세: -860십억원 ← 핵심 드래그
- 기타: +292십억원
- 합계: -1,119십억원 → 3,634 → 2,515

## 글로벌 판매 (천대, YoY)
- 미국: 244 (+0.3%)
- 유럽: 140 (-7.8%)
- 국내: 159 (-4.4%)
- 인도: 167 (+8.5%)
- 중국: 27 (-7.9%)
- 글로벌: 976 (-2.5%)

## 친환경차 (천대)
- EV: 59 (-7.8% YoY)
- HEV: 174 (+27.0% YoY) ← 강한 성장
- 친환경차 비중: 24.9%

---

다음 구조로 분석해주세요. 각 섹션을 명확히 구분하고 JSON 형식으로 반환해주세요:

{
  "summary": "3문장 이내의 핵심 요약",
  "positives": [
    {"title": "긍정 요인 제목", "detail": "2~3문장 상세 설명", "impact": "high|medium|low"}
  ],
  "risks": [
    {"title": "리스크 제목", "detail": "2~3문장 상세 설명", "impact": "high|medium|low"}
  ],
  "actions": [
    {"title": "실행 과제 제목", "detail": "구체적 실행 방안", "timeline": "단기(1개월)|중기(3개월)|장기(6개월+)", "priority": 1}
  ],
  "outlook": "향후 2~3개 분기 전망 (3~4문장)"
}

positives 3개, risks 3개, actions 4개를 반드시 포함하세요. JSON만 반환하고 다른 텍스트는 포함하지 마세요.
`;

export async function POST() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(PROMPT);
    const text = result.response.text().trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "");

    const json = JSON.parse(text);
    return NextResponse.json({ success: true, data: json });
  } catch (err) {
    console.error("Gemini error:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
