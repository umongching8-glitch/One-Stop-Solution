import React, { useState } from 'react';
import { ServiceItem, ServiceTier } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/currency';
import { 
  Star, 
  Clock, 
  Check, 
  Zap, 
  ArrowRight, 
  Instagram, 
  Youtube, 
  Twitter, 
  Facebook, 
  Video, 
  Bot, 
  Sparkles, 
  Mic, 
  Cpu, 
  Palette, 
  Layers, 
  FileText, 
  CreditCard,
  ShieldCheck
} from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { currency, openOrderModal } = useApp();
  
  // Local tier selection on the card
  const [selectedTierId, setSelectedTierId] = useState<string>(
    service.tierOptions.find(t => t.popular)?.id || service.tierOptions[0]?.id || ''
  );

  const selectedTier = service.tierOptions.find(t => t.id === selectedTierId) || service.tierOptions[0];

  // Helper to render icons
  const renderIcon = (iconName: string) => {
    const props = { className: "w-5 h-5" };
    switch (iconName.toLowerCase()) {
      case 'instagram': return <Instagram {...props} className="w-5 h-5 text-pink-400" />;
      case 'heart': return <Zap {...props} className="w-5 h-5 text-rose-400" />;
      case 'youtube': return <Youtube {...props} className="w-5 h-5 text-red-500" />;
      case 'twitter': return <Twitter {...props} className="w-5 h-5 text-sky-400" />;
      case 'facebook': return <Facebook {...props} className="w-5 h-5 text-blue-500" />;
      case 'video': return <Video {...props} className="w-5 h-5 text-pink-400" />;
      case 'bot': return <Bot {...props} className="w-5 h-5 text-indigo-400" />;
      case 'sparkles': return <Sparkles {...props} className="w-5 h-5 text-purple-400" />;
      case 'mic': return <Mic {...props} className="w-5 h-5 text-emerald-400" />;
      case 'cpu': return <Cpu {...props} className="w-5 h-5 text-cyan-400" />;
      case 'palette': return <Palette {...props} className="w-5 h-5 text-amber-400" />;
      case 'layers': return <Layers {...props} className="w-5 h-5 text-teal-400" />;
      case 'filetext': return <FileText {...props} className="w-5 h-5 text-violet-400" />;
      case 'creditcard': return <CreditCard {...props} className="w-5 h-5 text-amber-400" />;
      default: return <Sparkles {...props} className="w-5 h-5 text-indigo-400" />;
    }
  };

  // Badge styling
  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'Bestseller': return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      case 'Hot': return 'bg-rose-500/10 text-rose-300 border-rose-500/30';
      case 'Verified': return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      case 'Instant Delivery': return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'social': return 'hover:border-pink-500/40 focus-within:border-pink-500/40';
      case 'ai_subscription': return 'hover:border-indigo-500/40 focus-within:border-indigo-500/40';
      case 'graphic_design': return 'hover:border-emerald-500/40 focus-within:border-emerald-500/40';
      default: return 'hover:border-slate-700';
    }
  };

  return (
    <div className={`flex flex-col justify-between rounded-2xl bg-slate-900/70 border border-slate-800/90 p-5 transition-all duration-300 ${getCategoryColor(service.category)} hover:shadow-2xl hover:shadow-indigo-500/5 group relative`}>
      
      {/* Top Header: Icon, SubCategory & Badge */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 shadow-sm">
              {renderIcon(service.icon)}
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                {service.subCategory}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="flex items-center text-amber-400 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                  <span className="font-bold ml-1 text-slate-200">{service.rating}</span>
                </div>
                <span className="text-slate-500 text-xs">({service.reviewCount})</span>
              </div>
            </div>
          </div>

          {service.badge && (
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md border ${getBadgeStyle(service.badge)}`}>
              {service.badge}
            </span>
          )}
        </div>

        {/* Title & Short Description */}
        <h3 className="text-base font-bold text-white group-hover:text-indigo-200 transition-colors line-clamp-2 leading-snug">
          {service.title}
        </h3>
        
        <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
          {service.shortDescription}
        </p>

        {/* Delivery Time & Stock Pill */}
        <div className="flex items-center gap-2 mt-3 text-[11px] text-slate-400 font-medium">
          <span className="flex items-center gap-1 text-indigo-300">
            <Clock className="w-3 h-3 text-indigo-400" />
            {service.deliveryTimeEstimate}
          </span>
          <span>•</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            Verified Source
          </span>
        </div>

        {/* Tier Selector Chips */}
        {service.tierOptions.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-2">
              Select Package Tier:
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {service.tierOptions.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`text-left p-2 rounded-xl border text-xs transition-all relative ${
                    selectedTierId === tier.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="truncate text-[11px] font-medium leading-tight">
                    {tier.name}
                  </div>
                  <div className="text-[11px] text-indigo-400 font-bold mt-0.5">
                    {formatPrice(tier.price, currency)}
                  </div>
                  {tier.popular && (
                    <span className="absolute -top-1.5 -right-1 text-[8px] bg-pink-500 text-white font-bold px-1 rounded-sm">
                      HOT
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Key Features Bullet List */}
        <ul className="mt-4 space-y-1.5 text-xs text-slate-400">
          {service.features.slice(0, 3).map((feat, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Card Footer: Price & CTA */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase font-semibold text-slate-400">
            {selectedTier ? selectedTier.amountOrDuration : 'Starting from'}
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-extrabold text-white">
              {formatPrice(selectedTier ? selectedTier.price : service.tierOptions[0]?.price || 0, currency)}
            </span>
            {selectedTier?.originalPrice && (
              <span className="text-xs text-slate-500 line-through">
                {formatPrice(selectedTier.originalPrice, currency)}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => openOrderModal(service)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold tracking-wide shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-all flex items-center gap-1.5 shrink-0"
        >
          <span>Configure & Order</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

    </div>
  );
};
