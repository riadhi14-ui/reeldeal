import React, { useState, useEffect, useRef, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { MessageCircle, Send, Loader2 } from "lucide-react";

export default function CampaignMessages({ participations, user }) {
  const [activeId, setActiveId] = useState(participations[0]?.campaign_id || null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  const active = participations.find((p) => p.campaign_id === activeId);

  const loadMessages = useCallback(async (cid) => {
    if (!cid) return;
    setLoading(true);
    const rows = await base44.entities.Message.filter(
      { campaign_id: cid, created_by_id: user.id },
      "created_date"
    );
    setMessages(rows);
    setLoading(false);
  }, [user.id]);

  useEffect(() => { loadMessages(activeId); }, [activeId, loadMessages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() || !active) return;
    setSending(true);
    const created = await base44.entities.Message.create({
      campaign_id: active.campaign_id,
      campaign_name: active.campaign_name,
      brand: active.brand,
      sender: "creator",
      text: text.trim(),
    });
    setMessages((prev) => [...prev, created]);
    setText("");
    setSending(false);
  };

  if (participations.length === 0) {
    return (
      <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-10 text-center">
        <MessageCircle className="w-8 h-8 text-slate-300 mx-auto mb-3" />
        <p className="font-bold text-slate-900">Aucune discussion</p>
        <p className="text-sm text-slate-500 mt-1">Rejoins une campagne pour poser tes questions à la marque.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-[260px_1fr] gap-4 rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm overflow-hidden">
      <div className="border-b md:border-b-0 md:border-r border-slate-100 p-2 max-h-72 md:max-h-none overflow-y-auto">
        {participations.map((p) => (
          <button
            key={p.campaign_id}
            onClick={() => setActiveId(p.campaign_id)}
            className={`w-full flex items-center gap-3 p-2.5 rounded-2xl text-left transition-colors ${activeId === p.campaign_id ? "bg-red-50" : "hover:bg-slate-50"}`}
          >
            <img src={p.img} alt={p.campaign_name} className="w-10 h-10 rounded-xl object-cover shrink-0" />
            <div className="min-w-0">
              <p className={`text-sm font-bold truncate ${activeId === p.campaign_id ? "text-[#DC2626]" : "text-slate-900"}`}>{p.campaign_name}</p>
              <p className="text-xs text-slate-400 truncate">{p.brand}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex flex-col h-96">
        <div className="px-5 py-3 border-b border-slate-100">
          <p className="font-bold text-slate-900 truncate">{active?.campaign_name}</p>
          <p className="text-xs text-slate-400">{active?.brand}</p>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-3">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-slate-300 animate-spin" />
            </div>
          ) : messages.length === 0 ? (
            <p className="text-sm text-slate-400 text-center mt-8">Pose ta première question sur cette campagne.</p>
          ) : (
            messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === "creator" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${m.sender === "creator" ? "bg-[#EF4444] text-white" : "bg-slate-100 text-slate-800"}`}>
                  {m.text}
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSend} className="flex items-center gap-2 p-3 border-t border-slate-100">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Écris ton message..."
            className="flex-1 h-11 px-4 rounded-full bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-[#EF4444]/30"
          />
          <button
            type="submit"
            disabled={sending || !text.trim()}
            className="h-11 w-11 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white flex items-center justify-center shrink-0 disabled:opacity-50 transition-colors"
          >
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}