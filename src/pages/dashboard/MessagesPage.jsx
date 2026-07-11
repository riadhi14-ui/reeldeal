import React from "react";
import { useDashboard } from "@/components/dashboard/DashboardLayout";
import CampaignMessages from "@/components/dashboard/CampaignMessages";

export default function MessagesPage() {
  const { participations, user } = useDashboard();
  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6">Messages</h1>
      <CampaignMessages participations={participations} user={user} />
    </div>
  );
}