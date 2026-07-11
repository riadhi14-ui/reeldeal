import React from "react";
import { useDashboard } from "@/components/dashboard/DashboardLayout";
import MyCampaigns from "@/components/dashboard/MyCampaigns";

export default function MyCampaignsPage() {
  const { participations } = useDashboard();
  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">Mes campagnes</h1>
      <MyCampaigns participations={participations} />
    </div>
  );
}