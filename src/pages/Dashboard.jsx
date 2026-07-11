import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { LogOut, UserRound } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import StatsCards from "@/components/dashboard/StatsCards";
import MyCampaigns from "@/components/dashboard/MyCampaigns";
import AvailableCampaigns from "@/components/dashboard/AvailableCampaigns";
import SubmissionsList from "@/components/dashboard/SubmissionsList";
import SubmitVideoDialog from "@/components/dashboard/SubmitVideoDialog";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [participations, setParticipations] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    const me = await base44.auth.me();
    setUser(me);
    const [parts, subs] = await Promise.all([
      base44.entities.Participation.filter({ created_by_id: me.id }, "-created_date"),
      base44.entities.Submission.filter({ created_by_id: me.id }, "-created_date"),
    ]);
    setParticipations(parts);
    setSubmissions(subs);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const stats = {
    total: submissions.filter((s) => s.status === "approved").reduce((sum, s) => sum + (s.earnings || 0), 0),
    pending: submissions.filter((s) => s.status === "pending").reduce((sum, s) => sum + (s.earnings || 0), 0),
    views: submissions.reduce((sum, s) => sum + (s.views || 0), 0),
    videos: submissions.length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#EF4444] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] text-slate-900 font-body min-h-screen">
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-bold text-[#DC2626] uppercase tracking-widest mb-1">Espace créateur</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Salut, {user?.full_name || "créateur"} 👋
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <SubmitVideoDialog participations={participations} onSubmitted={loadData} />
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

          <StatsCards stats={stats} />

          <h2 className="text-xl font-extrabold text-slate-900 mt-12 mb-5">Mes campagnes</h2>
          <MyCampaigns participations={participations} />

          <div className="flex items-baseline justify-between mt-12 mb-5">
            <h2 className="text-xl font-extrabold text-slate-900">Campagnes disponibles</h2>
            <Link to="/campaigns" className="text-sm font-bold text-[#DC2626] hover:underline">Voir tout</Link>
          </div>
          <AvailableCampaigns participations={participations} />

          <h2 className="text-xl font-extrabold text-slate-900 mt-12 mb-5">Mes soumissions</h2>
          <SubmissionsList submissions={submissions} />
        </div>
      </main>
    </div>
  );
}