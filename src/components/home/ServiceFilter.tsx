import React from 'react';
import { ServiceCategory } from '../../types';
import { 
  Sparkles, 
  Share2, 
  Bot, 
  Palette, 
  Filter, 
  Check, 
  ArrowUpDown
} from 'lucide-react';

interface ServiceFilterProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  activeSubCategory: string;
  onSelectSubCategory: (sub: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  inStockOnly: boolean;
  onToggleInStock: (val: boolean) => void;
  counts: {
    all: number;
    social: number;
    ai_subscription: number;
    graphic_design: number;
  };
}

export const ServiceFilter: React.FC<ServiceFilterProps> = ({
  activeCategory,
  onSelectCategory,
  activeSubCategory,
  onSelectSubCategory,
  sortBy,
  onSortChange,
  inStockOnly,
  onToggleInStock,
  counts
}) => {
  // Subcategories mapping
  const subCategoryOptions: Record<string, string[]> = {
    social: ['All Social', 'Instagram', 'YouTube', 'TikTok', 'Facebook', 'X (Twitter)'],
    ai_subscription: ['All AI Tools', 'LLM & Assistants', 'Voice & Audio AI', 'Creative & Image AI', 'Coding & Dev AI'],
    graphic_design: ['All Graphics', 'Logo & Identity', 'Flyers & Posters', 'Business Cards & Stationery', 'Social Media Kits']
  };

  const currentSubList = activeCategory !== 'all' ? subCategoryOptions[activeCategory] || [] : [];

  return (
    <div className="space-y-4 mb-8">
      
      {/* Primary Category Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
        <div className="flex flex-wrap items-center gap-2">
          
          <button
            onClick={() => {
              onSelectCategory('all');
              onSelectSubCategory('All');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>All Services</span>
            <span className="px-1.5 py-0.5 rounded-md bg-black/30 text-[11px] font-mono">
              {counts.all}
            </span>
          </button>

          <button
            onClick={() => {
              onSelectCategory('social');
              onSelectSubCategory('All Social');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === 'social'
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Share2 className="w-4 h-4 text-pink-400" />
            <span>Social Media Growth</span>
            <span className="px-1.5 py-0.5 rounded-md bg-black/30 text-[11px] font-mono">
              {counts.social}
            </span>
          </button>

          <button
            onClick={() => {
              onSelectCategory('ai_subscription');
              onSelectSubCategory('All AI Tools');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === 'ai_subscription'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Bot className="w-4 h-4 text-indigo-400" />
            <span>AI Subscriptions</span>
            <span className="px-1.5 py-0.5 rounded-md bg-black/30 text-[11px] font-mono">
              {counts.ai_subscription}
            </span>
          </button>

          <button
            onClick={() => {
              onSelectCategory('graphic_design');
              onSelectSubCategory('All Graphics');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === 'graphic_design'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Palette className="w-4 h-4 text-emerald-400" />
            <span>Graphic Design</span>
            <span className="px-1.5 py-0.5 rounded-md bg-black/30 text-[11px] font-mono">
              {counts.graphic_design}
            </span>
          </button>

        </div>

        {/* Sort & Filter Controls */}
        <div className="flex items-center gap-3">
          
          {/* In Stock Only Checkbox */}
          <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onToggleInStock(e.target.checked)}
              className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
            />
            <span>Instant Stock</span>
          </label>

          {/* Sort Dropdown */}
          <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 mr-1.5 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer pr-1"
            >
              <option value="popular" className="bg-slate-900 text-white">Most Popular</option>
              <option value="rating" className="bg-slate-900 text-white">Highest Rated</option>
              <option value="price_low" className="bg-slate-900 text-white">Price: Low to High</option>
              <option value="price_high" className="bg-slate-900 text-white">Price: High to Low</option>
            </select>
          </div>

        </div>
      </div>

      {/* Subcategory Pills Row (if category selected) */}
      {currentSubList.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1 animate-in fade-in duration-200">
          <span className="text-xs font-medium text-slate-400 mr-1">Filter by:</span>
          {currentSubList.map((sub) => {
            const isSelected = activeSubCategory === sub || (sub.startsWith('All') && (!activeSubCategory || activeSubCategory.startsWith('All')));
            return (
              <button
                key={sub}
                onClick={() => onSelectSubCategory(sub)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-slate-800 text-white border border-slate-700 font-semibold shadow-sm'
                    : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800/60'
                }`}
              >
                {sub}
              </button>
            );
          })}
        </div>
      )}

    </div>
  );
};
