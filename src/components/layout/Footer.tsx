import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  RotateCcw, 
  Clock, 
  Headphones, 
  Lock, 
  CheckCircle2, 
  Sparkles,
  CreditCard
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 mt-20 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Proposition Badges */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-14 border-b border-slate-800/80">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/60">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Instant Automated Delivery</h4>
              <p className="text-xs text-slate-400 mt-1">AI accounts & social boosts initiate within 1-5 minutes of payment.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/60">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">30-Day Refill Guarantee</h4>
              <p className="text-xs text-slate-400 mt-1">Zero drop guarantee. Automatic refill replenishment or replacement.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/60">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Escrow Secure Checkout</h4>
              <p className="text-xs text-slate-400 mt-1">256-bit SSL encrypted. Stripe, PayPal, USDT Crypto & Mobile Pay.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/60">
            <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400 shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">24/7 Real-Time Support</h4>
              <p className="text-xs text-slate-400 mt-1">Live order tracking and dedicated assistance on all purchases.</p>
            </div>
          </div>
        </div>

        {/* Links & Brand Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12">
          
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">One Stop Solution</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              The premier digital agency for automated social media expansion, verified AI developer platforms, and agency-grade vector graphic design. Scalable, secure, and instant.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                API Gateway: 99.98% Operational
              </span>
              <span>•</span>
              <span>Fast Queue Active</span>
            </div>
          </div>

          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Social Growth</h5>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Instagram Followers & Likes</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">YouTube Monetization & Watchtime</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">TikTok FYP Followers & Saves</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Facebook Page Likes & Reactions</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">X (Twitter) Engagement Packs</li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-3">AI Subscriptions</h5>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Google Gemini Pro / Advanced</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">ChatGPT Plus & Pro (o1 / GPT-4o)</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">ElevenLabs Voice AI & Studio</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Grok Pro / xAI Premium+</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Midjourney v6.1 Fast GPU</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Claude 3.5 Sonnet / Pro</li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Graphic Design</h5>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Minimalist Vector Logo Design</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Print & Digital Commercial Flyers</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Luxury Business Cards & QR</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Social Media Branding Kits</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">Canva Master Templates</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Supported Gateways */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} One Stop Solution. All rights reserved. Cloud-grade security & automated dispatch.</p>
          <div className="flex items-center gap-3 text-slate-500 font-mono text-[11px]">
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">STRIPE</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">USDT (TRC20)</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">PAYPAL</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">BKASH / NAGAD</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
