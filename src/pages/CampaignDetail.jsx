import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle, Wallet, Video, Share2, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import JoinedActions from "@/components/campaign/JoinedActions";
import BrandCampaignControls from "@/components/campaign/BrandCampaignControls";
import ExampleVideos from "@/components/campaign/ExampleVideos";
import { getCampaign } from "@/lib/campaignsData";

export default function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState("creator");
  const [joining, setJoining] = useState(false);
  const staticCampaign = getCampaign(id);
  const [campaign, setCampaign] = useState(staticCampaign || null);
  const [loadingCampaign, setLoadingCampaign] = useState(!staticCampaign);
  const [joined, setJoined] = useState(false);
  const [justJoined, setJustJoined] = useState(false);
  const [me, setMe] = useState(null);

  const isOwner = me && campaign && (campaign.created_by_id === me.id);
  const isBrand = me?.account_type === "brand";

  useEffect(() => {
    if (!staticCampaign) {
      base44.entities.Campaign.filter({ id })
        .then((r) => { setCampaign(r[0] || null); setLoadingCampaign(false); })
        .catch(() => setLoadingCampaign(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const cid = campaign?.id;
    if (!cid) return;
    base44.auth.isAuthenticated().then(async (authed) => {
      if (!authed) return;
      const user = await base44.auth.me();
      setMe(user);
      const existing = await base44.entities.Participation.filter({ campaign_id: cid, created_by_id: user.id });
      setJoined(existing.length > 0);
    }).catch(() => {});
  }, [campaign?.id]);

  const handleJoin = async () => {
    setJoining(true);
    const authed = await base44.auth.isAuthenticated();
    if (!authed) {
      window.location.href = "/login";
      return;
    }
    const user = await base44.auth.me();
    const existing = await base44.entities.Participation.filter({ campaign_id: campaign.id, created_by_id: user.id });
    if (existing.length === 0) {
      await base44.entities.Participation.create({
        campaign_id: campaign.id,
        campaign_name: campaign.name,
        brand: campaign.brand,
        rate: campaign.rate,
        img: campaign.img,
      });
    }
    setJoined(true);
    setJustJoined(true);
    setJoining(false);
  };

  if (loadingCampaign) {
    return (
      <div className="bg-white min-h-screen font-body flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#EF4444] rounded-full animate-spin" />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="bg-white min-h-screen font-body">
        <Navbar mode={mode} setMode={setMode} />
        <div className="pt-40 pb-24 text-center px-6">
          <h1 className="text-3xl font-extrabold text-slate-900">Campagne introuvable</h1>
          <p className="mt-3 text-slate-500">Cette campagne est peut-être terminée ou a été retirée.</p>
          <Link to="/campaigns" className="inline-flex mt-8 h-12 px-7 items-center rounded-full bg-[#EF4444] text-white font-bold shadow-lg shadow-red-500/25">
            Parcourir les campagnes
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white text-slate-900 font-body min-h-screen">
      <Navbar mode={isBrand ? "brand" : mode} setMode={setMode} />

      <main className="pt-28 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <Link to="/campaigns" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Toutes les campagnes
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="relative rounded-3xl overflow-hidden ring-1 ring-slate-100 shadow-lg">
              <img src={campaign.img} alt={campaign.name} className="w-full aspect-square object-cover" />
              {campaign.rank && (
                <span className="absolute top-5 left-5 bg-white/90 backdrop-blur text-slate-900 text-sm font-extrabold px-3 py-1.5 rounded-full shadow">#{campaign.rank} Top rémunération</span>
              )}
            </div>

            <div>
              <span className="inline-block bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-full">{campaign.category}</span>
              <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">{campaign.name}</h1>
              <p className="mt-1 text-lg text-slate-400 font-semibold">{campaign.brand}</p>

              <div className="mt-6 inline-flex items-baseline gap-2 bg-red-50 text-[#DC2626] rounded-2xl px-5 py-3">
                <span className="text-3xl font-extrabold font-mono">${campaign.rate.toFixed(2)}</span>
                <span className="text-sm font-semibold">/1K vues</span>
              </div>

              <p className="mt-6 text-slate-500 leading-relaxed">{campaign.description}</p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <Wallet className="w-5 h-5 text-[#DC2626] mb-2" />
                  <p className="text-lg font-extrabold text-slate-900">{campaign.budget}</p>
                  <p className="text-xs text-slate-400">Budget total</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <Video className="w-5 h-5 text-[#DC2626] mb-2" />
                  <p className="text-lg font-extrabold text-slate-900">{campaign.maxPerVideo}</p>
                  <p className="text-xs text-slate-400">Max par vidéo</p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 flex-wrap">
                <Share2 className="w-4 h-4 text-slate-400" />
                {(campaign.platforms || []).map((p) => (
                  <span key={p} className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full">{p}</span>
                ))}
              </div>

              {isOwner ? (
                <BrandCampaignControls
                  campaign={campaign}
                  onUpdated={() => base44.entities.Campaign.filter({ id }).then((r) => r[0] && setCampaign(r[0]))}
                />
              ) : isBrand ? null : joined ? (
                <JoinedActions campaign={campaign} justJoined={justJoined} />
              ) : (
                <button
                  onClick={handleJoin}
                  disabled={joining}
                  className="mt-10 inline-flex h-14 px-10 items-center gap-2 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold shadow-xl shadow-red-500/30 transition-all hover:scale-[1.03] disabled:opacity-60"
                >
                  {joining ? <><Loader2 className="w-5 h-5 animate-spin" /> Inscription...</> : "Rejoindre cette campagne →"}
                </button>
              )}
            </div>
          </div>

          <div className="mt-16 max-w-3xl">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Consignes de la campagne</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div><h3 className="font-bold text-emerald-600 mb-3">À faire</h3><div className="space-y-3">{(campaign.do_list || campaign.brief || []).map((item, i) => <div key={i} className="flex items-start gap-3 rounded-2xl bg-emerald-50 p-4"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" /><p className="text-slate-600">{item}</p></div>)}</div></div>
              <div><h3 className="font-bold text-red-600 mb-3">À ne pas faire</h3><div className="space-y-3">{(campaign.dont_list || []).map((item, i) => <div key={i} className="flex items-start gap-3 rounded-2xl bg-red-50 p-4"><XCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" /><p className="text-slate-600">{item}</p></div>)}</div></div>
            </div>
          </div>

          <ExampleVideos campaign={campaign} />
        </div>
      </main>

      <Footer />
    </div>
  );
}