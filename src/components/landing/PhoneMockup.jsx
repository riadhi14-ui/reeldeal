import React, { useState, useEffect, useRef } from "react";
import { Heart, MessageCircle, Share2, Music, Eye, Plus } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function PhoneMockup() {
  const [videos, setVideos] = useState([]);
  const [index, setIndex] = useState(0);
  const [earnings, setEarnings] = useState([211]);
  const touchStartY = useRef(null);
  const scrollLocked = useRef(false);

  useEffect(() => {
    base44.entities.LandingVideo.list("-created_date").then((list) => {
      setVideos(list);
      setEarnings(list.length ? list.map(() => Math.floor(80 + Math.random() * 400)) : [211]);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (videos.length < 2) return;
    const interval = setInterval(() => setIndex((i) => (i + 1) % videos.length), 6000);
    return () => clearInterval(interval);
  }, [videos.length]);

  const goTo = (dir) => {
    if (videos.length < 2 || scrollLocked.current) return;
    scrollLocked.current = true;
    setIndex((i) => (i + dir + videos.length) % videos.length);
    setTimeout(() => { scrollLocked.current = false; }, 500);
  };

  const handleWheel = (e) => goTo(e.deltaY > 0 ? 1 : -1);
  const handleTouchStart = (e) => { touchStartY.current = e.touches[0].clientY; };
  const handleTouchEnd = (e) => {
    if (touchStartY.current === null) return;
    const delta = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(delta) > 40) goTo(delta > 0 ? 1 : -1);
    touchStartY.current = null;
  };

  return (
    <div className="relative">
      {/* Phone */}
      <div className="relative w-[280px] sm:w-[300px] mx-auto rounded-[3rem] bg-slate-900 p-3 shadow-2xl shadow-slate-900/30 ring-1 ring-slate-800">
        <div
          className="rounded-[2.4rem] overflow-hidden bg-black aspect-[9/19] relative cursor-grab"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {videos.length > 0 ? (
            <video
              key={videos[index].id}
              src={videos[index].video_url}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=1200&fit=crop"
              alt="Creator video"
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
          )}
          {/* Status bar */}
          <div className="absolute top-0 inset-x-0 flex justify-between items-center px-6 pt-3 text-white text-[10px] font-semibold">
            <span>9:41</span>
            <span className="flex gap-1 items-center">▮▮▮ ▭</span>
          </div>
          {/* Earned badge */}
          <div className="absolute top-9 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#EF4444] text-white rounded-full px-4 py-1.5 text-xs font-bold shadow-lg">
            <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center text-[9px]">€</span>
            {earnings[index] ?? 211} € <span className="font-normal opacity-80 text-[10px]">gagnés</span>
          </div>
          {/* Right rail */}
          <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4 text-white">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 ring-2 ring-white" />
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#EF4444] flex items-center justify-center"><Plus className="w-3 h-3" /></span>
            </div>
            <div className="flex flex-col items-center gap-0.5"><Heart className="w-7 h-7 fill-white" /><span className="text-[10px] font-semibold">4.7K</span></div>
            <div className="flex flex-col items-center gap-0.5"><MessageCircle className="w-7 h-7" /><span className="text-[10px] font-semibold">633</span></div>
            <div className="flex flex-col items-center gap-0.5"><Share2 className="w-7 h-7" /><span className="text-[10px] font-semibold">316</span></div>
          </div>
          {/* Bottom info */}
          <div className="absolute bottom-4 left-4 right-14 text-white space-y-1">
            <p className="text-xs font-bold">flamazerty</p>
            <p className="text-[10px] leading-snug opacity-90">Abonne toi ! Premier site web 100% gratuit avec le lien en bio ! #ia #viral #fyp #business</p>
            <p className="text-[10px] flex items-center gap-1 opacity-90"><Eye className="w-3 h-3" /> <b>52,7K vues</b> · Blink.new</p>
            <p className="text-[10px] flex items-center gap-1 opacity-80"><Music className="w-3 h-3" /> Son original — flamazerty</p>
          </div>
        </div>
      </div>

      {/* Floating card */}
      <div className="absolute -right-4 sm:right-[-70px] top-24 w-52 rounded-2xl bg-gradient-to-br from-[#F87171] to-[#DC2626] text-white p-4 shadow-2xl shadow-red-500/40 rotate-[8deg]">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-bold text-sm">ReelDeal</p>
            <p className="text-[9px] opacity-75">Meilleurs gains</p>
          </div>
          <span className="w-3 h-3 rounded-full bg-emerald-300 shadow shadow-emerald-300/60" />
        </div>
        <p className="text-[10px] tracking-widest opacity-80 mt-4 font-mono">•••• •••• •••• 4829</p>
        <div className="flex items-end justify-between mt-1">
          <p className="text-2xl font-extrabold">2 347 €</p>
          <p className="text-[9px] opacity-75 mb-1">gagnés</p>
        </div>
      </div>
    </div>
  );
}