import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  ServiceItem, 
  Order, 
  OrderStatus, 
  DeliveryPayload, 
  CurrencyCode, 
  PromoCode,
  OrderStatusLog
} from '../types';
import { INITIAL_SERVICES } from '../data/initialServices';
import { INITIAL_ORDERS, INITIAL_PROMO_CODES } from '../data/initialOrders';

interface AppContextType {
  services: ServiceItem[];
  orders: Order[];
  currency: CurrencyCode;
  promoCodes: PromoCode[];
  isAdminView: boolean;
  adminTab: 'overview' | 'services' | 'orders' | 'analytics' | 'settings';
  selectedServiceForOrder: ServiceItem | null;
  isOrderModalOpen: boolean;
  isTrackingModalOpen: boolean;
  trackingOrderId: string;
  isSmartBriefModalOpen: boolean;
  
  // Actions
  setCurrency: (c: CurrencyCode) => void;
  setIsAdminView: (v: boolean) => void;
  setAdminTab: (tab: 'overview' | 'services' | 'orders' | 'analytics' | 'settings') => void;
  openOrderModal: (service: ServiceItem) => void;
  closeOrderModal: () => void;
  openTrackingModal: (orderId?: string) => void;
  closeTrackingModal: () => void;
  setIsSmartBriefModalOpen: (v: boolean) => void;
  
  // Service management
  addService: (service: ServiceItem) => void;
  updateService: (service: ServiceItem) => void;
  deleteService: (id: string) => void;
  toggleServiceActive: (id: string) => void;
  
