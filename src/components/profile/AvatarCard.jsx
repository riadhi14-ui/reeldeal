import React, { useRef, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Camera, Loader2, Smile, Trash2 } from "lucide-react";
import { EMOJI_PREFIX, getAvatarEmoji, getAvatarImageUrl } from "@/lib/avatar";

const EMOJIS = ["😀", "😎", "🤩", "🥳", "🔥", "🚀", "⭐", "💎", "🎬", "📸", "🎤", "🎨", "💃", "🕺", "🦄", "🐱", "🐶", "🌈", "❤️", "💜", "🍀", "⚡", "👑", "🎯"];

export default function AvatarCard({ value, name, onChange }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const emoji = getAvatarEmoji({ profile_image: value });
  const imageUrl = getAvatarImageUrl({ profile_image: value });
  const initial = (name || "?").charAt(0).toUpperCase();

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      onChange(file_url);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <Smile className="w-5 h-5 text-[#DC2626]" />
        <h2 className="font-extrabold text-slate-900">Photo & emoji de profil</h2>
      </div>

      <div className="flex items-center gap-5">
        <span className="w-20 h-20 rounded-full bg-[#EF4444] text-white flex items-center justify-center text-3xl font-bold overflow-hidden shrink-0">
          {imageUrl ? <img src={imageUrl} alt={name} className="w-full h-full object-cover" /> : emoji ? <span className="text-4xl leading-none">{emoji}</span> : initial}
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors disabled:opacity-60"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
            {uploading ? "Envoi..." : "Importer une photo"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-slate-100 text-slate-600 text-sm font-bold hover:bg-slate-200 transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Retirer
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Ou choisis un emoji</p>
        <div className="grid grid-cols-8 gap-2">
          {EMOJIS.map((e) => {
            const active = emoji === e;
            return (
              <button
                key={e}
                type="button"
                onClick={() => onChange(EMOJI_PREFIX + e)}
                className={`aspect-square rounded-xl text-2xl flex items-center justify-center transition-all ${active ? "bg-red-50 ring-2 ring-[#EF4444]" : "bg-slate-50 hover:bg-slate-100"}`}
              >
                {e}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}