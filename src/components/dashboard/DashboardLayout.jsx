import React, { useState, useEffect, useCallback, createContext, useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { campaigns } from "@/lib/campaignsData";
import { LayoutDashboard, Briefcase, Compass, Video, MessageCircle, LogOut, UserRound, Store, Home } from "lucide-react";

const DashboardContext = createContext(null);
export const useDashboard = () => useContext(DashboardContext);

const navItems = [
  { to: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { to: "/dashboard/campaigns", label: "Mes campagnes", icon: Briefcase },
  { to: "/dashboard/available", label: "Campagnes disponibles", icon: Compass },
  { to: "/dashboard/submissions", label: "Mes soumissions", icon: Video },
  { to: "/dashboard/messages", label: "Messages", icon: MessageCircle },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [participations, setParticipations] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    const me = await base44.auth.me();
    setUser(me);
    const [parts, subs, wds] = await Promise.all([
      base44.entities.Participation.filter({ created_by_id: me.id }, "-created_date"),
      base44.entities.Submission.filter({ created_by_id: me.id }, "-created_date"),
      base44.entities.Withdrawal.filter({ created_by_id: me.id }, "-created_date"),
    ]);
    setParticipations(parts);
    setSubmissions(subs);
    setWithdrawals(wds);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const earnedTotal = submissions.filter((s) => s.status === "approved").reduce((sum, s) => sum + (s.earnings || 0), 0);
  const withdrawnTotal = withdrawals.filter((w) => w.status === "completed").reduce((sum, w) => sum + (w.amount || 0), 0);
  const withdrawalPending = withdrawals.filter((w) => w.status === "pending").reduce((sum, w) => sum + (w.amount || 0), 0);

  const stats = {
    total: earnedTotal,
    earned: earnedTotal,
    withdrawn: withdrawnTotal,
    available: Math.max(earnedTotal - withdrawnTotal - withdrawalPending, 0),
    withdrawalPending,
    pending: submissions.filter((s) => s.status === "pending").reduce((sum, s) => sum + (s.earnings || 0), 0),
    views: submissions.reduce((sum, s) => sum + (s.views || 0), 0),
    videos: submissions.length,
  };

  const joinedIds = new Set(participations.map((p) => p.campaign_id));
  const availableCount = campaigns.filter((c) => !joinedIds.has(c.id)).length;
  const counts = {
    "/dashboard/campaigns": participations.length,
    "/dashboard/available": availableCount,
    "/dashboard/submissions": submissions.length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#EF4444] rounded-full animate-spin" />
      </div>
    );
  }

  const name = user?.full_name || "Créateur";
  const initial = name.charAt(0).toUpperCase();

  return (
    <DashboardContext.Provider value={{ user, participations, submissions, withdrawals, stats, loadData }}>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-body flex">
        <aside className="hidden md:flex flex-col w-64 shrink-0 bg-white border-r border-slate-100 h-screen sticky top-0">
          <div className="flex items-center gap-3 px-5 h-16 border-b border-slate-100">
            <span className="w-9 h-9 rounded-xl bg-[#EF4444] text-white flex items-center justify-center font-bold">{initial}</span>
            <div className="min-w-0">
              <p className="text-sm font-bold truncate">{name}</p>
              <p className="text-[10px] font-bold text-[#DC2626] uppercase tracking-widest">Créateur</p>
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
            <NavLink to="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors">
              <UserRound className="w-4 h-4" /> Mon profil
            </NavLink>
            <button onClick={() => navigate("/brand")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors">
              <Store className="w-4 h-4" /> Basculer côté Marque
            </button>
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
        </div>

        <main className="flex-1 min-w-0 pb-24 md:pb-0">
          <div className="max-w-5xl mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </DashboardContext.Provider>
  );
}