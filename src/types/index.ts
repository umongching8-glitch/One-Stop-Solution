export type ServiceCategory = 'social' | 'ai_subscription' | 'graphic_design';

export type SubCategory = 
  | 'Instagram'
  | 'YouTube'
  | 'TikTok'
  | 'Facebook'
  | 'X (Twitter)'
  | 'Telegram'
  | 'LinkedIn'
  | 'LLM & Assistants'
  | 'Voice & Audio AI'
  | 'Creative & Image AI'
  | 'Coding & Dev AI'
  | 'Logo & Identity'
  | 'Flyers & Posters'
  | 'Business Cards & Stationery'
  | 'Social Media Kits';

export interface ServiceTier {
  id: string;
  name: string;
  amountOrDuration: string;
  price: number;
  originalPrice?: number;
  popular?: boolean;
  stockStatus: 'in_stock' | 'low_stock' | 'instant';
  details?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  subCategory: SubCategory;
  shortDescription: string;
  fullDescription: string;
  badge?: 'Bestseller' | 'Instant Delivery' | 'Popular' | 'Hot' | 'Verified' | 'Limited Stock' | 'Trending';
  icon: string;
  rating: number;
  reviewCount: number;
  features: string[];
  tierOptions: ServiceTier[];
  targetInputLabel: string;
  targetInputPlaceholder: string;
  targetInputHelp: string;
  deliveryTimeEstimate: string;
  isActive: boolean;
  inStock: boolean;
  tags: string[];
}

export type OrderStatus = 'pending' | 'processing' | 'in_progress' | 'completed' | 'cancelled';
export type PaymentStatus = 'paid' | 'pending_verification' | 'failed';
export type PaymentMethod = 'credit_card' | 'crypto_usdt' | 'paypal' | 'instant_wire' | 'bkash_nagad';

export interface OrderStatusLog {
  timestamp: string;
  title: string;
  note: string;
  stage: OrderStatus;
}

export interface DeliveryPayload {
  credentialsOrLinks?: string;
  designDownloadUrl?: string;
  notes?: string;
  deliveryDate?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  serviceId: string;
  serviceTitle: string;
  category: ServiceCategory;
  subCategory: SubCategory;
  tierSelected: ServiceTier;
  targetUrlOrBrief: string;
  additionalNotes?: string;
  totalAmount: number;
  discountApplied: number;
  currency: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  transactionId: string;
  statusUpdates: OrderStatusLog[];
  deliveryPayload?: DeliveryPayload;
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrder?: number;
  isActive: boolean;
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'BDT' | 'INR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // vs USD
}
