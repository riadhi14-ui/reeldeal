import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Loader2, ShieldCheck, ArrowLeft, Trash2, Upload } from "lucide-react";

export default function AdminLandingVideos() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async () => {
    let me;
    try { me = await base44.auth.me(); } catch { navigate("/login", { replace: true }); return; }
    if (me?.role !== "admin") { navigate("/", { replace: true }); return; }
    const list = await base44.entities.LandingVideo.list("-created_date");
    setVideos(list);
    setLoading(false);
  }, [navigate]);

  useEffect(() => { load(); }, [load]);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    const created = await base44.entities.LandingVideo.create({ video_url: file_url, title: file.name });
    setVideos((current) => [created, ...current]);
    setUploading(false);
    e.target.value = "";
  };

  const remove = async (id) => {
    setDeletingId(id);
    await base44.entities.LandingVideo.delete(id);
    setVideos((current) => current.filter((v) => v.id !== id));
    setDeletingId(null);
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
            <h1 className="text-2xl font-extrabold">Vidéos du téléphone (accueil)</h1>
            <p className="text-sm text-slate-500">Ajoute ou retire les vidéos affichées dans le mockup téléphone de la page d'accueil.</p>
          </div>
        </div>

        <input ref={fileInputRef} type="file" accept="video/*" className="hidden" onChange={handleUpload} />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-bold disabled:opacity-50 mb-8"
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />} Ajouter une vidéo
        </button>

        {videos.length === 0 ? (
          <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-10 text-center">
            <p className="font-bold text-slate-900">Aucune vidéo ajoutée</p>
            <p className="text-sm text-slate-500 mt-1">Ajoute une vidéo pour qu'elle apparaisse dans le mockup téléphone.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {videos.map((v) => (
              <div key={v.id} className="relative rounded-2xl overflow-hidden bg-black ring-1 ring-slate-100 shadow-sm aspect-[9/16]">
                <video src={v.video_url} className="w-full h-full object-cover" muted playsInline />
                <button
                  onClick={() => remove(v.id)}
                  disabled={deletingId === v.id}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-red-600 flex items-center justify-center disabled:opacity-50"
                >
                  {deletingId === v.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </button>
                <p className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] px-2 py-1 truncate">{v.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}