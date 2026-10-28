import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceItem, ServiceTier, PaymentMethod, Order } from '../../types';
import { formatPrice } from '../../utils/currency';
import { 
  X, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Coins, 
  Wand2, 
  Clock, 
  AlertCircle,
  Tag
} from 'lucide-react';
import { PaymentProcessingModal } from './PaymentProcessingModal';

export const OrderModal: React.FC = () => {
  const { 
    selectedServiceForOrder, 
    isOrderModalOpen, 
    closeOrderModal, 
    currency, 
    promoCodes, 
    createOrder,
    setIsSmartBriefModalOpen 
  } = useApp();

  // Selected tier
  const [selectedTier, setSelectedTier] = useState<ServiceTier | null>(null);
  
  // Inputs
  const [targetInput, setTargetInput] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  
  // Promo code
  const [promoInput, setPromoInput] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoFeedback, setPromoFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');

  // Completed order for the payment simulation modal
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);

  // Validation errors
  const [errorMsg, setErrorMsg] = useState('');

  // Sync state when service is selected
  useEffect(() => {
    if (selectedServiceForOrder) {
      const defaultTier = selectedServiceForOrder.tierOptions.find(t => t.popular) || selectedServiceForOrder.tierOptions[0];
      setSelectedTier(defaultTier || null);
      setTargetInput('');
      setDiscountAmount(0);
      setPromoInput('');
      setPromoFeedback(null);
      setErrorMsg('');
    }
  }, [selectedServiceForOrder]);

  if (!isOrderModalOpen || !selectedServiceForOrder || !selectedTier) return null;

  const rawPrice = selectedTier.price;
  const finalPrice = Math.max(0, rawPrice - discountAmount);

  const handleApplyPromo = () => {
    setPromoFeedback(null);
    const cleanCode = promoInput.trim().toUpperCase();
    if (!cleanCode) return;

    const promo = promoCodes.find(p => p.code.toUpperCase() === cleanCode && p.isActive);
    if (!promo) {
      setPromoFeedback({ message: 'Invalid or expired promo code', type: 'error' });
      setDiscountAmount(0);
      return;
    }

    if (promo.minOrder && rawPrice < promo.minOrder) {
      setPromoFeedback({ message: `Requires minimum order of $${promo.minOrder}`, type: 'error' });
      setDiscountAmount(0);
      return;
    }

    let calculatedDiscount = 0;
    if (promo.discountType === 'percentage') {
      calculatedDiscount = (rawPrice * promo.discountValue) / 100;
    } else {
      calculatedDiscount = promo.discountValue;
    }

    setDiscountAmount(calculatedDiscount);
    setPromoFeedback({ message: `Promo applied: Saved $${calculatedDiscount.toFixed(2)}!`, type: 'success' });
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!targetInput.trim()) {
      setErrorMsg(`Please provide your ${selectedServiceForOrder.targetInputLabel}`);
      return;
    }

    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setErrorMsg('Please enter a valid customer email address.');
      return;
    }

    if (!customerName.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }

    // Generate random 5-digit order ID
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `OSS-${randomNum}`;
    const txnId = `TXN-${paymentMethod.toUpperCase()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      customerPhone: customerPhone.trim() || undefined,
      serviceId: selectedServiceForOrder.id,
      serviceTitle: selectedServiceForOrder.title,
      category: selectedServiceForOrder.category,
      subCategory: selectedServiceForOrder.subCategory,
      tierSelected: selectedTier,
      targetUrlOrBrief: targetInput.trim(),
      additionalNotes: additionalNotes.trim() || undefined,
      totalAmount: parseFloat(finalPrice.toFixed(2)),
      discountApplied: parseFloat(discountAmount.toFixed(2)),
      currency: currency,
      paymentMethod: paymentMethod,
      paymentStatus: 'paid',
      orderStatus: 'pending',
      transactionId: txnId,
      statusUpdates: [
        {
          timestamp: new Date().toISOString(),
          title: 'Order Placed & Automated Payment Verified',
          note: `Payment via ${paymentMethod.replace('_', ' ').toUpperCase()} confirmed. Transaction Ref: ${txnId}`,
          stage: 'pending'
        }
      ]
    };

    createOrder(newOrder);
    setCreatedOrder(newOrder);
    setIsProcessingModalOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
        <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 overflow-hidden max-h-[90vh] flex flex-col">
          
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-slate-800 shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {selectedServiceForOrder.subCategory}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  {selectedServiceForOrder.deliveryTimeEstimate}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                {selectedServiceForOrder.title}
              </h2>
            </div>

            <button
              onClick={closeOrderModal}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Form Body */}
          <form onSubmit={handleCheckoutSubmit} className="space-y-5 my-4 overflow-y-auto pr-1 flex-1">
            
            {/* Step 1: Select Tier / Quantity */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                1. Select Package Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedServiceForOrder.tierOptions.map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => {
                      setSelectedTier(tier);
                      setDiscountAmount(0);
                      setPromoFeedback(null);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                      selectedTier.id === tier.id
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{tier.name}</span>
                        {tier.popular && (
                          <span className="text-[9px] uppercase font-black bg-pink-500 text-white px-1.5 py-0.2 rounded">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{tier.amountOrDuration}</p>
                    </div>
                    
                    <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-baseline justify-between">
                      <span className="text-sm font-black text-indigo-300">
                        {formatPrice(tier.price, currency)}
                      </span>
                      {tier.originalPrice && (
                        <span className="text-[11px] text-slate-500 line-through">
                          {formatPrice(tier.originalPrice, currency)}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Target Input Details */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>2. {selectedServiceForOrder.targetInputLabel}</span>
                  <span className="text-rose-500">*</span>
                </label>

                {/* Assistant Trigger for Graphic Design */}
                {selectedServiceForOrder.category === 'graphic_design' && (
                  <button
                    type="button"
                    onClick={() => setIsSmartBriefModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold transition-colors"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>Smart Brief Creator</span>
                  </button>
                )}
              </div>

              {selectedServiceForOrder.category === 'graphic_design' ? (
                <textarea
                  rows={3}
                  value={targetInput}
                  onChange={(e) => setTargetInput(e.target.value)}
                  placeholder={selectedServiceForOrder.targetInputPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-indigo-500 text-sm text-white placeholder-slate-500 focus:outline-none resize-none"
                  required
                />
              ) : (
                <input
                  type="text"
                  value={targetInput}
                  onChange={(e) => setTargetInput(e.target.value)}
                  placeholder={selectedServiceForOrder.targetInputPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-indigo-500 text-sm text-white placeholder-slate-500 focus:outline-none"
                  required
                />
              )}

              <p className="text-[11px] text-slate-400">
                {selectedServiceForOrder.targetInputHelp}
              </p>
            </div>

            {/* Step 3: Customer Details */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                3. Customer Contact & Delivery Details
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Your Full Name:</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Marcus Vance"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Email (For receipt & delivery credentials):</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="marcus@example.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">WhatsApp / Phone (Optional for instant notifications):</label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Additional Instructions / Notes (Optional):</label>
                  <input
                    type="text"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="e.g. Drip feed slowly, specific fonts, etc."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 4: Promo Code Box */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo Code (e.g. WELCOME10, AI2026, VIP20)"
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white uppercase placeholder:normal-case placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
                >
                  Apply
                </button>
              </div>

              {promoFeedback && (
                <p className={`text-[11px] mt-1.5 font-medium ${promoFeedback.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {promoFeedback.message}
                </p>
              )}
            </div>

            {/* Step 5: Automated Payment Gateway Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                4. Automated Payment Gateway
              </label>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === 'credit_card'
                      ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-indigo-400" />
                  <span className="text-[11px]">Card / Stripe</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('crypto_usdt')}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === 'crypto_usdt'
                      ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span className="text-[11px]">USDT (TRC20)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === 'paypal'
                      ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Lock className="w-4 h-4 text-blue-400" />
                  <span className="text-[11px]">PayPal</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bkash_nagad')}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === 'bkash_nagad'
                      ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  <span className="text-[11px]">bKash / Nagad</span>
                </button>

              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Footer Summary & Submit */}
            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400">Total Due:</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">
                    {formatPrice(finalPrice, currency)}
                  </span>
                  {discountAmount > 0 && (
                    <span className="text-xs text-emerald-400 font-semibold">
                      (Saved {formatPrice(discountAmount, currency)})
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={closeOrderModal}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors w-1/2 sm:w-auto"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 w-1/2 sm:w-auto"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Pay & Start Order</span>
                </button>
              </div>
            </div>

          </form>

        </div>
      </div>

      {/* Trigger automated payment processing simulation modal */}
      <PaymentProcessingModal
        order={createdOrder}
        isOpen={isProcessingModalOpen}
        onClose={() => {
          setIsProcessingModalOpen(false);
          closeOrderModal();
        }}
      />
    </>
  );
};
