import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type IncomeStatement = {
  id: string;
  quarter: string;
  year: number;
  quarter_num: number;
  revenue: number;
  revenue_auto: number;
  revenue_finance: number;
  revenue_other: number;
  cost_of_sales: number;
  gross_profit: number;
  sga: number;
  operating_income: number;
  ordinary_income: number;
  net_income: number;
  ebitda: number;
  opm: number;
  npm: number;
  updated_at: string;
};

export type SalesData = {
  id: string;
  quarter: string;
  year: number;
  quarter_num: number;
  sales_us: number | null;
  sales_europe: number | null;
  sales_korea: number | null;
  sales_india: number | null;
  sales_china: number | null;
  sales_latam: number | null;
  sales_other: number | null;
  sales_global: number;
  sales_suv: number;
  sales_sedan: number;
  sales_commercial: number;
  sales_ev: number;
  sales_hev: number;
  sales_phev: number;
  sales_fcev: number;
  sales_eco_total: number;
};

export type BalanceSheet = {
  id: string;
  period: string;
  year: number;
  quarter_num: number | null;
  total_assets: number;
  current_assets: number;
  total_liabilities: number;
  total_equity: number;
  retained_earnings: number;
  debt_ratio: number;
  borrowing_ratio: number;
};

export type OpBridge = {
  id: string;
  from_quarter: string;
  to_quarter: string;
  fx_impact: number;
  volume_impact: number;
  mix_impact: number;
  finance_impact: number;
  tariff_impact: number;
  other_impact: number;
};
