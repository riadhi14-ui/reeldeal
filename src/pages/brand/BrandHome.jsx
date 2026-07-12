import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Rocket } from "lucide-react";
import { useBrand } from "@/components/brand/BrandLayout";
import BrandStats from "@/components/brand/BrandStats";
import BrandQuickActions from "@/components/brand/BrandQuickActions";
import BrandCampaignsList from "@/components/brand/BrandCampaignsList";
import ReviewSubmissions from "@/components/brand/ReviewSubmissions";
import RequestCampaignDialog from "@/components/brand/RequestCampaignDialog";

export default function BrandHome() {
  const { user, stats, campaigns, submissionCounts, pendingSubmissions, campaignsById, loadData } = useBrand();
  const activeCampaigns = campaigns.filter((c) => c.status !== "closed");

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-sm font-bold text-[#DC2626] uppercase tracking-widest mb-1">Espace marque</p>
          <h1 className="text-3xl font-extrabold tracking-tight">Salut, {user?.full_name || "marque"} 👋</h1>
        </div>
        <RequestCampaignDialog />
      </div>

      {campaigns.length === 0 ? (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10 text-center">
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#EF4444]/20 blur-3xl" />
          <div className="relative">
            <span className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-5">
              <Rocket className="w-7 h-7 text-[#F87171]" />
            </span>
            <h2 className="text-2xl font-extrabold">Lance ta première campagne</h2>
            <p className="text-white/60 mt-2 max-w-md mx-auto">Décris ta campagne, fixe ta rémunération et laisse les créateurs produire des vidéos pour ta marque.</p>
            <div className="mt-6 inline-flex">
              <RequestCampaignDialog />
            </div>
          </div>
        </div>
      ) : (
        <>
          <BrandStats stats={stats} />

          <div className="mt-8">
            <BrandQuickActions pendingCount={pendingSubmissions.length} campaignCount={campaigns.length} />
          </div>

          <div className="flex items-center justify-between mt-12 mb-5">
            <h2 className="text-xl font-extrabold text-slate-900">
              Vidéos à valider {pendingSubmissions.length > 0 && <span className="ml-2 text-sm bg-red-50 text-[#DC2626] px-3 py-1 rounded-full">{pendingSubmissions.length}</span>}
            </h2>
            <Link to="/brand/submissions" className="text-sm font-bold text-[#DC2626] hover:underline">Tout voir →</Link>
          </div>
          <ReviewSubmissions submissions={pendingSubmissions.slice(0, 3)} campaignsById={campaignsById} onUpdated={loadData} />

          <div className="flex items-center justify-between mt-12 mb-5">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#DC2626]" /> Campagnes actives
            </h2>
            <Link to="/brand/campaigns" className="text-sm font-bold text-[#DC2626] hover:underline">Gérer →</Link>
          </div>
          <BrandCampaignsList campaigns={activeCampaigns.slice(0, 3)} submissionCounts={submissionCounts} />
        </>
      )}
    </div>
  );
}