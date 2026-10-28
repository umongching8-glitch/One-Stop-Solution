import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  X, 
  Palette, 
  Check, 
  Copy, 
  Wand2, 
  FileText 
} from 'lucide-react';

interface SmartBriefAssistantModalProps {
  onInsertBrief: (briefText: string) => void;
}

export const SmartBriefAssistantModal: React.FC<SmartBriefAssistantModalProps> = ({ onInsertBrief }) => {
  const { isSmartBriefModalOpen, setIsSmartBriefModalOpen } = useApp();

  const [brandName, setBrandName] = useState('');
  const [industry, setIndustry] = useState('Technology & SaaS');
  const [designStyle, setDesignStyle] = useState('Minimalist & Clean');
  const [colorVibe, setColorVibe] = useState('Cyber Dark (Obsidian + Neon Cyan)');
  const [requiredAssets, setRequiredAssets] = useState<string[]>(['Vector Source (SVG/AI)', 'Transparent PNG']);
  const [keyMessage, setKeyMessage] = useState('');
  const [generatedBrief, setGeneratedBrief] = useState('');

  if (!isSmartBriefModalOpen) return null;

  const industries = [
    'Technology & SaaS',
    'AI & Automation',
    'E-commerce & Fashion',
    'Finance & Crypto/Web3',
    'Health & Wellness',
    'Creator & Entertainment',
    'Restaurant & Food'
  ];

  const styles = [
    'Minimalist & Clean',
    'Futuristic & Cyberpunk',
    'Luxury & Elegant',
    'Bold & High Contrast',
    'Playful & Friendly',
    'Corporate & Professional'
  ];

  const colorPalettes = [
    'Cyber Dark (Obsidian + Neon Cyan)',
    'Luxury Gold & Matte Black',
    'Electric Violet & Deep Indigo',
    'Emerald Green & Clean Slate',
    'Vibrant Sunset (Coral + Purple)',
    'Monochrome Minimalist'
  ];

  const assetOptions = [
    'Vector Source (SVG/AI)',
    'Transparent PNG',
    '3D Mockup Render',
    'Print-Ready 300 DPI CMYK',
    'Social Media Banner Sizing'
  ];

  const toggleAsset = (asset: string) => {
    if (requiredAssets.includes(asset)) {
      setRequiredAssets(requiredAssets.filter(a => a !== asset));
    } else {
      setRequiredAssets([...requiredAssets, asset]);
    }
  };

  const handleGenerate = () => {
    const brief = `PROJECT BRIEF: ${brandName || 'Modern Brand Initiative'}
• Industry / Niche: ${industry}
• Aesthetic Style: ${designStyle}
• Preferred Palette: ${colorVibe}
• Deliverables Needed: ${requiredAssets.join(', ')}
${keyMessage ? `• Core Concept / Message: "${keyMessage}"` : ''}
• Requirements: Crisp vector precision, high contrast readability across mobile & desktop screens, professional typography.`;

    setGeneratedBrief(brief);
  };

  const handleApply = () => {
    if (generatedBrief) {
      onInsertBrief(generatedBrief);
      setIsSmartBriefModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 overflow-hidden">
        
        {/* Glow header */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Smart Brief Creator</h3>
              <p className="text-xs text-slate-400">Generate a comprehensive design brief in seconds</p>
            </div>
          </div>
          <button
            onClick={() => setIsSmartBriefModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4 my-4 max-h-[60vh] overflow-y-auto pr-1">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Brand / Project Name:
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="e.g., NovaWave AI, Horizon Fitness, CyberVibe"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Industry:
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                {industries.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Visual Style:
              </label>
              <select
                value={designStyle}
                onChange={(e) => setDesignStyle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                {styles.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Color Palette:
            </label>
            <select
              value={colorVibe}
              onChange={(e) => setColorVibe(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              {colorPalettes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Deliverables & Formats Needed:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {assetOptions.map(asset => {
                const isSelected = requiredAssets.includes(asset);
                return (
                  <button
                    key={asset}
                    type="button"
                    onClick={() => toggleAsset(asset)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-purple-600/30 border-purple-500 text-purple-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                    {asset}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Key Message / Specific Details (Optional):
            </label>
            <textarea
              rows={2}
              value={keyMessage}
              onChange={(e) => setKeyMessage(e.target.value)}
              placeholder="e.g., Must have a geometric falcon icon, clean sans-serif typography, no gradients."
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
            />
          </div>

          {generatedBrief && (
            <div className="p-3 rounded-xl bg-slate-950 border border-purple-500/40 mt-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-purple-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Generated Polished Brief:
                </span>
              </div>
              <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto">
                {generatedBrief}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={handleGenerate}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Generate Brief</span>
          </button>
          
          <button
            type="button"
            disabled={!generatedBrief}
            onClick={handleApply}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
          >
            <span>Apply to Order</span>
            <Check className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
