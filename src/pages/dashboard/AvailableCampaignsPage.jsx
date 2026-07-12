import React from "react";
import { useDashboard } from "@/components/dashboard/DashboardLayout";
import AvailableCampaigns from "@/components/dashboard/AvailableCampaigns";

export default function AvailableCampaignsPage() {
  const { participations, allCampaigns } = useDashboard();
  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">Campagnes disponibles</h1>
      <AvailableCampaigns participations={participations} campaigns={allCampaigns} />
    </div>
  );
}