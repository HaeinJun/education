export const kpiData = {
  income: [
    { label: "매출액", unit: "십억원", q1_2025: 44408, q4_2025: 46839, q1_2026: 45939, yoy: "+3.4%", qoq: "-1.9%" },
    { label: "영업이익", unit: "십억원", q1_2025: 3634, q4_2025: 1695, q1_2026: 2515, yoy: "-30.8%", qoq: "+48.4%" },
    { label: "OPM (%)", unit: "%", q1_2025: 8.2, q4_2025: 3.6, q1_2026: 5.5, yoy: "-2.7%p", qoq: "+1.9%p" },
    { label: "당기순이익", unit: "십억원", q1_2025: 3382, q4_2025: 1184, q1_2026: 2585, yoy: "-23.6%", qoq: "+118.3%" },
    { label: "NPM (%)", unit: "%", q1_2025: 7.6, q4_2025: 2.5, q1_2026: 5.6, yoy: "-2.0%p", qoq: "+3.1%p" },
    { label: "EBITDA", unit: "십억원", q1_2025: 4923, q4_2025: 3063, q1_2026: 3926, yoy: "-20.3%", qoq: "+28.2%" },
  ],
  sales: [
    { label: "글로벌 판매", unit: "천대", q1_2025: 1001, q1_2026: 976, yoy: "-2.5%" },
    { label: "미국", unit: "천대", q1_2025: 243, q1_2026: 244, yoy: "+0.3%" },
    { label: "유럽", unit: "천대", q1_2025: 151, q1_2026: 140, yoy: "-7.8%" },
    { label: "국내", unit: "천대", q1_2025: 166, q1_2026: 159, yoy: "-4.4%" },
    { label: "인도", unit: "천대", q1_2025: 154, q1_2026: 167, yoy: "+8.5%" },
    { label: "친환경차 합계", unit: "천대", q1_2025: 212, q1_2026: 243, yoy: "+14.6%" },
    { label: "HEV", unit: "천대", q1_2025: 137, q1_2026: 174, yoy: "+27.0%" },
    { label: "EV", unit: "천대", q1_2025: 64, q1_2026: 59, yoy: "-7.8%" },
  ],
};

export const incomeStatement = [
  { label: "매출액", q1_2025: 44408, q4_2025: 46839, q1_2026: 45939, yoy: "+3.4%", qoq: "-1.9%", indent: 0 },
  { label: "자동차", q1_2025: 34718, q4_2025: 36590, q1_2026: 34539, yoy: "-0.5%", qoq: "-5.6%", indent: 1 },
  { label: "금융", q1_2025: 7398, q4_2025: 7432, q1_2026: 8991, yoy: "+21.5%", qoq: "+21.0%", indent: 1 },
  { label: "기타", q1_2025: 2292, q4_2025: 2817, q1_2026: 2409, yoy: "+5.1%", qoq: "-14.5%", indent: 1 },
  { label: "매출원가", q1_2025: 35428, q4_2025: 38996, q1_2026: 37922, yoy: "+7.0%", qoq: "-2.8%", indent: 0 },
  { label: "매출총이익", q1_2025: 8980, q4_2025: 7843, q1_2026: 8017, yoy: "-10.7%", qoq: "+2.2%", indent: 0 },
  { label: "판매관리비", q1_2025: 5346, q4_2025: 6148, q1_2026: 5502, yoy: "+2.9%", qoq: "-10.5%", indent: 0 },
  { label: "영업이익", q1_2025: 3634, q4_2025: 1695, q1_2026: 2515, yoy: "-30.8%", qoq: "+48.4%", indent: 0 },
  { label: "경상이익", q1_2025: 4465, q4_2025: 1666, q1_2026: 3522, yoy: "-21.1%", qoq: "+111.4%", indent: 0 },
  { label: "당기순이익", q1_2025: 3382, q4_2025: 1184, q1_2026: 2585, yoy: "-23.6%", qoq: "+118.3%", indent: 0 },
  { label: "EBITDA", q1_2025: 4923, q4_2025: 3063, q1_2026: 3926, yoy: "-20.3%", qoq: "+28.2%", indent: 0 },
];

export const opBridgeData = [
  { label: "Q1 2025", value: 3634, type: "base" },
  { label: "환율", value: 25, type: "positive" },
  { label: "물량", value: -247, type: "negative" },
  { label: "믹스", value: -337, type: "negative" },
  { label: "금융", value: 8, type: "positive" },
  { label: "관세", value: -860, type: "negative" },
  { label: "기타", value: 292, type: "positive" },
  { label: "Q1 2026", value: 2515, type: "result" },
];

export const balanceSheet = [
  { label: "자산", y2025: 368845, q1_2026: 383834, change: 14989, changeRate: "+4.1%", indent: 0 },
  { label: "유동자산", y2025: 120777, q1_2026: 126312, change: 5535, changeRate: "+4.6%", indent: 1 },
  { label: "부채", y2025: 241197, q1_2026: 251607, change: 10410, changeRate: "+4.3%", indent: 0 },
  { label: "자본", y2025: 127648, q1_2026: 132227, change: 4579, changeRate: "+3.6%", indent: 0 },
  { label: "이익잉여금", y2025: 101312, q1_2026: 102967, change: 1655, changeRate: "+1.6%", indent: 1 },
  { label: "부채비율", y2025: "189.0%", q1_2026: "190.3%", change: null, changeRate: "", indent: 0 },
  { label: "차입금비율", y2025: "137.4%", q1_2026: "138.6%", change: null, changeRate: "", indent: 0 },
];

export const regionalSales = [
  { region: "미국", q1_2025: 243, q1_2026: 244, yoy: "+0.3%", demand_2025: 3927, demand_2026: 3710 },
  { region: "유럽", q1_2025: 151, q1_2026: 140, yoy: "-7.8%", demand_2025: null, demand_2026: null },
  { region: "국내", q1_2025: 166, q1_2026: 159, yoy: "-4.4%", demand_2025: 390, demand_2026: 409 },
  { region: "인도", q1_2025: 154, q1_2026: 167, yoy: "+8.5%", demand_2025: 1332, demand_2026: 1177 },
  { region: "중국", q1_2025: 30, q1_2026: 27, yoy: "-7.9%", demand_2025: 5233, demand_2026: 4089 },
  { region: "중남미", q1_2025: 68, q1_2026: 74, yoy: "+9.5%", demand_2025: null, demand_2026: null },
  { region: "기타", q1_2025: 189, q1_2026: 185, yoy: "-2.1%", demand_2025: null, demand_2026: null },
];

export const quarterlyTrend = [
  { quarter: "Q1 2025", suv: 605, sedan: 346, commercial: 50, ev: 64, hev: 137, phev: 10, fcev: 1 },
  { quarter: "Q2 2025", suv: 645, sedan: 366, commercial: 55, ev: 79, hev: 169, phev: 13, fcev: 1 },
  { quarter: "Q3 2025", suv: 659, sedan: 327, commercial: 52, ev: 76, hev: 161, phev: 11, fcev: 4 },
  { quarter: "Q4 2025", suv: 638, sedan: 351, commercial: 44, ev: 57, hev: 168, phev: 8, fcev: 2 },
  { quarter: "Q1 2026", suv: 607, sedan: 326, commercial: 43, ev: 59, hev: 174, phev: 8, fcev: 2 },
];
