import React, { useState, useEffect } from 'react';
import { Order } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/currency';
import { 
  CheckCircle2, 
  Loader2, 
  ShieldCheck, 
  ArrowRight, 
  Copy, 
  ExternalLink, 
  Zap, 
  Check,
  Compass
} from 'lucide-react';

interface PaymentProcessingModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentProcessingModal: React.FC<PaymentProcessingModalProps> = ({ order, isOpen, onClose }) => {
  const { currency, openTrackingModal, setIsAdminView, setAdminTab } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    if (!isOpen || !order) {
      setCurrentStep(1);
      return;
    }

    // Simulate 3-stage automated verification
    const timer1 = setTimeout(() => setCurrentStep(2), 900);
    const timer2 = setTimeout(() => setCurrentStep(3), 2000);
    const timer3 = setTimeout(() => setCurrentStep(4), 3100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isOpen, order]);

  if (!isOpen || !order) return null;

  const isCompleted = currentStep >= 4;

  const handleCopyId = () => {
    navigator.clipboard.writeText(order.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleTrackNow = () => {
    onClose();
    openTrackingModal(order.id);
  };

  const handleViewInAdmin = () => {
    onClose();
    setIsAdminView(true);
    setAdminTab('orders');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 text-center overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        {!isCompleted ? (
          <div className="py-6 space-y-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-white">Automated Payment Processing</h3>
              <p className="text-xs text-slate-400">
                Securing end-to-end encrypted connection with payment provider...
              </p>
            </div>

            {/* Stepper items */}
            <div className="space-y-2.5 max-w-xs mx-auto text-left text-xs">
              <div className="flex items-center gap-2.5">
                {currentStep > 1 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Loader2 className="w-4 h-4 text-indigo-400 animate-spin shrink-0" />
                )}
                <span className={currentStep >= 1 ? 'text-white font-medium' : 'text-slate-500'}>
                  1. Encrypted gateway handshake
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                {currentStep > 2 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : currentStep === 2 ? (
                  <Loader2 className="w-4 h-4 text-indigo-400 animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                )}
                <span className={currentStep >= 2 ? 'text-white font-medium' : 'text-slate-500'}>
                  2. Ledger transaction confirmation
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                {currentStep > 3 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : currentStep === 3 ? (
                  <Loader2 className="w-4 h-4 text-indigo-400 animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                )}
                <span className={currentStep >= 3 ? 'text-white font-medium' : 'text-slate-500'}>
                  3. Automated order creation & queue dispatch
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-2 space-y-5 animate-in zoom-in-95 duration-300">
            {/* Success icon */}
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/10">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 inline-block">
                PAYMENT SUCCESSFUL
              </span>
              <h3 className="text-2xl font-black text-white">Order Confirmed!</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Your order is now in our automated queue. You can track its live progress anytime.
              </p>
            </div>

            {/* Order Card Receipt */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs text-slate-400">Order ID:</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono font-bold text-indigo-300">{order.id}</span>
                  <button
                    onClick={handleCopyId}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    title="Copy Order ID"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Service:</span>
                <span className="text-slate-200 font-semibold truncate max-w-[200px]">{order.serviceTitle}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Tier Selected:</span>
                <span className="text-slate-300">{order.tierSelected.name}</span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800 font-bold">
                <span className="text-white">Amount Paid:</span>
                <span className="text-indigo-400 text-sm font-mono">{formatPrice(order.totalAmount, currency)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleTrackNow}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all"
              >
                <Compass className="w-4 h-4 animate-spin-slow" />
                <span>Track Live Progress</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                >
                  Continue Shopping
                </button>

                <button
                  type="button"
                  onClick={handleViewInAdmin}
                  className="py-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Admin View</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
