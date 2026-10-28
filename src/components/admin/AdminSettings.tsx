import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PromoCode, CurrencyCode } from '../../types';
import { CURRENCIES } from '../../utils/currency';
import { 
  Tag, 
  Plus, 
  Trash2, 
  Check, 
  RotateCcw, 
  Download, 
  Upload, 
  Database, 
  ShieldCheck, 
  AlertTriangle,
  Coins
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { 
    promoCodes, 
    addPromoCode, 
    togglePromoCode, 
    resetToDemoData, 
    currency, 
    setCurrency, 
    services, 
    orders 
  } = useApp();

  // New promo code form
  const [newCode, setNewCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState(10);
  const [minOrder, setMinOrder] = useState<number>(0);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    const promo: PromoCode = {
      code: newCode.trim().toUpperCase(),
      discountType,
      discountValue: Number(discountValue),
      minOrder: minOrder > 0 ? Number(minOrder) : undefined,
      isActive: true
    };

    addPromoCode(promo);
    setNewCode('');
    setFeedbackMsg(`Promo code "${promo.code}" created successfully!`);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleExportBackup = () => {
    const backupData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      services,
      orders,
      promoCodes,
      currency
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `one_stop_solution_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="pb-2 border-b border-slate-800">
        <h3 className="text-xl font-bold text-white">System Settings & Data Control</h3>
        <p className="text-xs text-slate-400">
          Manage promotional discount codes, global currency defaults, and cloud storage backups.
        </p>
      </div>

      {feedbackMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Grid: Promo Codes & Currency Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Promo Codes Manager */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-indigo-400" />
              <h4 className="text-sm font-bold text-white">Promotional Discount Codes</h4>
            </div>
            <span className="text-xs text-slate-400 font-mono">{promoCodes.length} configured</span>
          </div>

          {/* Existing Codes */}
          <div className="space-y-2">
            {promoCodes.map((promo) => (
              <div 
                key={promo.code} 
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white tracking-wider">{promo.code}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${promo.isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'}`}>
                      {promo.isActive ? 'ACTIVE' : 'PAUSED'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {promo.discountType === 'percentage' ? `${promo.discountValue}% OFF` : `$${promo.discountValue} FLAT OFF`}
                    {promo.minOrder ? ` (Min order: $${promo.minOrder})` : ''}
                  </p>
                </div>

                <button
                  onClick={() => togglePromoCode(promo.code)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    promo.isActive
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {promo.isActive ? 'Pause' : 'Activate'}
                </button>
              </div>
            ))}
          </div>

          {/* Add New Promo Code Form */}
          <form onSubmit={handleCreatePromo} className="pt-3 border-t border-slate-800 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block">
              Create New Promo Code
            </span>

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="PROMO CODE"
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white uppercase font-mono placeholder:normal-case placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                required
              />

              <div className="flex gap-2">
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-2 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="percentage">% Percentage</option>
                  <option value="fixed">$ Fixed Flat</option>
                </select>

                <input
                  type="number"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(Number(e.target.value))}
                  placeholder="Val"
                  className="w-16 px-2 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Promo Code</span>
            </button>
          </form>
        </div>

        {/* Currency & Storage Management */}
        <div className="space-y-6">
          
          {/* Currency Configuration */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-bold text-white">System Currency Preferences</h4>
              </div>
              <span className="text-xs text-indigo-400 font-bold font-mono">
                Active: {currency} ({CURRENCIES[currency].symbol})
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Select default store display currency. Live automated exchange rates are applied.
            </p>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 pt-1">
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    currency === c
                      ? 'bg-indigo-600 text-white border-indigo-500 font-bold shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-mono">{c}</div>
                  <div className="text-sm font-bold">{CURRENCIES[c].symbol}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Cloud Storage & Backup Section */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-bold text-white">Data Storage & Persistence</h4>
              </div>
              <span className="text-xs text-emerald-400 font-mono font-medium">Auto-Synced</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              All services, prices, customer orders, and statuses are automatically synchronized to secure browser storage and memory. Export backups or reset demo state anytime.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleExportBackup}
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export JSON Database</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (confirm('Reset all catalog services, orders, and promo codes to original factory state?')) {
                    resetToDemoData();
                  }
                }}
                className="py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Demo Data</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
