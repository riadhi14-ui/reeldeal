import React, { useState, useEffect, useCallback, createContext, useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { LayoutDashboard, Briefcase, Video, MessageCircle, LogOut, UserRound, Home, Settings } from "lucide-react";

const BrandContext = createContext(null);
export const useBrand = () => useContext(BrandContext);

const navItems = [
  { to: "/brand", label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { to: "/brand/campaigns", label: "Mes campagnes", icon: Briefcase },
  { to: "/brand/submissions", label: "Soumissions", icon: Video },
  { to: "/brand/messages", label: "Messages", icon: MessageCircle },
];

export default function BrandLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    let me;
    try {
      me = await base44.auth.me();
    } catch {
      navigate("/login", { replace: true });
      return;
    }
    if (!me) {
      navigate("/login", { replace: true });
      return;
    }
    // Apply the account type chosen before a Google sign-up, if any.
    const pending = localStorage.getItem("pending_account_type");
    if (pending && !me.account_type) {
      localStorage.removeItem("pending_account_type");
      try { await base44.auth.updateMe({ account_type: pending }); me.account_type = pending; } catch { /* ignore */ }
    }
    if (me.account_type !== "brand") { navigate("/dashboard", { replace: true }); return; }
    setUser(me);
    const myCampaigns = await base44.entities.Campaign.filter({ created_by_id: me.id }, "-created_date");
    setCampaigns(myCampaigns);
    const ids = myCampaigns.map((c) => c.id);
    const subs = ids.length > 0
      ? await base44.entities.Submission.filter({ campaign_id: { $in: ids } }, "-created_date")
      : [];
    setSubmissions(subs);
    setLoading(false);
  }, [navigate]);

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

  const counts = {
    "/brand/campaigns": campaigns.length,
    "/brand/submissions": pendingSubmissions.length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#EF4444] rounded-full animate-spin" />
      </div>
    );
  }

  const name = user?.full_name || "Marque";
  const initial = name.charAt(0).toUpperCase();

  return (
    <BrandContext.Provider value={{ user, campaigns, submissions, stats, campaignsById, submissionCounts, pendingSubmissions, loadData }}>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-body flex">
        <aside className="hidden md:flex flex-col w-64 shrink-0 bg-white border-r border-slate-100 h-screen sticky top-0">
          <div className="flex items-center gap-3 px-5 h-16 border-b border-slate-100">
            <span className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold">{initial}</span>
            <div className="min-w-0">
              <p className="text-sm font-bold truncate">{name}</p>
              <p className="text-[10px] font-bold text-[#DC2626] uppercase tracking-widest">Marque</p>
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold transition-colors ${isActive ? "bg-red-50 text-[#DC2626]" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1">{label}</span>
                {counts[to] > 0 && (
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-500 rounded-full px-2 py-0.5">{counts[to]}</span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="p-3 border-t border-slate-100 space-y-1">
            <NavLink to="/brand/settings" className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold transition-colors ${isActive ? "bg-red-50 text-[#DC2626]" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}>
              <Settings className="w-4 h-4" /> Réglages
            </NavLink>
            <NavLink to="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors">
              <UserRound className="w-4 h-4" /> Mon profil
            </NavLink>
            <button onClick={() => navigate("/")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors">
              <Home className="w-4 h-4" /> Retour à l'accueil
            </button>
            <button onClick={() => base44.auth.logout("/")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold text-[#DC2626] hover:bg-red-50 transition-colors">
              <LogOut className="w-4 h-4" /> Déconnexion
            </button>
          </div>
        </aside>

        {/* Mobile nav */}
        <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-100 flex justify-around px-2 py-2">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-[10px] font-semibold ${isActive ? "text-[#DC2626]" : "text-slate-400"}`}
            >
              <Icon className="w-5 h-5" />
              {label.split(" ")[0]}
            </NavLink>
          ))}
          <NavLink
            to="/brand/settings"
            className={({ isActive }) => `flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-[10px] font-semibold ${isActive ? "text-[#DC2626]" : "text-slate-400"}`}
          >
            <Settings className="w-5 h-5" />
            Réglages
          </NavLink>
        </div>

        <main className="flex-1 min-w-0 pb-24 md:pb-0">
          <div className="max-w-5xl mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </BrandContext.Provider>
  );
}