import React from "react";
import { useDashboard } from "@/components/dashboard/DashboardLayout";
import StatsCards from "@/components/dashboard/StatsCards";
import SubmitVideoDialog from "@/components/dashboard/SubmitVideoDialog";

export default function DashboardHome() {
  const { user, participations, stats, loadData } = useDashboard();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-sm font-bold text-[#DC2626] uppercase tracking-widest mb-1">Espace créateur</p>
          <h1 className="text-3xl font-extrabold tracking-tight">Salut, {user?.full_name || "créateur"} 👋</h1>
        </div>
        <SubmitVideoDialog participations={participations} onSubmitted={loadData} />
      </div>

      <StatsCards stats={stats} />
    </div>
  );
}