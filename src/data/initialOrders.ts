import { Order } from '../types';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'OSS-94102',
    createdAt: '2026-10-27T18:42:00.000Z',
    customerName: 'Marcus Vance',
    customerEmail: 'marcus.vance@techcorp.io',
    customerPhone: '+1 (555) 234-8901',
    serviceId: 'ai-chatgpt-pro',
    serviceTitle: 'ChatGPT Plus & ChatGPT Pro (GPT-4o & o1)',
    category: 'ai_subscription',
    subCategory: 'LLM & Assistants',
    tierSelected: {
      id: 'gpt-plus-1m-private',
      name: 'ChatGPT Plus Private',
      amountOrDuration: '1 Month (Private Account)',
      price: 17.99,
      stockStatus: 'instant'
    },
    targetUrlOrBrief: 'marcus.vance@techcorp.io',
    additionalNotes: 'Need access ASAP for team sprint.',
    totalAmount: 17.99,
    discountApplied: 0,
    currency: 'USD',
    paymentMethod: 'credit_card',
    paymentStatus: 'paid',
    orderStatus: 'completed',
    transactionId: 'TXN-STRIPE-8910398',
    statusUpdates: [
      {
        timestamp: '2026-10-27T18:42:05.000Z',
        title: 'Order Received & Payment Verified',
        note: 'Stripe transaction TXN-STRIPE-8910398 verified successfully.',
        stage: 'pending'
      },
      {
        timestamp: '2026-10-27T18:43:10.000Z',
        title: 'Provisioning Account Seat',
        note: 'Dedicated ChatGPT Plus instance assigned from stock.',
        stage: 'processing'
      },
      {
        timestamp: '2026-10-27T18:44:30.000Z',
        title: 'Credentials Dispatched & Completed',
        note: 'Private login credentials and activation guide sent to customer email.',
        stage: 'completed'
      }
    ],
    deliveryPayload: {
      credentialsOrLinks: 'Account: oss_user_94102@onestopai.org | Temp Password: [SecuredPass-88!$] | Guide: https://onestopsolution.store/activate-plus',
      notes: 'Active for 30 days. Contact 24/7 support for renewal guarantee.',
      deliveryDate: '2026-10-27T18:44:30.000Z'
    }
  },
  {
    id: 'OSS-94103',
    createdAt: '2026-10-27T19:15:00.000Z',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.art@designstudio.co',
    customerPhone: '+44 7911 123456',
    serviceId: 'design-logo-branding',
    serviceTitle: 'Custom Brand & Logo Design (AI-Assisted Human Polish)',
    category: 'graphic_design',
    subCategory: 'Logo & Identity',
    tierSelected: {
      id: 'logo-pro',
      name: 'Brand Identity Suite',
      amountOrDuration: '4 Concepts + All Vectors + 3D Mockup',
      price: 59.99,
      stockStatus: 'instant'
    },
    targetUrlOrBrief: 'Brand Name: "Aetheria Labs" | Niche: Web3 Synthetic Biology | Palette: Obsidian black, Electric cyan, Emerald green | Style: Geometric minimalist monogram icon + futuristic sans-serif typeface.',
    additionalNotes: 'Please ensure SVG format is provided for web app.',
    totalAmount: 53.99,
    discountApplied: 6.00,
    currency: 'USD',
    paymentMethod: 'crypto_usdt',
    paymentStatus: 'paid',
    orderStatus: 'in_progress',
    transactionId: 'TXN-USDT-TRC20-0x98b4c...',
    statusUpdates: [
      {
        timestamp: '2026-10-27T19:15:10.000Z',
        title: 'Crypto Payment Confirmed (USDT TRC20)',
        note: '12 network confirmations received on blockchain.',
        stage: 'pending'
      },
      {
        timestamp: '2026-10-27T19:30:00.000Z',
        title: 'Assigned to Senior Brand Designer',
        note: 'Creative brief reviewed and initial AI concept exploration started.',
        stage: 'processing'
      },
      {
        timestamp: '2026-10-27T21:00:00.000Z',
        title: 'Concept Vector Drafting in Progress',
        note: '3 concept sketches in progress; vector precision refinement undergoing.',
        stage: 'in_progress'
      }
    ],
    deliveryPayload: {
      notes: 'Initial draft proof preview will be available in 14 hours.'
    }
  },
  {
    id: 'OSS-94104',
    createdAt: '2026-10-27T21:30:00.000Z',
    customerName: 'Devin K.',
    customerEmail: 'devin.growth@tiktokagency.net',
    serviceId: 'ig-followers-premium',
    serviceTitle: 'Instagram High-Quality Followers',
    category: 'social',
    subCategory: 'Instagram',
    tierSelected: {
      id: 'ig-f-5k',
      name: 'Influencer Pack',
      amountOrDuration: '5,000 Followers',
      price: 38.99,
      stockStatus: 'instant'
    },
    targetUrlOrBrief: 'https://instagram.com/devin.vibe.official',
    additionalNotes: 'Please drip-feed smoothly over 24-48 hours.',
    totalAmount: 38.99,
    discountApplied: 0,
    currency: 'USD',
    paymentMethod: 'paypal',
    paymentStatus: 'paid',
    orderStatus: 'processing',
    transactionId: 'PAYPAL-881290334',
    statusUpdates: [
      {
        timestamp: '2026-10-27T21:30:15.000Z',
        title: 'PayPal Payment Verified',
        note: 'Payment authorized and escrow cleared.',
        stage: 'pending'
      },
      {
        timestamp: '2026-10-27T21:35:00.000Z',
        title: 'Drip-Feed Queue Scheduled',
        note: 'Instagram account public status verified. Pacing set to 150-200/hour.',
        stage: 'processing'
      }
    ]
  },
  {
    id: 'OSS-94105',
    createdAt: '2026-10-27T22:10:00.000Z',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.podcast@gmail.com',
    serviceId: 'ai-elevenlabs-premium',
    serviceTitle: 'ElevenLabs Premium / Creator Voice AI',
    category: 'ai_subscription',
    subCategory: 'Voice & Audio AI',
    tierSelected: {
      id: 'el-starter',
      name: 'Creator Tier (100k Chars)',
      amountOrDuration: '1 Month (100,000 Chars)',
      price: 16.99,
      stockStatus: 'instant'
    },
    targetUrlOrBrief: 'sarah.podcast@gmail.com',
    additionalNotes: 'Need commercial license for podcast intro voiceover.',
    totalAmount: 16.99,
    discountApplied: 0,
    currency: 'USD',
    paymentMethod: 'credit_card',
    paymentStatus: 'paid',
    orderStatus: 'completed',
    transactionId: 'TXN-STRIPE-4481923',
    statusUpdates: [
      {
        timestamp: '2026-10-27T22:10:05.000Z',
        title: 'Payment Confirmed',
        note: 'Card charged successfully.',
        stage: 'pending'
      },
      {
        timestamp: '2026-10-27T22:11:00.000Z',
        title: 'Account Activated',
        note: 'Creator plan invitation dispatched.',
        stage: 'completed'
      }
    ],
    deliveryPayload: {
      credentialsOrLinks: 'ElevenLabs Access ID: EL-94105 | Direct Workspace Invite: https://elevenlabs.io/invite/oss-sarah-creator',
      notes: '100,000 characters loaded with commercial license.',
      deliveryDate: '2026-10-27T22:11:00.000Z'
    }
  },
  {
    id: 'OSS-94106',
    createdAt: '2026-10-27T22:50:00.000Z',
    customerName: 'Alex Thorne',
    customerEmail: 'alex.thorne@xcreator.com',
    serviceId: 'ai-gemini-pro',
    serviceTitle: 'Google Gemini Pro / Advanced Subscription',
    category: 'ai_subscription',
    subCategory: 'LLM & Assistants',
    tierSelected: {
      id: 'gemini-1m-private',
      name: 'Private Dedicated',
      amountOrDuration: '1 Month Dedicated Account',
      price: 14.99,
      stockStatus: 'instant'
    },
    targetUrlOrBrief: 'alex.thorne@xcreator.com',
    additionalNotes: '',
    totalAmount: 14.99,
    discountApplied: 0,
    currency: 'USD',
    paymentMethod: 'crypto_usdt',
    paymentStatus: 'paid',
    orderStatus: 'completed',
    transactionId: 'TXN-USDT-90182741',
    statusUpdates: [
      {
        timestamp: '2026-10-27T22:50:10.000Z',
        title: 'USDT Payment Confirmed',
        note: 'Block #49281729 recorded.',
        stage: 'pending'
      },
      {
        timestamp: '2026-10-27T22:51:30.000Z',
        title: 'Google One AI Premium Invite Sent',
        note: 'Official Gemini Advanced invitation delivered.',
        stage: 'completed'
      }
    ],
    deliveryPayload: {
      credentialsOrLinks: 'Account: oss_gemini_alex@workspace-pro.com | Direct Invite link: https://one.google.com/ai-family/invite?token=oss94106',
      notes: 'Full 2M token context window and Imagen 3 active.',
      deliveryDate: '2026-10-27T22:51:30.000Z'
    }
  },
  {
    id: 'OSS-94107',
    createdAt: '2026-10-27T23:20:00.000Z',
    customerName: 'Tariq Rahman',
    customerEmail: 'tariq.ecom@gmail.com',
    customerPhone: '+880 1711 000000',
    serviceId: 'design-flyer-poster',
    serviceTitle: 'Commercial Flyer, Poster & Event Banner Design',
    category: 'graphic_design',
    subCategory: 'Flyers & Posters',
    tierSelected: {
      id: 'flyer-single',
      name: 'Single-Sided Modern Flyer',
      amountOrDuration: '1 Custom Flyer (Print + Web)',
      price: 24.99,
      stockStatus: 'instant'
    },
    targetUrlOrBrief: 'Headline: "Black Friday Mega Tech Expo 2026" | Date: Nov 28-30 | Venue: Silicon Hub Convention Center | 50% off banner tag | High contrast dark mode neon violet aesthetic.',
    additionalNotes: 'Need 1080x1920 Instagram Story size and A4 print version.',
    totalAmount: 24.99,
    discountApplied: 0,
    currency: 'USD',
    paymentMethod: 'bkash_nagad',
    paymentStatus: 'paid',
    orderStatus: 'pending',
    transactionId: 'BKASH-TRX-9481903',
    statusUpdates: [
      {
        timestamp: '2026-10-27T23:20:05.000Z',
        title: 'Payment Verification Successful',
        note: 'Mobile banking transaction ID BKASH-TRX-9481903 verified.',
        stage: 'pending'
      }
    ]
  }
];

export const INITIAL_PROMO_CODES = [
  { code: 'WELCOME10', discountType: 'percentage', discountValue: 10, isActive: true },
  { code: 'AI2026', discountType: 'fixed', discountValue: 5, minOrder: 25, isActive: true },
  { code: 'VIP20', discountType: 'percentage', discountValue: 20, minOrder: 50, isActive: true }
];
