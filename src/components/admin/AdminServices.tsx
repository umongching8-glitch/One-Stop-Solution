import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceItem, ServiceTier, ServiceCategory, SubCategory } from '../../types';
import { formatPrice } from '../../utils/currency';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Layers, 
  Sparkles, 
  DollarSign, 
  Clock, 
  Eye, 
  EyeOff,
  AlertCircle
} from 'lucide-react';

export const AdminServices: React.FC = () => {
  const { 
    services, 
    addService, 
    updateService, 
    deleteService, 
    toggleServiceActive, 
    currency 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Modal state for Add/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    id: string;
    title: string;
    category: ServiceCategory;
    subCategory: SubCategory;
    shortDescription: string;
    fullDescription: string;
    badge?: 'Bestseller' | 'Instant Delivery' | 'Popular' | 'Hot' | 'Verified' | 'Limited Stock' | 'Trending';
    deliveryTimeEstimate: string;
    targetInputLabel: string;
    targetInputPlaceholder: string;
    targetInputHelp: string;
    featuresText: string;
    tierOptions: ServiceTier[];
  }>({
    id: '',
    title: '',
    category: 'social',
    subCategory: 'Instagram',
    shortDescription: '',
    fullDescription: '',
    badge: 'Popular',
    deliveryTimeEstimate: '15 - 30 Minutes',
    targetInputLabel: 'Profile Link / Username',
    targetInputPlaceholder: 'https://...',
    targetInputHelp: 'Account must be public.',
    featuresText: 'High Quality Accounts\nSafe Drip Feed\n30-Day Refill',
    tierOptions: [
      { id: 'tier-1', name: 'Starter Pack', amountOrDuration: '1,000 Units', price: 9.99, popular: false, stockStatus: 'instant' },
      { id: 'tier-2', name: 'Pro Pack', amountOrDuration: '2,500 Units', price: 19.99, popular: true, stockStatus: 'instant' }
    ]
  });

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesQuery = !searchQuery.trim() || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.subCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleOpenAddModal = () => {
    setEditingServiceId(null);
    setFormData({
      id: `service-${Date.now()}`,
      title: '',
      category: 'social',
      subCategory: 'Instagram',
      shortDescription: '',
      fullDescription: '',
      badge: 'Popular',
      deliveryTimeEstimate: 'Instant (1 - 5 Minutes)',
      targetInputLabel: 'Profile URL or Username',
      targetInputPlaceholder: 'https://...',
      targetInputHelp: 'Ensure target is publicly accessible.',
      featuresText: 'Instant Automated Start\n100% Safe Execution\nFull Warranty',
      tierOptions: [
        { id: `tier-${Date.now()}-1`, name: 'Standard Tier', amountOrDuration: '1,000 Units / 1 Month', price: 14.99, popular: true, stockStatus: 'instant' }
      ]
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (service: ServiceItem) => {
    setEditingServiceId(service.id);
    setFormData({
      id: service.id,
      title: service.title,
      category: service.category,
      subCategory: service.subCategory,
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription,
      badge: service.badge,
      deliveryTimeEstimate: service.deliveryTimeEstimate,
      targetInputLabel: service.targetInputLabel,
      targetInputPlaceholder: service.targetInputPlaceholder,
      targetInputHelp: service.targetInputHelp,
      featuresText: service.features.join('\n'),
      tierOptions: [...service.tierOptions]
    });
    setIsModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const featuresArray = formData.featuresText
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const servicePayload: ServiceItem = {
      id: formData.id || `service-${Date.now()}`,
      title: formData.title.trim(),
      category: formData.category,
      subCategory: formData.subCategory,
      shortDescription: formData.shortDescription.trim(),
      fullDescription: formData.fullDescription.trim() || formData.shortDescription.trim(),
      badge: formData.badge,
      icon: formData.category === 'social' ? 'Instagram' : formData.category === 'ai_subscription' ? 'Bot' : 'Palette',
      rating: 4.9,
      reviewCount: 150,
      features: featuresArray,
      tierOptions: formData.tierOptions,
      targetInputLabel: formData.targetInputLabel.trim(),
      targetInputPlaceholder: formData.targetInputPlaceholder.trim(),
      targetInputHelp: formData.targetInputHelp.trim(),
      deliveryTimeEstimate: formData.deliveryTimeEstimate.trim(),
      isActive: true,
      inStock: true,
      tags: [formData.category, formData.subCategory.toLowerCase()]
    };

    if (editingServiceId) {
      updateService(servicePayload);
    } else {
      addService(servicePayload);
    }

    setIsModalOpen(false);
  };

  // Tier helpers in form
  const handleAddTier = () => {
    const newTier: ServiceTier = {
      id: `tier-${Date.now()}`,
      name: 'Custom Tier',
      amountOrDuration: '1,000 Units',
      price: 19.99,
      popular: false,
      stockStatus: 'instant'
    };
    setFormData(prev => ({
      ...prev,
      tierOptions: [...prev.tierOptions, newTier]
    }));
  };

  const handleUpdateTier = (tierId: string, field: keyof ServiceTier, value: any) => {
    setFormData(prev => ({
      ...prev,
      tierOptions: prev.tierOptions.map(t => t.id === tierId ? { ...t, [field]: value } : t)
    }));
  };

  const handleRemoveTier = (tierId: string) => {
    if (formData.tierOptions.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      tierOptions: prev.tierOptions.filter(t => t.id !== tierId)
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white">Inventory & Pricing Management</h3>
          <p className="text-xs text-slate-400">
            Edit active services, pricing tiers, descriptions, stock availability, and catalog items.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {['all', 'social', 'ai_subscription', 'graphic_design'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Services' : cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search catalog..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Services Grid/Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className={`p-4 rounded-xl bg-slate-900 border transition-all flex flex-col justify-between ${
              service.isActive ? 'border-slate-800' : 'border-slate-800/40 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-950 text-indigo-300 border border-slate-800">
                  {service.subCategory}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => toggleServiceActive(service.id)}
                    className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                    title={service.isActive ? 'Deactivate service' : 'Activate service'}
                  >
                    {service.isActive ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4 text-slate-500" />}
                  </button>

                  <button
                    onClick={() => handleOpenEditModal(service)}
                    className="p-1 rounded text-slate-400 hover:text-indigo-400 transition-colors"
                    title="Edit Service & Tiers"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete "${service.title}"?`)) {
                        deleteService(service.id);
                      }
                    }}
                    className="p-1 rounded text-slate-400 hover:text-rose-400 transition-colors"
                    title="Delete Service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h4 className="text-sm font-bold text-white mt-2.5 line-clamp-1">{service.title}</h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{service.shortDescription}</p>

              {/* Tiers List */}
              <div className="mt-3 pt-2 border-t border-slate-800/60">
                <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">
                  Configured Pricing Tiers ({service.tierOptions.length}):
                </span>
                <div className="space-y-1">
                  {service.tierOptions.map((tier) => (
                    <div key={tier.id} className="flex items-center justify-between text-xs py-1 px-2 rounded bg-slate-950/60 border border-slate-800/40">
                      <span className="text-slate-300 truncate max-w-[150px]">{tier.name}</span>
                      <span className="font-mono font-bold text-indigo-300">
                        {formatPrice(tier.price, currency)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                {service.deliveryTimeEstimate}
              </span>
              <button
                onClick={() => handleOpenEditModal(service)}
                className="text-xs font-semibold text-indigo-400 hover:underline"
              >
                Edit Pricing →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
              <h3 className="text-base font-bold text-white">
                {editingServiceId ? 'Edit Service & Pricing Tiers' : 'Add New Service to Catalog'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4 my-4 overflow-y-auto pr-1 flex-1 text-xs">
              
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Service Title:</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Claude 3.5 Sonnet Pro Account"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Category:</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as ServiceCategory })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs cursor-pointer focus:outline-none focus:border-indigo-500"
                  >
                    <option value="social">Social Media Growth</option>
                    <option value="ai_subscription">AI Platform Subscriptions</option>
                    <option value="graphic_design">AI & Graphic Design</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Subcategory / Platform:</label>
                  <input
                    type="text"
                    value={formData.subCategory}
                    onChange={(e) => setFormData({ ...formData, subCategory: e.target.value as SubCategory })}
                    placeholder="Instagram, ChatGPT, Logo, etc."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Short Description:</label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Catchy 1-2 sentence description for the card..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Delivery Time Estimate:</label>
                  <input
                    type="text"
                    value={formData.deliveryTimeEstimate}
                    onChange={(e) => setFormData({ ...formData, deliveryTimeEstimate: e.target.value })}
                    placeholder="e.g. Instant (1 - 5 Mins)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Featured Badge:</label>
                  <select
                    value={formData.badge || 'Popular'}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs cursor-pointer focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Bestseller">Bestseller</option>
                    <option value="Hot">Hot</option>
                    <option value="Verified">Verified</option>
                    <option value="Instant Delivery">Instant Delivery</option>
                    <option value="Popular">Popular</option>
                    <option value="Limited Stock">Limited Stock</option>
                  </select>
                </div>
              </div>

              {/* Tiers Customizer */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white uppercase text-[11px] tracking-wider">
                    Pricing Tiers & Options
                  </span>
                  <button
                    type="button"
                    onClick={handleAddTier}
                    className="px-2.5 py-1 rounded-lg bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600 hover:text-white text-[11px] font-semibold transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Tier
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.tierOptions.map((tier, idx) => (
                    <div key={tier.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-2 items-center">
                      <div className="sm:col-span-1">
                        <label className="text-[10px] text-slate-500 block">Tier Name</label>
                        <input
                          type="text"
                          value={tier.name}
                          onChange={(e) => handleUpdateTier(tier.id, 'name', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 px-2 py-1 rounded text-white text-xs"
                          placeholder="Starter"
                        />
                      </div>

                      <div className="sm:col-span-1">
                        <label className="text-[10px] text-slate-500 block">Duration / Amount</label>
                        <input
                          type="text"
                          value={tier.amountOrDuration}
                          onChange={(e) => handleUpdateTier(tier.id, 'amountOrDuration', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 px-2 py-1 rounded text-white text-xs"
                          placeholder="1,000 / 1 Month"
                        />
                      </div>

                      <div className="sm:col-span-1">
                        <label className="text-[10px] text-slate-500 block">Price (USD)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={tier.price}
                          onChange={(e) => handleUpdateTier(tier.id, 'price', parseFloat(e.target.value) || 0)}
                          className="w-full bg-slate-950 border border-slate-800 px-2 py-1 rounded text-white text-xs font-mono"
                        />
                      </div>

                      <div className="sm:col-span-1 flex items-center justify-between pt-3 sm:pt-0">
                        <label className="flex items-center gap-1 text-[11px] text-slate-400 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={tier.popular || false}
                            onChange={(e) => handleUpdateTier(tier.id, 'popular', e.target.checked)}
                            className="rounded bg-slate-800"
                          />
                          <span>Hot</span>
                        </label>

                        {formData.tierOptions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveTier(tier.id)}
                            className="p-1 rounded text-slate-400 hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Input Settings */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Target Field Label:</label>
                  <input
                    type="text"
                    value={formData.targetInputLabel}
                    onChange={(e) => setFormData({ ...formData, targetInputLabel: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Field Placeholder:</label>
                  <input
                    type="text"
                    value={formData.targetInputPlaceholder}
                    onChange={(e) => setFormData({ ...formData, targetInputPlaceholder: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Features Bullet Points (one per line):</label>
                <textarea
                  rows={3}
                  value={formData.featuresText}
                  onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-md"
                >
                  Save Service
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
