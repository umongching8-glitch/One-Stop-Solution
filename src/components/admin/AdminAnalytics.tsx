import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/currency';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  DollarSign, 
  ShoppingBag, 
  CheckCircle2, 
  Download, 
  Calendar, 
  Zap, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck
} from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const { analytics, orders, services, currency } = useApp();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('30d');

  // Simulated daily sales points based on orders
  const dailyData = [
    { day: 'Mon', revenue: 145, orders: 4 },
    { day: 'Tue', revenue: 210, orders: 7 },
    { day: 'Wed', revenue: 380, orders: 11 },
    { day: 'Thu', revenue: 290, orders: 8 },
    { day: 'Fri', revenue: 520, orders: 15 },
    { day: 'Sat', revenue: 640, orders: 18 },
    { day: 'Sun', revenue: 490, orders: 14 }
  ];

  const maxRevenue = Math.max(...dailyData.map(d => d.revenue));

  // Payment gateway distribution
  const paymentBreakdown = orders.reduce((acc, curr) => {
    acc[curr.paymentMethod] = (acc[curr.paymentMethod] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white">Sales Performance & Analytics Reports</h3>
          <p className="text-xs text-slate-400">
            Real-time telemetry, revenue velocity, category conversion, and order fulfillment metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            {(['7d', '30d', 'all'] as const).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg font-semibold uppercase text-[11px] transition-colors ${
                  timeRange === range
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Gross Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-black text-white">
            {formatPrice(analytics.totalRevenue, currency)}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+24.6% vs previous cycle</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Fulfilled Orders</span>
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-2 text-2xl font-black text-white">
            {analytics.completedOrders} / {analytics.totalOrders}
          </div>
          <div className="mt-1 text-xs text-indigo-300 font-semibold">
            {analytics.totalOrders > 0 
              ? `${Math.round((analytics.completedOrders / analytics.totalOrders) * 100)}% Fulfillment Rate` 
              : '100%'}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Average Order Value</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2 text-2xl font-black text-white">
            {formatPrice(analytics.averageOrderValue, currency)}
          </div>
          <div className="mt-1 text-xs text-purple-300 font-semibold">
            Optimized multi-tier packaging
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Storefront Conversion</span>
            <Users className="w-4 h-4 text-pink-400" />
          </div>
          <div className="mt-2 text-2xl font-black text-white">
            3.84%
          </div>
          <div className="mt-1 text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+0.6% above benchmark</span>
          </div>
        </div>

      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales Trend Bar Chart */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h4 className="text-sm font-bold text-white">Daily Revenue Velocity</h4>
              <p className="text-xs text-slate-400">Weekly progression of automated transactions</p>
            </div>
            <div className="text-xs font-mono font-bold text-emerald-400">
              Peak: ${maxRevenue}
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-56 mt-6 flex items-end justify-between gap-3 px-2">
            {dailyData.map((item, index) => {
              const heightPercent = Math.max(15, (item.revenue / maxRevenue) * 100);
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono font-bold text-indigo-300 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                    ${item.revenue}
                  </div>
                  
                  <div className="w-full bg-slate-950 rounded-xl p-1 h-44 flex items-end justify-center">
                    <div 
                      className="w-full rounded-lg bg-gradient-to-t from-indigo-600 via-purple-600 to-pink-500 group-hover:from-indigo-500 group-hover:to-pink-400 transition-all duration-300 shadow-md shadow-indigo-600/20"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>

                  <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment Gateway Distribution & Security */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white">Payment Method Adoption</h4>
              <p className="text-xs text-slate-400">Customer checkout preferences</p>
            </div>

            <div className="space-y-4 mt-5">
              {[
                { name: 'Credit Card (Stripe)', id: 'credit_card', color: 'bg-indigo-500', share: 45 },
                { name: 'Crypto USDT (TRC20)', id: 'crypto_usdt', color: 'bg-amber-500', share: 30 },
                { name: 'PayPal Express', id: 'paypal', color: 'bg-blue-500', share: 15 },
                { name: 'Mobile Banking (bKash/Nagad)', id: 'bkash_nagad', color: 'bg-pink-500', share: 10 }
              ].map(gw => (
                <div key={gw.id} className="text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-300 font-medium">{gw.name}</span>
                    <span className="font-mono font-bold text-white">{gw.share}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div 
                      className={`h-full ${gw.color} rounded-full`}
                      style={{ width: `${gw.share}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              Automated Fraud Shield Active
            </span>
            <span className="font-mono text-slate-500">TLS 1.3</span>
          </div>
        </div>

      </div>

      {/* Category Performance Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">Social Media Growth</span>
            <span className="text-xs font-mono font-bold text-white">{analytics.categoryOrdersCount.social} Orders</span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-lg font-black text-white">
              {formatPrice(analytics.categorySales.social, currency)}
            </span>
            <span className="text-[11px] text-slate-400">Drip-feed automated</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Instagram, TikTok, YouTube & Facebook top channels</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">AI Subscriptions</span>
            <span className="text-xs font-mono font-bold text-white">{analytics.categoryOrdersCount.ai_subscription} Orders</span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-lg font-black text-white">
              {formatPrice(analytics.categorySales.ai_subscription, currency)}
            </span>
            <span className="text-[11px] text-slate-400">Instant dispatch</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">ChatGPT Plus, Gemini Pro, Grok & ElevenLabs</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Graphic Design</span>
            <span className="text-xs font-mono font-bold text-white">{analytics.categoryOrdersCount.graphic_design} Orders</span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-lg font-black text-white">
              {formatPrice(analytics.categorySales.graphic_design, currency)}
            </span>
            <span className="text-[11px] text-slate-400">Agency vectors</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Logos, Flyers, Business Cards & Social Kits</p>
        </div>

      </div>

    </div>
  );
};
