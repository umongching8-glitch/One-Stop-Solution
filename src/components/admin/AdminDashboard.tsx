import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminOverview } from './AdminOverview';
import { AdminServices } from './AdminServices';
import { AdminOrders } from './AdminOrders';
import { AdminAnalytics } from './AdminAnalytics';
import { AdminSettings } from './AdminSettings';
import { 
  LayoutDashboard, 
  Layers, 
  ShoppingBag, 
  BarChart3, 
  Settings, 
  ArrowLeft, 
  ExternalLink, 
  Zap,
  Sparkles,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    adminTab, 
    setAdminTab, 
    setIsAdminView, 
    orders, 
    services, 
    resetToDemoData 
  } = useApp();

  const [targetedOrderId, setTargetedOrderId] = useState<string | null>(null);

  const pendingCount = orders.filter(o => o.orderStatus === 'pending' || o.orderStatus === 'processing').length;

  const handleOpenOrder = (orderId: string) => {
    setTargetedOrderId(orderId);
    setAdminTab('orders');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      
      {/* Top Admin Notice Bar */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-indigo-950/80 border-b border-emerald-500/20 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-bold text-emerald-400">ADMIN CONTROL CENTER</span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-300 hidden sm:inline">
              Manage inventory, live pricing, customer orders & real-time delivery
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (confirm('Reset catalog, orders, and demo data to original preset?')) {
                  resetToDemoData();
                }
              }}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Demo State</span>
            </button>

            <button
              onClick={() => setIsAdminView(false)}
              className="px-2.5 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 font-semibold text-[11px] flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Exit to Storefront</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Navigation Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-white text-base tracking-tight flex items-center gap-1.5">
                  One Stop Solution
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    ADMIN
                  </span>
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              
              <button
                onClick={() => setAdminTab('overview')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  adminTab === 'overview'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Overview</span>
              </button>

              <button
                onClick={() => setAdminTab('services')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  adminTab === 'services'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Inventory & Pricing</span>
                <span className="px-1.5 py-0.2 rounded bg-black/30 text-[10px] font-mono">
                  {services.length}
                </span>
              </button>

              <button
                onClick={() => setAdminTab('orders')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  adminTab === 'orders'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Customer Orders</span>
                {pendingCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black">
                    {pendingCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setAdminTab('analytics')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  adminTab === 'analytics'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reports & Analytics</span>
              </button>

              <button
                onClick={() => setAdminTab('settings')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  adminTab === 'settings'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Settings</span>
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {adminTab === 'overview' && (
          <AdminOverview
            onNavigateTab={(tab) => setAdminTab(tab)}
            onOpenOrderModal={handleOpenOrder}
          />
        )}

        {adminTab === 'services' && (
          <AdminServices />
        )}

        {adminTab === 'orders' && (
          <AdminOrders 
            initialSelectedOrderId={targetedOrderId}
            onClearInitialSelectedOrder={() => setTargetedOrderId(null)}
          />
        )}

        {adminTab === 'analytics' && (
          <AdminAnalytics />
        )}

        {adminTab === 'settings' && (
          <AdminSettings />
        )}
      </main>

    </div>
  );
};
