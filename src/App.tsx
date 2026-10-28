/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { ServiceFilter } from './components/home/ServiceFilter';
import { ServiceCard } from './components/home/ServiceCard';
import { FaqSection } from './components/home/FaqSection';
import { OrderModal } from './components/modal/OrderModal';
import { OrderTrackingModal } from './components/modal/OrderTrackingModal';
import { SmartBriefAssistantModal } from './components/modal/SmartBriefAssistantModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { 
  SlidersHorizontal, 
  Store, 
  Sparkles, 
  Search, 
  RotateCcw,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock
} from 'lucide-react';

const StorefrontContent: React.FC = () => {
  const { 
    services, 
    isAdminView, 
    setIsAdminView, 
    openOrderModal, 
    orders 
  } = useApp();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // Active services counts
  const counts = {
    all: services.filter(s => s.isActive).length,
    social: services.filter(s => s.isActive && s.category === 'social').length,
    ai_subscription: services.filter(s => s.isActive && s.category === 'ai_subscription').length,
    graphic_design: services.filter(s => s.isActive && s.category === 'graphic_design').length,
  };

  // Filtered & Sorted services
  const filteredServices = services
    .filter(s => {
      if (!s.isActive) return false;
      if (inStockOnly && !s.inStock) return false;
      
      const matchesCategory = activeCategory === 'all' || s.category === activeCategory;
      const matchesSubCategory = !activeSubCategory || 
        activeSubCategory.startsWith('All') || 
        s.subCategory.toLowerCase() === activeSubCategory.toLowerCase();
      
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        s.title.toLowerCase().includes(q) ||
        s.subCategory.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q));

      return matchesCategory && matchesSubCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price_low') {
        const minA = Math.min(...a.tierOptions.map(t => t.price));
        const minB = Math.min(...b.tierOptions.map(t => t.price));
        return minA - minB;
      }
      if (sortBy === 'price_high') {
        const maxA = Math.max(...a.tierOptions.map(t => t.price));
        const maxB = Math.max(...b.tierOptions.map(t => t.price));
        return maxB - maxA;
      }
      // default 'popular' / bestseller first
      const badgeScore = (item: any) => (item.badge === 'Bestseller' ? 3 : item.badge === 'Hot' ? 2 : item.badge === 'Popular' ? 1 : 0);
      return badgeScore(b) - badgeScore(a);
    });

  if (isAdminView) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Top Navbar */}
      <Navbar 
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setActiveSubCategory('All');
        }}
      />

      {/* Hero Section */}
      <Hero 
        onSearch={(query) => setSearchQuery(query)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setActiveSubCategory('All');
        }}
        activeCategory={activeCategory}
      />

      {/* Main Catalog Section */}
      <main id="services-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full scroll-mt-20">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
              <Zap className="w-3.5 h-3.5" />
              Direct Marketplace
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {activeCategory === 'social' && 'Social Media Followers & Real Engagement'}
              {activeCategory === 'ai_subscription' && 'AI Platform Subscriptions & Accounts'}
              {activeCategory === 'graphic_design' && 'AI & Senior Graphic Design Services'}
              {activeCategory === 'all' && 'Featured Digital Services Catalog'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select your tier, configure parameters, and receive automated delivery with 30-day warranty.
            </p>
          </div>

          <span className="text-xs text-slate-400 font-mono">
            Showing <strong className="text-white">{filteredServices.length}</strong> services
          </span>
        </div>

        {/* Filter Toolbar */}
        <ServiceFilter
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setActiveSubCategory('All');
          }}
          activeSubCategory={activeSubCategory}
          onSelectSubCategory={(sub) => setActiveSubCategory(sub)}
          sortBy={sortBy}
          onSortChange={(sort) => setSortBy(sort)}
          inStockOnly={inStockOnly}
          onToggleInStock={(val) => setInStockOnly(val)}
          counts={counts}
        />

        {/* Service Cards Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4 my-8">
            <Search className="w-10 h-10 mx-auto text-slate-500" />
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">No services found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No matching digital services for "{searchQuery}". Try searching for ChatGPT, Followers, Logo, or clear filters.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setActiveSubCategory('All');
                setInStockOnly(false);
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* FAQ Section */}
        <FaqSection />

      </main>

      {/* Professional Footer */}
      <Footer />

      {/* Global Interactive Modals */}
      <OrderModal />
      <OrderTrackingModal />
      <SmartBriefAssistantModal 
        onInsertBrief={(brief) => {
          // Handled via state or context
        }} 
      />

      {/* Floating Quick Admin Toggle Pill */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsAdminView(true)}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/95 hover:bg-slate-900 border border-slate-700 text-slate-200 hover:text-white shadow-2xl shadow-black/80 backdrop-blur-lg text-xs font-bold transition-all hover:scale-105 active:scale-95"
          title="Open Admin Dashboard to edit inventory, pricing, and orders"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
          <SlidersHorizontal className="w-4 h-4 text-indigo-400 group-hover:rotate-45 transition-transform" />
          <span>Admin Dashboard</span>
        </button>
      </div>

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <StorefrontContent />
    </AppProvider>
  );
}
