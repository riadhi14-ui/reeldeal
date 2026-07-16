import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { ImagePlus, Loader2, Upload, X, ArrowRight, Film } from "lucide-react";

export default function CampaignMediaFields({ image, videos, explainer, onImage, onVideos, onExplainer, onUploading, onError }) {
  const [busy, setBusy] = useState(false);
  const upload = async (files, type) => {
    setBusy(true); onUploading(true); onError("");
    try {
      const uploaded = await Promise.all(files.map((file) => base44.integrations.Core.UploadFile({ file })));
      if (type === "image") onImage(uploaded[0].file_url);
      else if (type === "explainer") onExplainer(uploaded[0].file_url);
      else onVideos([...videos, ...uploaded.map((item) => item.file_url)]);
    } catch (error) { onError(error.message || "Échec du téléversement"); }
    finally { setBusy(false); onUploading(false); }
  };
  return (
    <section className="space-y-5 rounded-2xl border border-slate-200 p-4">
      <div><h3 className="font-bold text-slate-900">Images et vidéos exemples</h3><p className="text-xs text-slate-500">Ajoute les médias qui aideront les créateurs à comprendre le rendu attendu.</p></div>
      <div>
        <p className="text-sm font-semibold mb-2">Image de couverture</p>
        <div className="flex items-stretch gap-3">
          <label className="flex flex-1 min-h-28 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 overflow-hidden">
            {image ? <img src={image} alt="Aperçu de la couverture" className="h-36 w-full object-cover" /> : <span className="flex flex-col items-center gap-2 text-sm text-slate-500"><ImagePlus className="w-6 h-6" /> Choisir une image</span>}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && upload([e.target.files[0]], "image")} />
          </label>
          <label className="group flex w-24 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-500 hover:border-[#EF4444] hover:text-[#DC2626] transition-colors overflow-hidden" title="Ajouter une vidéo explicative (9/16)">
            {explainer ? (
              <video src={explainer} className="h-full w-full object-cover" />
            ) : (
              <>
                <ArrowRight className="w-5 h-5" />
                <span className="text-[10px] font-bold text-center px-1 leading-tight">Vidéo explicative 9/16</span>
              </>
            )}
            <input type="file" accept="video/*" className="hidden" onChange={(e) => e.target.files?.[0] && upload([e.target.files[0]], "explainer")} />
          </label>
        </div>
        {explainer && (
          <button type="button" onClick={() => onExplainer("")} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#DC2626]"><X className="w-3.5 h-3.5" /> Retirer la vidéo explicative</button>
        )}
      </div>
      <div><p className="text-sm font-semibold mb-2">Vidéos exemplaires</p><label className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-slate-100 text-sm font-bold text-slate-700">
        {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />} Télécharger une ou plusieurs vidéos
        <input type="file" accept="video/*" multiple className="hidden" disabled={busy} onChange={(e) => e.target.files?.length && upload([...e.target.files], "video")} />
      </label>
      {videos.length > 0 && <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">{videos.map((url, index) => <div key={url} className="relative"><video src={url} className="aspect-[9/16] w-full rounded-xl bg-slate-900 object-cover" /><button type="button" onClick={() => onVideos(videos.filter((_, i) => i !== index))} className="absolute right-1 top-1 rounded-full bg-slate-900/80 p-1 text-white" aria-label="Retirer la vidéo"><X className="w-4 h-4" /></button></div>)}</div>}
      </div>
    </section>
  );
}