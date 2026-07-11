import React from "react";
import { Link } from "react-router-dom";
import { useBrand } from "@/components/brand/BrandLayout";
import BrandStats from "@/components/brand/BrandStats";
import ReviewSubmissions from "@/components/brand/ReviewSubmissions";
import CreateCampaignDialog from "@/components/brand/CreateCampaignDialog";

export default function BrandHome() {
  const { user, stats, pendingSubmissions, campaignsById, loadData } = useBrand();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-sm font-bold text-[#DC2626] uppercase tracking-widest mb-1">Espace marque</p>
          <h1 className="text-3xl font-extrabold tracking-tight">Salut, {user?.full_name || "marque"} 👋</h1>
        </div>
        <CreateCampaignDialog onCreated={loadData} />
      </div>

      <BrandStats stats={stats} />

      <div className="flex items-center justify-between mt-12 mb-5">
        <h2 className="text-xl font-extrabold text-slate-900">
          Vidéos à valider {pendingSubmissions.length > 0 && <span className="ml-2 text-sm bg-red-50 text-[#DC2626] px-3 py-1 rounded-full">{pendingSubmissions.length}</span>}
        </h2>
        <Link to="/brand/submissions" className="text-sm font-bold text-[#DC2626] hover:underline">Tout voir →</Link>
      </div>
      <ReviewSubmissions submissions={pendingSubmissions.slice(0, 3)} campaignsById={campaignsById} onUpdated={loadData} />
    </div>
  );
}