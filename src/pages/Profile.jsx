import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, Loader2, Check } from "lucide-react";
import { goToMySpace } from "@/lib/accountType";
import Navbar from "@/components/landing/Navbar";
import AvatarCard from "@/components/profile/AvatarCard";
import PersonalCard from "@/components/profile/PersonalCard";
import SocialsCard from "@/components/profile/SocialsCard";
import PaymentCard from "@/components/profile/PaymentCard";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    display_name: "", bio: "", profile_image: "", tiktok: "", instagram: "", youtube: "", payment_method: "", payment_detail: "",
  });

  useEffect(() => {
    base44.auth.me().then((me) => {
      setUser(me);
      setForm({
        display_name: me.display_name || me.full_name || "",
        bio: me.bio || "",
        profile_image: me.profile_image || "",
        tiktok: me.tiktok || "",
        instagram: me.instagram || "",
        youtube: me.youtube || "",
        payment_method: me.payment_method || "",
        payment_detail: me.payment_detail || "",
      });
      setLoading(false);
    });
  }, []);

  const set = (key) => (e) => { setForm({ ...form, [key]: e.target.value }); setSaved(false); };
  const setField = (key, value) => { setForm({ ...form, [key]: value }); setSaved(false); };

  const isBrand = user?.account_type === "brand";

  const handleSave = async () => {
    setSaving(true);
    await base44.auth.updateMe(form);
    setSaving(false);
    setSaved(true);
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
        <div className="max-w-3xl mx-auto px-6">
          <button onClick={goToMySpace} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Mon espace
          </button>

          <div className="mb-10">
            <p className="text-sm font-bold text-[#DC2626] uppercase tracking-widest mb-1">Paramètres</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Mon profil</h1>
          </div>

          <div className="space-y-6">
            <AvatarCard value={form.profile_image} name={form.display_name || user?.full_name} onChange={(v) => setField("profile_image", v)} />
            <PersonalCard form={form} set={set} email={user?.email || ""} isBrand={isBrand} />
            {!isBrand && <SocialsCard form={form} set={set} />}
            {!isBrand && <PaymentCard form={form} set={set} setField={setField} />}
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-8 h-12 px-8 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold shadow-lg shadow-red-500/25 transition-colors flex items-center gap-2 disabled:opacity-60"
          >
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Enregistrement...</> : saved ? <><Check className="w-4 h-4" /> Enregistré</> : "Enregistrer"}
          </button>
        </div>
      </main>
    </div>
  );
}