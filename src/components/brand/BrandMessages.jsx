import React, { useState, useEffect, useRef, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { MessageCircle, Send, Loader2 } from "lucide-react";

export default function BrandMessages({ campaigns }) {
  const [allMessages, setAllMessages] = useState([]);
  const [activeKey, setActiveKey] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  const load = useCallback(async () => {
    const ids = campaigns.map((c) => c.id);
    if (ids.length === 0) { setLoading(false); return; }
    const rows = await base44.entities.Message.filter({ campaign_id: { $in: ids } }, "created_date");
    setAllMessages(rows);
    setLoading(false);
  }, [campaigns]);

  useEffect(() => { load(); }, [load]);

  // Conversations: one per (campaign, creator)
  const conversations = [];
  const seen = new Set();
  allMessages.forEach((m) => {
    const key = `${m.campaign_id}|${m.creator_id || "?"}`;
    if (!seen.has(key)) {
      seen.add(key);
      conversations.push({ key, campaign_id: m.campaign_id, campaign_name: m.campaign_name, creator_id: m.creator_id, creator_name: m.creator_name || "Créateur" });
    }
  });

  const active = conversations.find((c) => c.key === activeKey) || conversations[0];
  const thread = active ? allMessages.filter((m) => `${m.campaign_id}|${m.creator_id || "?"}` === active.key) : [];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [allMessages, activeKey]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() || !active) return;
    setSending(true);
    const campaign = campaigns.find((c) => c.id === active.campaign_id);
    const created = await base44.entities.Message.create({
      campaign_id: active.campaign_id,
      campaign_name: active.campaign_name,
      brand: campaign?.brand || "",
      sender: "brand",
      creator_id: active.creator_id,
      creator_name: active.creator_name,
      text: text.trim(),
    });
    setAllMessages((prev) => [...prev, created]);
    setText("");
    setSending(false);
  };

  if (loading) {
    return (
      <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-10 flex justify-center">
        <Loader2 className="w-5 h-5 text-slate-300 animate-spin" />
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-10 text-center">
        <MessageCircle className="w-8 h-8 text-slate-300 mx-auto mb-3" />
        <p className="font-bold text-slate-900">Aucune discussion</p>
        <p className="text-sm text-slate-500 mt-1">Les créateurs qui rejoignent tes campagnes pourront t'écrire ici.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-[260px_1fr] gap-4 rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm overflow-hidden">
      <div className="border-b md:border-b-0 md:border-r border-slate-100 p-2 max-h-72 md:max-h-none overflow-y-auto">
        {conversations.map((c) => (
          <button
            key={c.key}
            onClick={() => setActiveKey(c.key)}
            className={`w-full flex flex-col gap-0.5 p-2.5 rounded-2xl text-left transition-colors ${active?.key === c.key ? "bg-red-50" : "hover:bg-slate-50"}`}
          >
            <p className={`text-sm font-bold truncate ${active?.key === c.key ? "text-[#DC2626]" : "text-slate-900"}`}>{c.creator_name}</p>
            <p className="text-xs text-slate-400 truncate">{c.campaign_name}</p>
          </button>
        ))}
      </div>

      <div className="flex flex-col h-96">
        <div className="px-5 py-3 border-b border-slate-100">
          <p className="font-bold text-slate-900 truncate">{active?.creator_name}</p>
          <p className="text-xs text-slate-400">{active?.campaign_name}</p>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-3">
          {thread.map((m) => (
            <div key={m.id} className={`flex ${m.sender === "brand" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${m.sender === "brand" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-800"}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="flex items-center gap-2 p-3 border-t border-slate-100">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Réponds au créateur..."
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