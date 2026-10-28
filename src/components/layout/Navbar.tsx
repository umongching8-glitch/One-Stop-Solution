import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CURRENCIES } from '../../utils/currency';
import { CurrencyCode } from '../../types';
import { 
  Zap, 
  Search, 
  Compass, 
  Layers, 
  ShieldCheck, 
  SlidersHorizontal, 
  Sparkles,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  onSelectCategory?: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectCategory }) => {
  const { 
    currency, 
    setCurrency, 
    isAdminView, 
    setIsAdminView, 
    openTrackingModal,
    orders 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const pendingOrdersCount = orders.filter(o => o.orderStatus === 'pending' || o.orderStatus === 'processing').length;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                setIsAdminView(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent flex items-center gap-1.5">
                  One Stop Solution
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    PRO
                  </span>
                </span>
                <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                  Social Media • AI Subscriptions • Graphic Design
                </p>
              </div>
            </button>
          </div>

          {/* Center Navigation Shortcuts (Storefront mode) */}
          {!isAdminView && (
            <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  onSelectCategory?.('all');
                  const el = document.getElementById('services-catalog');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
              >
                All Services
              </button>
              <button
                onClick={() => {
                  onSelectCategory?.('social');
                  const el = document.getElementById('services-catalog');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                Social Growth
              </button>
              <button
                onClick={() => {
                  onSelectCategory?.('ai_subscription');
                  const el = document.getElementById('services-catalog');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                AI Subscriptions
              </button>
              <button
                onClick={() => {
                  onSelectCategory?.('graphic_design');
                  const el = document.getElementById('services-catalog');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Graphic Design
              </button>
            </nav>
          )}

          {/* Right Action Tools: Currency, Track Order, Admin Mode Toggle */}
          <div className="flex items-center gap-2.5">
            
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                title="Select Currency"
              >
                <span>{CURRENCIES[currency].symbol} {currency}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isCurrencyDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-32 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-1 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setIsCurrencyDropdownOpen(false)}
                >
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        currency === c 
                          ? 'bg-indigo-600/30 text-indigo-300 font-bold' 
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span>{c}</span>
                      <span className="text-slate-400 font-mono">{CURRENCIES[c].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Live Track Order Button */}
            <button
              onClick={() => openTrackingModal()}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800/80 border border-slate-800 text-xs font-medium text-slate-200 hover:text-white transition-all shadow-sm"
              title="Track live progress of any order"
            >
              <Compass className="w-3.5 h-3.5 text-indigo-400 animate-spin-slow" />
              <span className="hidden sm:inline">Track Order</span>
            </button>

            {/* Admin Dashboard Switcher Button */}
            <button
              onClick={() => setIsAdminView(!isAdminView)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
                isAdminView
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-500/20'
                  : 'bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 hover:border-indigo-500/50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{isAdminView ? 'Store View' : 'Admin Portal'}</span>
              {!isAdminView && pendingOrdersCount > 0 && (
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black">
                  {pendingOrdersCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
