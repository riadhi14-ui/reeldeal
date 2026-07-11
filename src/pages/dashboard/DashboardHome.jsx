import React from "react";
import { useDashboard } from "@/components/dashboard/DashboardLayout";
import EarningsCards from "@/components/dashboard/EarningsCards";
import WithdrawForm from "@/components/dashboard/WithdrawForm";
import EarningsChart from "@/components/dashboard/EarningsChart";
import WithdrawalHistory from "@/components/dashboard/WithdrawalHistory";

export default function DashboardHome() {
  const { user, submissions, withdrawals, stats, loadData } = useDashboard();

  // Cumulative earnings per month for the chart
  const monthLabels = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"];
  const now = new Date();
  const chartData = monthLabels.map((label, i) => {
    const monthIndex = now.getMonth() - (5 - i);
    const value = submissions
      .filter((s) => {
        const d = new Date(s.created_date);
        return s.status === "approved" && d.getMonth() === ((monthIndex % 12) + 12) % 12;
      })
      .reduce((sum, s) => sum + (s.earnings || 0), 0);
    return { label, value: Math.round(value) };
  });
  const hasChartData = chartData.some((d) => d.value > 0);
  const displayChart = hasChartData ? chartData : monthLabels.map((label) => ({ label, value: 0 }));

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-bold text-[#DC2626] uppercase tracking-widest mb-1">Espace créateur</p>
        <h1 className="text-3xl font-extrabold tracking-tight">Tableau de bord créateur</h1>
        <p className="text-slate-500 mt-1">Salut {user?.full_name || "créateur"}, suis tes gains et gère tes retraits.</p>
      </div>

      <EarningsCards
        available={stats.available}
        withdrawn={stats.withdrawn}
        pending={stats.withdrawalPending + stats.pending}
        views={stats.views}
      />

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <WithdrawForm available={stats.available} onWithdrawn={loadData} />
        <EarningsChart data={displayChart} />
      </div>

      <div className="mt-6">
        <WithdrawalHistory withdrawals={withdrawals} />
      </div>
    </div>
  );
}