  // Order management
  createOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, logNote?: string, deliveryPayload?: DeliveryPayload) => void;
  deleteOrder: (orderId: string) => void;
  
  // Promo codes
  addPromoCode: (promo: PromoCode) => void;
  togglePromoCode: (code: string) => void;
  
  // Reset / persistence
  resetToDemoData: () => void;
  
  // Computed analytics
  analytics: {
    totalRevenue: number;
    totalOrders: number;
    completedOrders: number;
    processingOrders: number;
    pendingOrders: number;
    averageOrderValue: number;
    categorySales: {
      social: number;
      ai_subscription: number;
      graphic_design: number;
    };
    categoryOrdersCount: {
      social: number;
      ai_subscription: number;
      graphic_design: number;
    };
    topServices: { id: string; title: string; count: number; revenue: number }[];
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SERVICES: 'oss_services_v1',
  ORDERS: 'oss_orders_v1',
  CURRENCY: 'oss_currency_v1',
  PROMOS: 'oss_promos_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state from local storage or fallback to defaults
  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENCY);
      return (saved as CurrencyCode) || 'USD';
    } catch {
      return 'USD';
    }
  });

  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROMOS);
      return saved ? JSON.parse(saved) : (INITIAL_PROMO_CODES as PromoCode[]);
    } catch {
      return INITIAL_PROMO_CODES as PromoCode[];
    }
  });

  // UI state
  const [isAdminView, setIsAdminView] = useState(false);
  const [adminTab, setAdminTab] = useState<'overview' | 'services' | 'orders' | 'analytics' | 'settings'>('overview');
  const [selectedServiceForOrder, setSelectedServiceForOrder] = useState<ServiceItem | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState('');
  const [isSmartBriefModalOpen, setIsSmartBriefModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    } catch (e) {
      console.error(e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENCY, currency);
    } catch (e) {
      console.error(e);
    }
  }, [currency]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROMOS, JSON.stringify(promoCodes));
    } catch (e) {
      console.error(e);
    }
  }, [promoCodes]);

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
  };

  const openOrderModal = (service: ServiceItem) => {
    setSelectedServiceForOrder(service);
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedServiceForOrder(null);
  };

  const openTrackingModal = (orderId?: string) => {
    if (orderId) setTrackingOrderId(orderId);
    setIsTrackingModalOpen(true);
  };

  const closeTrackingModal = () => {
    setIsTrackingModalOpen(false);
  };

  // Service handlers
  const addService = (newService: ServiceItem) => {
    setServices(prev => [newService, ...prev]);
  };

  const updateService = (updated: ServiceItem) => {
    setServices(prev => prev.map(s => s.id === updated.id ? updated : s));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const toggleServiceActive = (id: string) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  // Order handlers
  const createOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (
    orderId: string, 
    status: OrderStatus, 
    logNote?: string, 
    deliveryPayload?: DeliveryPayload
  ) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;

      const newLog: OrderStatusLog = {
        timestamp: new Date().toISOString(),
        title: `Status changed to ${status.replace('_', ' ').toUpperCase()}`,
        note: logNote || `Admin updated order status to ${status}.`,
        stage: status
      };

      return {
        ...order,
        orderStatus: status,
        statusUpdates: [...order.statusUpdates, newLog],
        deliveryPayload: deliveryPayload ? { ...order.deliveryPayload, ...deliveryPayload } : order.deliveryPayload
      };
    }));
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  // Promo code handlers
  const addPromoCode = (promo: PromoCode) => {
    setPromoCodes(prev => [...prev, promo]);
  };

  const togglePromoCode = (code: string) => {
    setPromoCodes(prev => prev.map(p => p.code === code ? { ...p, isActive: !p.isActive } : p));
  };

  // Reset to demo data
  const resetToDemoData = () => {
    setServices(INITIAL_SERVICES);
    setOrders(INITIAL_ORDERS);
    setPromoCodes(INITIAL_PROMO_CODES as PromoCode[]);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.PROMOS);
  };

  // Computed Analytics
  const analytics = useMemo(() => {
    const totalRevenue = orders.reduce((acc, curr) => acc + (curr.paymentStatus === 'paid' ? curr.totalAmount : 0), 0);
    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.orderStatus === 'completed').length;
    const processingOrders = orders.filter(o => o.orderStatus === 'processing' || o.orderStatus === 'in_progress').length;
    const pendingOrders = orders.filter(o => o.orderStatus === 'pending').length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const categorySales = {
      social: 0,
      ai_subscription: 0,
      graphic_design: 0
    };

    const categoryOrdersCount = {
      social: 0,
      ai_subscription: 0,
      graphic_design: 0
    };

    const serviceMap = new Map<string, { id: string; title: string; count: number; revenue: number }>();

    orders.forEach(order => {
      if (order.paymentStatus === 'paid') {
        if (order.category in categorySales) {
          categorySales[order.category as keyof typeof categorySales] += order.totalAmount;
          categoryOrdersCount[order.category as keyof typeof categoryOrdersCount] += 1;
        }

        const existing = serviceMap.get(order.serviceId);
        if (existing) {
          existing.count += 1;
          existing.revenue += order.totalAmount;
        } else {
          serviceMap.set(order.serviceId, {
            id: order.serviceId,
            title: order.serviceTitle,
            count: 1,
            revenue: order.totalAmount
          });
        }
      }
    });

    const topServices = Array.from(serviceMap.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    return {
      totalRevenue,
      totalOrders,
      completedOrders,
      processingOrders,
      pendingOrders,
      averageOrderValue,
      categorySales,
      categoryOrdersCount,
      topServices
    };
  }, [orders]);

  return (
    <AppContext.Provider
      value={{
        services,
        orders,
        currency,
        promoCodes,
        isAdminView,
        adminTab,
        selectedServiceForOrder,
        isOrderModalOpen,
        isTrackingModalOpen,
        trackingOrderId,
        isSmartBriefModalOpen,
        setCurrency,
        setIsAdminView,
        setAdminTab,
        openOrderModal,
        closeOrderModal,
        openTrackingModal,
        closeTrackingModal,
        setIsSmartBriefModalOpen,
        addService,
        updateService,
        deleteService,
        toggleServiceActive,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        addPromoCode,
        togglePromoCode,
        resetToDemoData,
        analytics
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
