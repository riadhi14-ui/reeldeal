import React from "react";
import { useBrand } from "@/components/brand/BrandLayout";
import BrandCampaignsList from "@/components/brand/BrandCampaignsList";
import CreateCampaignDialog from "@/components/brand/CreateCampaignDialog";
import RequestCampaignDialog from "@/components/brand/RequestCampaignDialog";

export default function BrandCampaignsPage() {
  const { campaigns, submissionCounts, loadData } = useBrand();
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold tracking-tight">Mes campagnes</h1>
        <div className="flex flex-wrap items-center gap-3">
          <CreateCampaignDialog onCreated={loadData} />
          <RequestCampaignDialog />
        </div>
      </div>
      {campaigns.length > 0 ? (
        <BrandCampaignsList campaigns={campaigns} submissionCounts={submissionCounts} />
      ) : (
        <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-10 text-center">
          <p className="font-bold text-slate-900">Aucune campagne pour le moment</p>
          <p className="text-sm text-slate-500 mt-1">Crée ta première campagne ou demande-en une à notre équipe.</p>
        </div>
      )}
    </div>
  );
}