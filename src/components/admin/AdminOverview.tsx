import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/currency';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  CheckCircle2, 
  Clock, 
  Users, 
  ArrowUpRight, 
  Share2, 
  Bot, 
  Palette, 
  Sparkles,
  Layers
} from 'lucide-react';

interface AdminOverviewProps {
  onNavigateTab: (tab: 'services' | 'orders' | 'analytics' | 'settings') => void;
  onOpenOrderModal: (orderId: string) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ onNavigateTab, onOpenOrderModal }) => {
  const { analytics, orders, services, currency } = useApp();

  const totalServicesCount = services.length;
  const activeServicesCount = services.filter(s => s.isActive).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Revenue */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Revenue</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">
              {formatPrice(analytics.totalRevenue, currency)}
            </span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +18.4%
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Across all digital channels</p>
        </div>

        {/* Total Orders */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Orders</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">
              {analytics.totalOrders}
            </span>
            <span className="text-xs font-semibold text-indigo-400 flex items-center">
              {analytics.completedOrders} completed
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {analytics.processingOrders} in queue / processing
          </p>
        </div>

        {/* Average Order Value (AOV) */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Average Order Value</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">
              {formatPrice(analytics.averageOrderValue, currency)}
            </span>
            <span className="text-xs font-semibold text-purple-400 flex items-center">
              Tier Upsells
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">High conversion multi-tier packages</p>
        </div>

        {/* Active Catalog Inventory */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Active Services</span>
            <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">
              {activeServicesCount} / {totalServicesCount}
            </span>
            <span className="text-xs font-semibold text-pink-400">
              100% Ready
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Social, AI Tools & Design suites</p>
        </div>

      </div>

      {/* Middle Grid: Category Breakdown + Sales Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Category Share & Revenue */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white">Category Sales Distribution</h4>
              <button 
                onClick={() => onNavigateTab('analytics')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Deep Report →
              </button>
            </div>

            <div className="space-y-4 mt-4">
              
              {/* AI Subscriptions */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                    <Bot className="w-3.5 h-3.5 text-indigo-400" />
                    <span>AI Platform Subscriptions</span>
                  </div>
                  <span className="font-mono font-bold text-white">
                    {formatPrice(analytics.categorySales.ai_subscription, currency)}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ 
                      width: `${analytics.totalRevenue > 0 ? (analytics.categorySales.ai_subscription / analytics.totalRevenue) * 100 : 40}%` 
                    }}
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  {analytics.categoryOrdersCount.ai_subscription} Orders completed
                </span>
              </div>

              {/* Graphic Design */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                    <Palette className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Graphic Design & Branding</span>
                  </div>
                  <span className="font-mono font-bold text-white">
                    {formatPrice(analytics.categorySales.graphic_design, currency)}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ 
                      width: `${analytics.totalRevenue > 0 ? (analytics.categorySales.graphic_design / analytics.totalRevenue) * 100 : 35}%` 
                    }}
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  {analytics.categoryOrdersCount.graphic_design} Orders completed
                </span>
              </div>

              {/* Social Media Growth */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                    <Share2 className="w-3.5 h-3.5 text-pink-400" />
                    <span>Social Media Growth</span>
                  </div>
                  <span className="font-mono font-bold text-white">
                    {formatPrice(analytics.categorySales.social, currency)}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-pink-500 rounded-full"
                    style={{ 
                      width: `${analytics.totalRevenue > 0 ? (analytics.categorySales.social / analytics.totalRevenue) * 100 : 25}%` 
                    }}
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  {analytics.categoryOrdersCount.social} Orders completed
                </span>
              </div>

            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Automated payment sync</span>
            <span className="text-emerald-400 font-bold">100% Reconciled</span>
          </div>
        </div>

        {/* Top Selling Services List */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h4 className="text-sm font-bold text-white">Top Revenue Generating Services</h4>
            <button 
              onClick={() => onNavigateTab('services')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Manage Catalog →
            </button>
          </div>

          <div className="space-y-3 mt-4">
            {analytics.topServices.length > 0 ? (
              analytics.topServices.map((item, idx) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-mono font-bold flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <div>
                      <h5 className="text-xs font-bold text-white line-clamp-1">{item.title}</h5>
                      <span className="text-[11px] text-slate-500">{item.count} orders booked</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-black text-emerald-400 block">
                      {formatPrice(item.revenue, currency)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Gross Sales</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 py-6 text-center">No sales recorded yet.</p>
            )}
          </div>
        </div>

      </div>

      {/* Recent Orders Table */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h4 className="text-sm font-bold text-white">Recent Customer Orders</h4>
            <p className="text-xs text-slate-400">Click any order to update status or deliver credentials in real-time</p>
          </div>

          <button
            onClick={() => onNavigateTab('orders')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            View All ({orders.length})
          </button>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 pb-2">
                <th className="pb-2 font-semibold">Order ID</th>
                <th className="pb-2 font-semibold">Customer</th>
                <th className="pb-2 font-semibold">Service & Tier</th>
                <th className="pb-2 font-semibold">Amount</th>
                <th className="pb-2 font-semibold">Status</th>
                <th className="pb-2 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {orders.slice(0, 5).map((order) => {
                const getStatusBadge = (status: string) => {
                  switch (status) {
                    case 'completed': return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
                    case 'in_progress': return 'bg-purple-500/10 text-purple-300 border-purple-500/30';
                    case 'processing': return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30';
                    case 'cancelled': return 'bg-rose-500/10 text-rose-300 border-rose-500/30';
                    default: return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
                  }
                };

                return (
                  <tr key={order.id} className="hover:bg-slate-950/40 transition-colors">
                    <td className="py-3 font-mono font-bold text-indigo-300">{order.id}</td>
                    <td className="py-3">
                      <div className="font-semibold text-white">{order.customerName}</div>
                      <div className="text-[10px] text-slate-500">{order.customerEmail}</div>
                    </td>
                    <td className="py-3">
                      <div className="font-medium text-slate-200 line-clamp-1">{order.serviceTitle}</div>
                      <div className="text-[10px] text-slate-400">{order.tierSelected.name}</div>
                    </td>
                    <td className="py-3 font-mono font-bold text-white">
                      {formatPrice(order.totalAmount, currency)}
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(order.orderStatus)}`}>
                        {order.orderStatus.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => onOpenOrderModal(order.id)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-300 text-[11px] font-semibold transition-colors"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
