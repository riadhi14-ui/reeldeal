import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Wallet, Video, Share2 } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { getCampaign } from "@/lib/campaignsData";

export default function CampaignDetail() {
  const { id } = useParams();
  const [mode, setMode] = useState("creator");
  const campaign = getCampaign(id);

  if (!campaign) {
    return (
      <div className="bg-white min-h-screen font-body">
        <Navbar mode={mode} setMode={setMode} />
        <div className="pt-40 pb-24 text-center px-6">
          <h1 className="text-3xl font-extrabold text-slate-900">Campaign not found</h1>
          <p className="mt-3 text-slate-500">This campaign may have ended or been removed.</p>
          <Link to="/campaigns" className="inline-flex mt-8 h-12 px-7 items-center rounded-full bg-[#00A3E0] text-white font-bold shadow-lg shadow-cyan-500/25">
            Browse Campaigns
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white text-slate-900 font-body min-h-screen">
      <Navbar mode={mode} setMode={setMode} />

      <main className="pt-28 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <Link to="/campaigns" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> All Campaigns
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="relative rounded-3xl overflow-hidden ring-1 ring-slate-100 shadow-lg">
              <img src={campaign.img} alt={campaign.name} className="w-full aspect-square object-cover" />
              <span className="absolute top-5 left-5 bg-white/90 backdrop-blur text-slate-900 text-sm font-extrabold px-3 py-1.5 rounded-full shadow">#{campaign.rank} Top Paying</span>
            </div>

            <div>
              <span className="inline-block bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-full">{campaign.category}</span>
              <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">{campaign.name}</h1>
              <p className="mt-1 text-lg text-slate-400 font-semibold">{campaign.brand}</p>

              <div className="mt-6 inline-flex items-baseline gap-2 bg-cyan-50 text-[#0084CC] rounded-2xl px-5 py-3">
                <span className="text-3xl font-extrabold font-mono">${campaign.rate.toFixed(2)}</span>
                <span className="text-sm font-semibold">/1K views</span>
              </div>

              <p className="mt-6 text-slate-500 leading-relaxed">{campaign.description}</p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <Wallet className="w-5 h-5 text-[#0084CC] mb-2" />
                  <p className="text-lg font-extrabold text-slate-900">{campaign.budget}</p>
                  <p className="text-xs text-slate-400">Total budget</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <Video className="w-5 h-5 text-[#0084CC] mb-2" />
                  <p className="text-lg font-extrabold text-slate-900">{campaign.maxPerVideo}</p>
                  <p className="text-xs text-slate-400">Max per video</p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 flex-wrap">
                <Share2 className="w-4 h-4 text-slate-400" />
                {campaign.platforms.map((p) => (
                  <span key={p} className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full">{p}</span>
                ))}
              </div>

              <Link
                to="/login"
                className="mt-10 inline-flex h-14 px-10 items-center rounded-full bg-[#00A3E0] hover:bg-[#0084CC] text-white font-bold shadow-xl shadow-cyan-500/30 transition-all hover:scale-[1.03]"
              >
                Join This Campaign →
              </Link>
            </div>
          </div>

          <div className="mt-16 max-w-3xl">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Campaign Brief</h2>
            <div className="space-y-4">
              {campaign.brief.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <CheckCircle2 className="w-5 h-5 text-[#0084CC] mt-0.5 shrink-0" />
                  <p className="text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}