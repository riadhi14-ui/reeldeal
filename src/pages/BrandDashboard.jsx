import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { LogOut, UserRound } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import BrandStats from "@/components/brand/BrandStats";
import BrandCampaignsList from "@/components/brand/BrandCampaignsList";
import ReviewSubmissions from "@/components/brand/ReviewSubmissions";
import CreateCampaignDialog from "@/components/brand/CreateCampaignDialog";

export default function BrandDashboard() {
  const [user, setUser] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    const me = await base44.auth.me();
    setUser(me);
    const myCampaigns = await base44.entities.Campaign.filter({ created_by_id: me.id }, "-created_date");
    setCampaigns(myCampaigns);
    const ids = myCampaigns.map((c) => c.id);
    const subs = ids.length > 0
      ? await base44.entities.Submission.filter({ campaign_id: { $in: ids } }, "-created_date")
      : [];
    setSubmissions(subs);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const stats = {
    views: submissions.reduce((sum, s) => sum + (s.views || 0), 0),
    videos: submissions.length,
    creators: new Set(submissions.map((s) => s.created_by_id)).size,
    spent: submissions.filter((s) => s.status === "approved").reduce((sum, s) => sum + (s.earnings || 0), 0),
  };

  const campaignsById = Object.fromEntries(campaigns.map((c) => [c.id, c]));
  const submissionCounts = submissions.reduce((acc, s) => {
    acc[s.campaign_id] = (acc[s.campaign_id] || 0) + 1;
    return acc;
  }, {});
  const pendingSubmissions = submissions.filter((s) => s.status === "pending");

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#EF4444] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] text-slate-900 font-body min-h-screen">
      <Navbar mode="brand" />

      <main className="pt-28 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-bold text-[#DC2626] uppercase tracking-widest mb-1">Espace marque</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Salut, {user?.full_name || "marque"} 👋
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <CreateCampaignDialog onCreated={loadData} />
              <Link
                to="/profile"
                className="h-11 w-11 rounded-full bg-white ring-1 ring-slate-200 hover:ring-[#EF4444] hover:text-[#DC2626] text-slate-500 transition-colors flex items-center justify-center"
                title="Mon profil"
              >
                <UserRound className="w-4 h-4" />
              </Link>
              <button
                onClick={() => base44.auth.logout("/")}
                className="h-11 w-11 rounded-full bg-white ring-1 ring-slate-200 hover:ring-[#EF4444] hover:text-[#DC2626] text-slate-500 transition-colors flex items-center justify-center"
                title="Se déconnecter"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          <BrandStats stats={stats} />

          <h2 className="text-xl font-extrabold text-slate-900 mt-12 mb-5">
            Vidéos à valider {pendingSubmissions.length > 0 && <span className="ml-2 text-sm bg-red-50 text-[#DC2626] px-3 py-1 rounded-full">{pendingSubmissions.length}</span>}
          </h2>
          <ReviewSubmissions submissions={pendingSubmissions} campaignsById={campaignsById} onUpdated={loadData} />

          <h2 className="text-xl font-extrabold text-slate-900 mt-12 mb-5">Mes campagnes</h2>
          <BrandCampaignsList campaigns={campaigns} submissionCounts={submissionCounts} />
        </div>
      </main>
    </div>
  );
}