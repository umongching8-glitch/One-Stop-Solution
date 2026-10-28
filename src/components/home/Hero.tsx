import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Zap, 
  Sparkles, 
  ShieldCheck, 
  Search, 
  ArrowRight, 
  TrendingUp, 
  Bot, 
  Palette, 
  Share2, 
  CheckCircle,
  Clock
} from 'lucide-react';

interface HeroProps {
  onSearch: (query: string) => void;
  onSelectCategory: (category: string) => void;
  activeCategory: string;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onSelectCategory, activeCategory }) => {
  const { openTrackingModal, orders } = useApp();
  const [searchInput, setSearchInput] = useState('');
  
  // Real-time simulated social proof ticker
  const [currentTickerIndex, setCurrentTickerIndex] = useState(0);
  const liveActivities = [
    { text: 'Someone in Austin ordered 2,500 Instagram Followers', time: '12 seconds ago', category: 'social' },
    { text: 'New activation: ChatGPT Pro (o1 Unlimited) account delivered', time: '38 seconds ago', category: 'ai' },
    { text: 'Creative brief received for Luxury Business Card & NFC', time: '1 minute ago', category: 'design' },
    { text: 'Google Gemini 2.0 Pro dedicated pass dispatched', time: '2 minutes ago', category: 'ai' },
    { text: 'YouTube 1,000 Monetization Subscribers order verified', time: '4 minutes ago', category: 'social' },
    { text: 'ElevenLabs Creator (100k chars) license delivered', time: '6 minutes ago', category: 'ai' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTickerIndex(prev => (prev + 1) % liveActivities.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
    const catalogEl = document.getElementById('services-catalog');
    catalogEl?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden pt-8 pb-14 lg:pt-14 lg:pb-20 border-b border-slate-900">
      
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/15 to-pink-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Live Order Dispatch Ticker */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs shadow-lg backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-400 font-medium hidden sm:inline">LIVE DISPATCH:</span>
            <span className="text-slate-200 font-semibold truncate max-w-xs sm:max-w-md">
              {liveActivities[currentTickerIndex].text}
            </span>
            <span className="text-slate-500 text-[11px] font-mono hidden md:inline">
              ({liveActivities[currentTickerIndex].time})
            </span>
          </div>
        </div>

        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Ultimate Digital Superstore
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Power Your Digital Growth with{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              One Stop Solution
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Automate social media followers & real engagement, unlock top-tier AI platform subscriptions (Gemini, ChatGPT, Grok, ElevenLabs), and get agency-level custom graphic design in hours.
          </p>
        </div>

        {/* Search Bar & Fast Query */}
        <div className="mt-8 max-w-2xl mx-auto">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <div className="absolute left-4 pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                onSearch(e.target.value);
              }}
              placeholder="Search services (e.g., 'ChatGPT', 'Instagram Followers', 'Logo Design', 'Gemini Pro')..."
              className="w-full pl-12 pr-32 py-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 text-white placeholder-slate-400 text-sm outline-none shadow-2xl transition-all"
            />
            <button
              type="submit"
              className="absolute right-2.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs tracking-wide shadow-md transition-all flex items-center gap-1.5"
            >
              Search
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-400">
            <span className="text-slate-400 font-medium">Popular:</span>
            {['Instagram Followers', 'ChatGPT Pro', 'Gemini Pro', 'ElevenLabs', 'Logo Design', 'YouTube Views'].map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSearchInput(tag);
                  onSearch(tag);
                  const el = document.getElementById('services-catalog');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-slate-200 text-slate-300 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Main Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
          
          {/* Pillar 1: Social Media Growth */}
          <div 
            onClick={() => {
              onSelectCategory('social');
              const el = document.getElementById('services-catalog');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`cursor-pointer group relative p-6 rounded-2xl border transition-all duration-300 ${
              activeCategory === 'social'
                ? 'bg-gradient-to-b from-pink-500/10 to-slate-900/80 border-pink-500/40 shadow-xl shadow-pink-500/10'
                : 'bg-slate-900/50 hover:bg-slate-900/80 border-slate-800 hover:border-pink-500/30'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                <Share2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-pink-500/10 text-pink-300 border border-pink-500/20">
                Non-Drop & Instant
              </span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-pink-300 transition-colors flex items-center gap-1.5">
              Social Media Growth
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Real followers, viral likes, views, reactions and watch-time for Instagram, YouTube, TikTok, Facebook & X.
            </p>
            <div className="flex items-center gap-2 mt-4 text-[11px] text-pink-400 font-medium">
              <span>Explore 6+ Platforms</span>
              <span>→</span>
            </div>
          </div>

          {/* Pillar 2: AI Subscriptions */}
          <div 
            onClick={() => {
              onSelectCategory('ai_subscription');
              const el = document.getElementById('services-catalog');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`cursor-pointer group relative p-6 rounded-2xl border transition-all duration-300 ${
              activeCategory === 'ai_subscription'
                ? 'bg-gradient-to-b from-indigo-500/10 to-slate-900/80 border-indigo-500/40 shadow-xl shadow-indigo-500/10'
                : 'bg-slate-900/50 hover:bg-slate-900/80 border-slate-800 hover:border-indigo-500/30'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Verified Credentials
              </span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
              AI Platform Subscriptions
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Official accounts & instant invites for Gemini Pro, ChatGPT Pro (o1/GPT-4o), ElevenLabs, Grok Pro & Midjourney.
            </p>
            <div className="flex items-center gap-2 mt-4 text-[11px] text-indigo-400 font-medium">
              <span>View AI Subscriptions</span>
              <span>→</span>
            </div>
          </div>

          {/* Pillar 3: Graphic Design */}
          <div 
            onClick={() => {
              onSelectCategory('graphic_design');
              const el = document.getElementById('services-catalog');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`cursor-pointer group relative p-6 rounded-2xl border transition-all duration-300 ${
              activeCategory === 'graphic_design'
                ? 'bg-gradient-to-b from-emerald-500/10 to-slate-900/80 border-emerald-500/40 shadow-xl shadow-emerald-500/10'
                : 'bg-slate-900/50 hover:bg-slate-900/80 border-slate-800 hover:border-emerald-500/30'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Palette className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Vector Source Files
              </span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
              AI & Graphic Design
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              High-impact vector logos, commercial flyers, business cards & social media kits with 3D realistic mockups.
            </p>
            <div className="flex items-center gap-2 mt-4 text-[11px] text-emerald-400 font-medium">
              <span>Custom Graphic Packages</span>
              <span>→</span>
            </div>
          </div>

        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slate-900">
          <div className="text-center p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-xl sm:text-2xl font-black text-white">48,290+</div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">Orders Completed</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-xl sm:text-2xl font-black text-emerald-400">99.8%</div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">Customer Satisfaction</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-xl sm:text-2xl font-black text-indigo-400">&lt; 3 Mins</div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">Avg Delivery Speed</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-xl sm:text-2xl font-black text-purple-400">30 Days</div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">Free Refill Guarantee</div>
          </div>
        </div>

      </div>
    </div>
  );
};
