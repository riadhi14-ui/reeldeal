import React from "react";
import { useBrand } from "@/components/brand/BrandLayout";
import BrandCampaignsList from "@/components/brand/BrandCampaignsList";
import BrandRequestForm from "@/components/brand/BrandRequestForm";

export default function BrandCampaignsPage() {
  const { campaigns, submissionCounts } = useBrand();
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight mb-8">Demander une campagne</h1>
        <BrandRequestForm />
      </div>
      {campaigns.length > 0 && (
        <div>
          <h2 className="text-xl font-extrabold tracking-tight mb-6">Mes campagnes</h2>
          <BrandCampaignsList campaigns={campaigns} submissionCounts={submissionCounts} />
        </div>
      )}
    </div>
  );
}