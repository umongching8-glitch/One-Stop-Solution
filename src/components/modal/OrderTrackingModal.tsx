import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';
import { formatPrice } from '../../utils/currency';
import { 
  X, 
  Search, 
  Compass, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Copy, 
  Check, 
  RotateCcw, 
  Download, 
  ExternalLink, 
  ShieldCheck,
  Send
} from 'lucide-react';

export const OrderTrackingModal: React.FC = () => {
  const { 
    isTrackingModalOpen, 
    closeTrackingModal, 
    trackingOrderId, 
    orders, 
    currency 
  } = useApp();

  const [searchId, setSearchId] = useState(trackingOrderId || '');
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    trackingOrderId || orders[0]?.id || ''
  );
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [refillRequested, setRefillRequested] = useState(false);

  if (!isTrackingModalOpen) return null;

  // Find target order
  const activeOrder = orders.find(
    o => o.id.toUpperCase() === (searchId.trim().toUpperCase() || selectedOrderId.toUpperCase())
  ) || orders.find(o => o.id === selectedOrderId) || orders[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      const found = orders.find(o => o.id.toUpperCase() === searchId.trim().toUpperCase());
      if (found) {
        setSelectedOrderId(found.id);
      }
    }
  };

  const getStatusProgress = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return { percent: 25, label: 'Payment Verified', color: 'from-amber-500 to-amber-400' };
      case 'processing': return { percent: 50, label: 'In Automated Queue', color: 'from-indigo-500 to-purple-500' };
      case 'in_progress': return { percent: 75, label: 'Active Delivery / Drafting', color: 'from-purple-500 to-pink-500' };
      case 'completed': return { percent: 100, label: 'Completed & Delivered', color: 'from-emerald-500 to-teal-400' };
      case 'cancelled': return { percent: 100, label: 'Cancelled / Refunded', color: 'from-rose-500 to-red-600' };
      default: return { percent: 10, label: 'Order Received', color: 'from-slate-500 to-slate-400' };
    }
  };

  const currentProgress = activeOrder ? getStatusProgress(activeOrder.orderStatus) : null;

  const handleCopyCredentials = () => {
    if (activeOrder?.deliveryPayload?.credentialsOrLinks) {
      navigator.clipboard.writeText(activeOrder.deliveryPayload.credentialsOrLinks);
      setCopiedPayload(true);
      setTimeout(() => setCopiedPayload(false), 2000);
    }
  };

  const handleRefillRequest = () => {
    setRefillRequested(true);
    setTimeout(() => setRefillRequested(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Live Order Tracking Portal</h3>
              <p className="text-xs text-slate-400">Real-time status updates & automated fulfillment</p>
            </div>
          </div>
          
          <button
            onClick={closeTrackingModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="my-4 shrink-0">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Order ID (e.g. OSS-94102, OSS-94103)..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono uppercase"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shrink-0"
            >
              Search
            </button>
          </form>

          {/* Quick chip selector of recent user orders */}
          <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1 text-[11px] text-slate-400">
            <span className="shrink-0 text-slate-500">Recent Orders:</span>
            {orders.slice(0, 4).map(o => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setSearchId(o.id);
                  setSelectedOrderId(o.id);
                }}
                className={`px-2 py-0.5 rounded font-mono transition-colors shrink-0 ${
                  activeOrder?.id === o.id
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800'
                }`}
              >
                {o.id}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        {activeOrder ? (
          <div className="space-y-4 overflow-y-auto pr-1 flex-1">
            
            {/* Overview Card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex flex-wrap items-start justify-between gap-2 pb-3 border-b border-slate-800/80">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black font-mono text-indigo-400">{activeOrder.id}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {activeOrder.subCategory}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mt-1">
                    {activeOrder.serviceTitle}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Package: <span className="text-slate-200 font-medium">{activeOrder.tierSelected.name} ({activeOrder.tierSelected.amountOrDuration})</span>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Total Paid:</span>
                  <span className="text-lg font-black text-white">
                    {formatPrice(activeOrder.totalAmount, currency)}
                  </span>
                  <span className="text-[10px] text-slate-500 block font-mono">
                    {activeOrder.paymentMethod.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Current Stage: {currentProgress?.label}
                  </span>
                  <span className="font-mono text-indigo-300 font-bold">
                    {currentProgress?.percent}%
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${currentProgress?.color} transition-all duration-700`}
                    style={{ width: `${currentProgress?.percent}%` }}
                  />
                </div>
              </div>

              {/* Target / Brief Display */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs">
                <span className="text-slate-400 font-semibold block mb-1">Target Account / Design Brief:</span>
                <p className="font-mono text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800 break-all leading-relaxed">
                  {activeOrder.targetUrlOrBrief}
                </p>
              </div>
            </div>

            {/* Delivery Credentials / Assets Section (If Completed or Has Payload) */}
            {activeOrder.deliveryPayload && (
              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/40 via-slate-950 to-purple-950/30 border border-indigo-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Delivery Fulfillment & Access Payload
                  </span>
                  {activeOrder.deliveryPayload.deliveryDate && (
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(activeOrder.deliveryPayload.deliveryDate).toLocaleString()}
                    </span>
                  )}
                </div>

                {activeOrder.deliveryPayload.credentialsOrLinks && (
                  <div className="relative">
                    <div className="text-xs text-slate-400 mb-1 font-semibold">
                      Account Credentials / Access URL:
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 break-all pr-10">
                      {activeOrder.deliveryPayload.credentialsOrLinks}
                    </div>
                    <button
                      onClick={handleCopyCredentials}
                      className="absolute right-2 bottom-2 p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Copy credentials"
                    >
                      {copiedPayload ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}

                {activeOrder.deliveryPayload.notes && (
                  <p className="text-xs text-slate-400 italic">
                    Note: {activeOrder.deliveryPayload.notes}
                  </p>
                )}
              </div>
            )}

            {/* Live Timestamped Activity Log */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Real-Time Event Logs:
              </h5>

              <div className="space-y-3 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                {activeOrder.statusUpdates.map((log, index) => (
                  <div key={index} className="relative pl-6 text-xs">
                    <span className="absolute left-0 top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-indigo-500 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{log.title}</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-slate-400 mt-0.5 leading-relaxed">{log.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 30-Day Refill & Support Helper */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">
                  30-Day Drop Protection & Warranty active for this order.
                </span>
              </div>
              
              <button
                type="button"
                onClick={handleRefillRequest}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-colors shrink-0"
              >
                {refillRequested ? '✓ Request Submitted' : 'Request Refill / Priority Help'}
              </button>
            </div>

          </div>
        ) : (
          <div className="p-8 text-center text-slate-400">
            <AlertCircle className="w-10 h-10 mx-auto text-slate-500 mb-2" />
            <p className="text-sm">No order found matching "{searchId}".</p>
          </div>
        )}

      </div>
    </div>
  );
};
