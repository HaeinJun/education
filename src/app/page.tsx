import { supabase, IncomeStatement, SalesData } from "@/lib/supabase";
import DashboardClient from "@/components/DashboardClient";

export const revalidate = 60; // ISR: 60초마다 재생성

async function getData() {
  const [incomeRes, salesRes, balanceRes, bridgeRes] = await Promise.all([
    supabase.from("income_statement").select("*").order("year").order("quarter_num"),
    supabase.from("sales_data").select("*").order("year").order("quarter_num"),
    supabase.from("balance_sheet").select("*").order("year"),
    supabase.from("op_bridge").select("*").limit(1),
  ]);

  return {
    income: (incomeRes.data ?? []) as IncomeStatement[],
    sales: (salesRes.data ?? []) as SalesData[],
    balance: balanceRes.data ?? [],
    bridge: bridgeRes.data ?? [],
  };
}

export default async function DashboardPage() {
  const data = await getData();
  return <DashboardClient data={data} />;
}
