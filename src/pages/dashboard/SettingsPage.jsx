import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useDashboard } from "@/components/dashboard/DashboardLayout";
import { useToast } from "@/components/ui/use-toast";
import ProfilePrefsCard from "@/components/settings/ProfilePrefsCard";
import LanguageSelector from "@/components/settings/LanguageSelector";
import DarkModeCard from "@/components/settings/DarkModeCard";
import AccountInfoCard from "@/components/settings/AccountInfoCard";
import ChangePasswordCard from "@/components/settings/ChangePasswordCard";
import { LogOut, Loader2, Save } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export default function SettingsPage() {
  const { user } = useDashboard();
  const { toast } = useToast();
  const { t, setLang: applyLang } = useLang();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    content_type: "",
    niche: "",
    language: "fr",
    notifications: true,
  });

  useEffect(() => {
    if (!user) return;
    const [fn, ...rest] = (user.full_name || "").split(" ");
    setForm((f) => ({
      ...f,
      first_name: user.first_name || fn || "",
      last_name: user.last_name || rest.join(" ") || "",
      phone: user.phone || "",
      content_type: user.content_type || "",
      niche: user.niche || "",
      language: user.language || "fr",
      notifications: user.notifications !== false,
    }));
  }, [user]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const toggle = (key) => setForm((f) => ({ ...f, [key]: !f[key] }));
  const setLanguage = (language) => { setForm((f) => ({ ...f, language })); applyLang(language); };

  const handleSave = async () => {
    setSaving(true);
    try {
      await base44.auth.updateMe({
        first_name: form.first_name,
        last_name: form.last_name,
        full_name: `${form.first_name} ${form.last_name}`.trim() || user.full_name,
        phone: form.phone,
        content_type: form.content_type,
        niche: form.niche,
        language: form.language,
        notifications: form.notifications,
      });
      toast({ title: t("settings_saved_title"), description: t("settings_saved_desc") });
    } catch (err) {
      toast({ title: t("settings_error_title"), description: err.message || t("settings_error_desc"), variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight">{t("settings_title")}</h1>
        <button onClick={handleSave} disabled={saving} className="h-11 px-6 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-bold shadow-lg shadow-red-500/25 transition-colors flex items-center gap-2 disabled:opacity-60">
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> {t("settings_saving")}</> : <><Save className="w-4 h-4" /> {t("settings_save")}</>}
        </button>
      </div>

      <div className="space-y-8">
        <section>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 px-1">{t("settings_profile")}</p>
          <ProfilePrefsCard form={form} set={set} toggle={toggle} />
        </section>

        <section>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 px-1">{t("settings_appearance")}</p>
          <DarkModeCard />
        </section>

        <section>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 px-1">{t("settings_language")}</p>
          <LanguageSelector value={form.language} onChange={setLanguage} />
        </section>

        <section>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 px-1">{t("settings_account")}</p>
          <div className="space-y-4">
            <AccountInfoCard form={form} set={set} email={user?.email} />
            <ChangePasswordCard email={user?.email} />
          </div>
        </section>

        <section>
          <button onClick={() => base44.auth.logout("/")} className="w-full flex items-center gap-3 px-6 py-4 rounded-3xl bg-white ring-1 ring-red-100 text-[#DC2626] font-bold hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5" />
            <div className="text-left">
              <p>{t("settings_logout")}</p>
              <p className="text-xs font-normal text-red-400">{t("settings_logout_sub")}</p>
            </div>
          </button>
        </section>

        <p className="text-center text-xs text-slate-300 pb-4">ReelDeal Web v1.0.0</p>
      </div>
    </div>
  );
}