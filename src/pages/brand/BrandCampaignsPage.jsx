import React, { useState } from "react";
import { useBrand } from "@/components/brand/BrandLayout";
import BrandCampaignsList from "@/components/brand/BrandCampaignsList";
import CreateCampaignDialog from "@/components/brand/CreateCampaignDialog";

export default function BrandCampaignsPage() {
  const { campaigns, submissionCounts, loadData } = useBrand();
  const [draft, setDraft] = useState(null);
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8"><h1 className="text-2xl font-extrabold tracking-tight">Mes campagnes</h1><CreateCampaignDialog onCreated={loadData} /></div>
      <BrandCampaignsList campaigns={campaigns} submissionCounts={submissionCounts} onEditDraft={setDraft} />
      {draft && <CreateCampaignDialog campaign={draft} open={Boolean(draft)} onOpenChange={(open) => !open && setDraft(null)} onCreated={async () => { setDraft(null); await loadData(); }} />}
    </div>
  );
}