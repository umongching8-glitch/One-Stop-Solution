import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  ShieldCheck, 
  Clock, 
  RotateCcw, 
  Lock 
} from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How fast is service delivery after payment?',
      a: 'AI Platform subscriptions (Gemini Pro, ChatGPT Pro, Grok, ElevenLabs) are automated and delivered instantly within 1 to 5 minutes to your email and displayed on your screen. Social media follower and engagement packages begin within 5 to 15 minutes with safe, organic drip-feeding. Custom graphic design concepts are delivered in 12 to 48 hours depending on your chosen tier.'
    },
    {
      q: 'Are the AI subscriptions official and private?',
      a: 'Yes, we provide official subscriptions with dedicated private credentials or direct official workspace email invitations. Your accounts are 100% private with full warranty replacement throughout the entire duration of your plan.'
    },
    {
      q: 'Will my social media account get banned or flagged?',
      a: 'Never. We never ask for your passwords—only your public profile link or post URL. Our delivery algorithms emulate natural human engagement pacing (drip-feed) and strictly adhere to platform safety guidelines.'
    },
    {
      q: 'What is the 30-Day Free Refill Guarantee?',
      a: 'If any followers, likes, or engagement experience natural platform drops within 30 days of purchase, our automated refill system immediately replenishes your account for free. You can request refills via your live order tracking portal with 1 click.'
    },
    {
      q: 'What payment methods do you support?',
      a: 'We support all major Credit/Debit Cards via Stripe, Cryptocurrency (USDT TRC20/ERC20 with instant blockchain verification), PayPal, and mobile banking payment gateways.'
    },
    {
      q: 'Can I request revisions for Graphic Design orders?',
      a: 'Yes! All graphic design packages (Logos, Flyers, Business Cards, Social Kits) include concept drafts and unlimited fine-tuning revisions until you are completely satisfied. Vector source files (AI, EPS, SVG, PNG) are provided.'
    }
  ];

  return (
    <div className="py-16 border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Everything You Need to Know
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Transparent policies, instant delivery guarantees, and secure protocols.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl bg-slate-900/60 border border-slate-800/80 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-sm text-white hover:text-indigo-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-400' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/40 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
