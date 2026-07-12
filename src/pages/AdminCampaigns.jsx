import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { CheckCircle2, XCircle, Loader2, ShieldCheck, ArrowLeft } from "lucide-react";

export default function AdminCampaigns() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState([]);
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    let me;
    try { me = await base44.auth.me(); } catch { navigate("/login", { replace: true }); return; }
    if (me?.role !== "admin") { navigate("/", { replace: true }); return; }
    const list = await base44.entities.Campaign.filter({ status: "pending" }, "-created_date");
    setPending(list);
    setLoading(false);
  }, [navigate]);

  useEffect(() => { load(); }, [load]);

  const decide = async (id, status) => {
    setBusyId(id);
    await base44.entities.Campaign.update(id, { status });
    setPending((current) => current.filter((c) => c.id !== id));
    setBusyId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#EF4444] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-body">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <button onClick={() => navigate("/")} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 mb-6">
          <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
        </button>
        <div className="flex items-center gap-3 mb-8">
          <span className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center"><ShieldCheck className="w-5 h-5" /></span>
          <div>
            <h1 className="text-2xl font-extrabold">Validation des campagnes</h1>
            <p className="text-sm text-slate-500">Approuve ou refuse les campagnes soumises par les marques.</p>
          </div>
        </div>

        {pending.length === 0 ? (
          <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-10 text-center">
            <p className="font-bold text-slate-900">Aucune campagne en attente</p>
            <p className="text-sm text-slate-500 mt-1">Toutes les campagnes soumises ont été traitées.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pending.map((c) => (
              <div key={c.id} className="flex items-center gap-4 rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                  {c.img ? <img src={c.img} alt={c.name} className="w-full h-full object-cover" /> : null}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate">{c.name}</p>
                  <p className="text-sm text-slate-400">{c.brand} · {c.category}</p>
                  <p className="text-xs font-extrabold text-[#DC2626] font-mono mt-1">${c.rate?.toFixed(2)}/1K vues · {c.budget}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                  <button onClick={() => decide(c.id, "active")} disabled={busyId === c.id} className="inline-flex h-10 px-4 items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold disabled:opacity-50">
                    {busyId === c.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />} Approuver
                  </button>
                  <button onClick={() => decide(c.id, "closed")} disabled={busyId === c.id} className="inline-flex h-10 px-4 items-center justify-center gap-2 rounded-full bg-white ring-1 ring-slate-200 hover:ring-red-400 text-slate-600 hover:text-red-600 text-sm font-bold disabled:opacity-50">
                    <XCircle className="w-4 h-4" /> Refuser
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}