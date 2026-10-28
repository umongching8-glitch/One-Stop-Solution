import { CurrencyCode, CurrencyConfig } from '../types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.78 },
  BDT: { code: 'BDT', symbol: '৳', rate: 120.5 },
  INR: { code: 'INR', symbol: '₹', rate: 84.2 }
};

export function formatPrice(amountUSD: number, currencyCode: CurrencyCode = 'USD'): string {
  const config = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const converted = amountUSD * config.rate;
  
  if (currencyCode === 'BDT' || currencyCode === 'INR') {
    return `${config.symbol}${Math.round(converted).toLocaleString()}`;
  }
  
  return `${config.symbol}${converted.toFixed(2)}`;
}
