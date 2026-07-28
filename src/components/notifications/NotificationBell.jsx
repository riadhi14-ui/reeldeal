import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Bell, Check } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export default function NotificationBell({ userId }) {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const load = useCallback(async () => {
    if (!userId) return;
    const list = await base44.entities.Notification.filter({ recipient_id: userId }, "-created_date", 20).catch(() => []);
    setItems(list);
  }, [userId]);

  useEffect(() => {
    load();
    if (!userId) return;
    const unsub = base44.entities.Notification.subscribe(() => load());
    const timer = setInterval(load, 30000);
    return () => { unsub?.(); clearInterval(timer); };
  }, [load, userId]);

  const unread = items.filter((n) => !n.read).length;

  const markAllRead = async () => {
    const toMark = items.filter((n) => !n.read);
    await Promise.all(toMark.map((n) => base44.entities.Notification.update(n.id, { read: true })));
    load();
  };

  const openItem = async (n) => {
    if (!n.read) await base44.entities.Notification.update(n.id, { read: true });
    if (n.link) navigate(n.link);
    load();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors">
          <Bell className="w-4 h-4" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#EF4444] text-white text-[10px] font-bold flex items-center justify-center">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <p className="font-bold text-slate-900 text-sm">Notifications</p>
          {unread > 0 && (
            <button onClick={markAllRead} className="inline-flex items-center gap-1 text-xs font-semibold text-[#DC2626] hover:underline">
              <Check className="w-3 h-3" /> Tout marquer lu
            </button>
          )}
        </div>
        <div className="max-h-96 overflow-y-auto divide-y divide-slate-100">
          {items.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-8">Aucune notification</p>
          ) : (
            items.map((n) => (
              <button
                key={n.id}
                onClick={() => openItem(n)}
                className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors ${n.read ? "" : "bg-red-50/40"}`}
              >
                <div className="flex items-start gap-2">
                  {!n.read && <span className="mt-1.5 w-2 h-2 rounded-full bg-[#EF4444] shrink-0" />}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900">{n.title}</p>
                    {n.body && <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.body}</p>}
                    <p className="text-[10px] text-slate-400 mt-1">{formatDistanceToNow(new Date(n.created_date), { addSuffix: true, locale: fr })}</p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}