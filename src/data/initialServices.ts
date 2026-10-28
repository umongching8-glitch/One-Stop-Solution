import { ServiceItem } from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  // --- SOCIAL MEDIA SERVICES ---
  {
    id: 'ig-followers-premium',
    title: 'Instagram High-Quality Followers',
    category: 'social',
    subCategory: 'Instagram',
    shortDescription: 'Active-looking profiles with high retention, real avatars & posts. Safe drip-feed delivery.',
    fullDescription: 'Boost your personal or brand authority on Instagram with premium quality followers. We use safe algorithmic delivery pacing with an automatic 30-day refill guarantee.',
    badge: 'Bestseller',
    icon: 'Instagram',
    rating: 4.9,
    reviewCount: 342,
    features: [
      'Gradual Organic Drip-Feed Pacing',
      'High-Retention Accounts (Real bio & posts)',
      '30-Day Free Automatic Refill Guarantee',
      'No Password Required (Profile link only)',
      '100% Safe & Compliant with IG guidelines'
    ],
    deliveryTimeEstimate: '15 - 45 Minutes',
    isActive: true,
    inStock: true,
    tags: ['instagram', 'followers', 'organic', 'refill'],
    targetInputLabel: 'Instagram Username or Profile URL',
    targetInputPlaceholder: 'https://instagram.com/yourusername or @yourusername',
    targetInputHelp: 'Ensure your account is public before submitting.',
    tierOptions: [
      { id: 'ig-f-1k', name: 'Starter Boost', amountOrDuration: '1,000 Followers', price: 9.99, originalPrice: 14.99, popular: false, stockStatus: 'instant' },
      { id: 'ig-f-2.5k', name: 'Creator Pack', amountOrDuration: '2,500 Followers', price: 21.99, originalPrice: 29.99, popular: true, stockStatus: 'instant' },
      { id: 'ig-f-5k', name: 'Influencer Pack', amountOrDuration: '5,000 Followers', price: 38.99, originalPrice: 49.99, popular: false, stockStatus: 'instant' },
      { id: 'ig-f-10k', name: 'Brand Authority', amountOrDuration: '10,000 Followers', price: 69.99, originalPrice: 99.99, popular: false, stockStatus: 'instant' }
    ]
  },
  {
    id: 'ig-likes-engagement',
    title: 'Instagram Post & Reel Likes + Explore Reach',
    category: 'social',
    subCategory: 'Instagram',
    shortDescription: 'Instant high-speed likes that boost post virality and trigger the explore page algorithm.',
    fullDescription: 'Trigger the Instagram Explore page algorithm with high quality likes delivered right after your upload. Split across multiple posts or send in one burst.',
    badge: 'Popular',
    icon: 'Heart',
    rating: 4.8,
    reviewCount: 210,
    features: [
      'Super Fast Instant Start (< 5 mins)',
      'Real Profile Likes & Impressions',
      'Triggers Explore Page Discovery',
      'Can split across up to 3 recent posts',
      'No password required'
    ],
    deliveryTimeEstimate: '5 - 20 Minutes',
    isActive: true,
    inStock: true,
    tags: ['instagram', 'likes', 'explore', 'reels'],
    targetInputLabel: 'Post or Reel URL',
    targetInputPlaceholder: 'https://www.instagram.com/p/C7XyZ...',
    targetInputHelp: 'Direct link to the post or reel. Account must be public.',
    tierOptions: [
      { id: 'ig-l-500', name: 'Micro Boost', amountOrDuration: '500 Likes', price: 4.99, originalPrice: 7.99, stockStatus: 'instant' },
      { id: 'ig-l-1.5k', name: 'Standard Push', amountOrDuration: '1,500 Likes', price: 11.99, originalPrice: 16.99, popular: true, stockStatus: 'instant' },
      { id: 'ig-l-5k', name: 'Viral Wave', amountOrDuration: '5,000 Likes + Saves', price: 29.99, originalPrice: 42.00, stockStatus: 'instant' }
    ]
  },
  {
    id: 'yt-subscribers-views',
    title: 'YouTube Monetization Views & Subscribers',
    category: 'social',
    subCategory: 'YouTube',
    shortDescription: 'High watch-time retention views and permanent channel subscribers for monetization eligibility.',
    fullDescription: 'Accelerate your pathway to YouTube Partner Program monetization with verified retention watch hours and active channel subscribers.',
    badge: 'Verified',
    icon: 'Youtube',
    rating: 4.9,
    reviewCount: 188,
    features: [
      'Non-Drop Permanent Subscribers',
      'High Watch Duration (3-5+ mins retention)',
      'Counts towards 4000h Monetization requirement',
      'Safe from YouTube algorithm sweeps'
    ],
    deliveryTimeEstimate: '1 - 3 Days',
    isActive: true,
    inStock: true,
    tags: ['youtube', 'monetization', 'subscribers', 'views'],
    targetInputLabel: 'YouTube Channel or Video Link',
    targetInputPlaceholder: 'https://youtube.com/@channel or video URL',
    targetInputHelp: 'Provide channel link for subscribers or specific video link for views.',
    tierOptions: [
      { id: 'yt-sub-500', name: 'Channel Kickstart', amountOrDuration: '500 Subscribers', price: 19.99, originalPrice: 28.00, stockStatus: 'instant' },
      { id: 'yt-sub-1k', name: 'Monetization Pack', amountOrDuration: '1,000 Subscribers', price: 34.99, originalPrice: 49.99, popular: true, stockStatus: 'instant' },
      { id: 'yt-views-5k', name: 'Viral Watchtime', amountOrDuration: '5,000 High-Retention Views', price: 17.99, originalPrice: 24.99, stockStatus: 'instant' },
      { id: 'yt-monetize-combo', name: 'Complete Monetization Prep', amountOrDuration: '1k Subs + 4,000 Watch Hours', price: 119.00, originalPrice: 160.00, stockStatus: 'in_stock' }
    ]
  },
  {
    id: 'tiktok-followers-likes',
    title: 'TikTok Viral Followers & FYP Likes',
    category: 'social',
    subCategory: 'TikTok',
    shortDescription: 'Accelerate FYP (For You Page) visibility with high velocity likes, followers and bookmark saves.',
    fullDescription: 'Grow your TikTok presence effortlessly. Unlock TikTok Live streaming (requires 1,000 followers) and TikTok Creator Rewards program faster.',
    badge: 'Hot',
    icon: 'Video',
    rating: 4.8,
    reviewCount: 175,
    features: [
      'Unlocks TikTok LIVE requirement (1k subs)',
      'Boosts FYP Algorithm Velocity',
      'High retention & low drop rate',
      'Instant automated dispatch'
    ],
    deliveryTimeEstimate: '10 - 30 Minutes',
    isActive: true,
    inStock: true,
    tags: ['tiktok', 'fyp', 'followers', 'likes'],
    targetInputLabel: 'TikTok Profile Username or Video Link',
    targetInputPlaceholder: '@yourtiktokhandle or https://www.tiktok.com/@...',
    targetInputHelp: 'Ensure your account has at least 1 public video.',
    tierOptions: [
      { id: 'tt-1k', name: 'LIVE Unlocker', amountOrDuration: '1,000 Followers', price: 12.99, originalPrice: 18.00, popular: true, stockStatus: 'instant' },
      { id: 'tt-3k', name: 'Pro Creator', amountOrDuration: '3,000 Followers', price: 29.99, originalPrice: 39.99, stockStatus: 'instant' },
      { id: 'tt-likes-5k', name: 'FYP Viral Pack', amountOrDuration: '5,000 Video Likes + 1k Shares', price: 22.50, originalPrice: 32.00, stockStatus: 'instant' }
    ]
  },
  {
    id: 'fb-page-engagement',
    title: 'Facebook Page Likes & Post Reactions',
    category: 'social',
    subCategory: 'Facebook',
    shortDescription: 'Genuine-looking page followers & custom emotional reactions (Love, Care, Wow, Like).',
    fullDescription: 'Build immediate business credibility on Facebook. Custom post reactions allow you to choose specific emotional reactions (Love/Care/Haha/Wow).',
    badge: 'Verified',
    icon: 'Facebook',
    rating: 4.7,
    reviewCount: 120,
    features: [
      'Custom Reactions (Love, Care, Wow, Like)',
      'Page Followers + Page Likes included',
      'Increases organic social proof for ads',
      'High stability & refill warranty'
    ],
    deliveryTimeEstimate: '30 - 60 Minutes',
    isActive: true,
    inStock: true,
    tags: ['facebook', 'reactions', 'page-likes', 'branding'],
    targetInputLabel: 'Facebook Page URL or Post URL',
    targetInputPlaceholder: 'https://facebook.com/yourbrand or post link',
    targetInputHelp: 'Page must be publicly viewable without age/country restrictions.',
    tierOptions: [
      { id: 'fb-1k-followers', name: 'Page Foundation', amountOrDuration: '1,000 Page Likes & Follows', price: 14.99, originalPrice: 22.00, stockStatus: 'instant' },
      { id: 'fb-2.5k-followers', name: 'Business Growth', amountOrDuration: '2,500 Page Likes & Follows', price: 32.00, originalPrice: 45.00, popular: true, stockStatus: 'instant' },
      { id: 'fb-1k-reactions', name: 'Custom Emotional Reactions', amountOrDuration: '1,000 Love / Care Reactions', price: 9.99, originalPrice: 14.99, stockStatus: 'instant' }
    ]
  },
  {
    id: 'x-twitter-followers',
    title: 'X (Twitter) Followers & Retweets',
    category: 'social',
    subCategory: 'X (Twitter)',
    shortDescription: 'Targeted tech, crypto & creator profiles with high engagement for X algorithmic push.',
    fullDescription: 'Power up your X presence. Ideal for crypto projects, startup founders, influencers, and creators seeking to establish verified authority and reach.',
    badge: 'Popular',
    icon: 'Twitter',
    rating: 4.8,
    reviewCount: 94,
    features: [
      'Crypto & Tech Niche Profile Avatars',
      'Safe Pacing - Algorithm Compliant',
      'High-speed Retweets & Quote tweets',
      'No account access required'
    ],
    deliveryTimeEstimate: '20 - 50 Minutes',
    isActive: true,
    inStock: true,
    tags: ['twitter', 'x', 'followers', 'retweets'],
    targetInputLabel: 'X / Twitter Profile Username or Tweet Link',
    targetInputPlaceholder: 'https://x.com/username or @username',
    targetInputHelp: 'Profile must be public.',
    tierOptions: [
      { id: 'x-500', name: 'Tech Kickstart', amountOrDuration: '500 X Followers', price: 8.99, originalPrice: 13.00, stockStatus: 'instant' },
      { id: 'x-1.5k', name: 'Authority Booster', amountOrDuration: '1,500 X Followers', price: 23.99, originalPrice: 34.00, popular: true, stockStatus: 'instant' },
      { id: 'x-rt-1k', name: 'Viral Tweet Pack', amountOrDuration: '1,000 Retweets + 1,000 Likes', price: 18.50, originalPrice: 27.00, stockStatus: 'instant' }
    ]
  },

  // --- AI PLATFORM SUBSCRIPTIONS ---
  {
    id: 'ai-gemini-pro',
    title: 'Google Gemini Pro / Advanced Subscription',
    category: 'ai_subscription',
    subCategory: 'LLM & Assistants',
    shortDescription: 'Access 2M token context window, Gemini 1.5/2.0 Pro, Imagen 3, and deep reasoning models.',
    fullDescription: 'Official Gemini Advanced access directly tied to your email or as a dedicated premium workspace account. Enjoy Google Workspace integration, 2 Million token context, code execution, and high-res image generation.',
    badge: 'Bestseller',
    icon: 'Sparkles',
    rating: 4.95,
    reviewCount: 420,
    features: [
      'Gemini 1.5 & 2.0 Pro Architecture',
      'Massive 2,000,000 Token Context Window',
      'Imagen 3 Photorealistic Image Generation',
      'Google Docs, Gmail & Drive Deep Integration',
      'Full Warranty with Free Replacement Guarantee'
    ],
    deliveryTimeEstimate: 'Instant (1 - 5 Minutes)',
    isActive: true,
    inStock: true,
    tags: ['gemini', 'google-ai', 'subscription', 'advanced'],
    targetInputLabel: 'Email for Subscription Invite / Dedicated Account',
    targetInputPlaceholder: 'yourname@gmail.com',
    targetInputHelp: 'We will send the invitation or instant dedicated account credentials.',
    tierOptions: [
      { id: 'gemini-1m-shared', name: 'Shared Workspace', amountOrDuration: '1 Month Access', price: 8.99, originalPrice: 19.99, stockStatus: 'instant' },
      { id: 'gemini-1m-private', name: 'Private Dedicated', amountOrDuration: '1 Month Dedicated Account', price: 14.99, originalPrice: 22.00, popular: true, stockStatus: 'instant' },
      { id: 'gemini-3m-private', name: 'Quarterly Pass', amountOrDuration: '3 Months Dedicated Account', price: 38.00, originalPrice: 59.99, stockStatus: 'instant' },
      { id: 'gemini-1y-vip', name: 'Annual VIP Pass', amountOrDuration: '12 Months Private Subscription', price: 129.00, originalPrice: 240.00, stockStatus: 'in_stock' }
    ]
  },
  {
    id: 'ai-chatgpt-pro',
    title: 'ChatGPT Plus & ChatGPT Pro (GPT-4o & o1)',
    category: 'ai_subscription',
    subCategory: 'LLM & Assistants',
    shortDescription: 'Full access to GPT-4o, OpenAI o1 reasoning model, Canvas, voice mode, and DALL-E 3.',
    fullDescription: 'Elevate your productivity with official ChatGPT Plus / Pro accounts. Zero waitlist, high speed priority access during peak hours, and full access to reasoning models.',
    badge: 'Hot',
    icon: 'Bot',
    rating: 4.98,
    reviewCount: 630,
    features: [
      'Access to GPT-4o, o1, and o3-mini Reasoning',
      'Interactive Canvas Workspace for Code & Writing',
      'Advanced Voice Mode with real-time inflection',
      'DALL-E 3 High-Definition Image Creation',
      'Custom GPT Store access with no limitations'
    ],
    deliveryTimeEstimate: 'Instant (1 - 5 Minutes)',
    isActive: true,
    inStock: true,
    tags: ['chatgpt', 'openai', 'gpt-4o', 'o1-pro'],
    targetInputLabel: 'Account Delivery Email',
    targetInputPlaceholder: 'your.email@domain.com',
    targetInputHelp: 'Instant credentials will be delivered to this email and displayed on screen.',
    tierOptions: [
      { id: 'gpt-plus-1m-shared', name: 'ChatGPT Plus Shared', amountOrDuration: '1 Month (Shared Seat)', price: 9.99, originalPrice: 20.00, stockStatus: 'instant' },
      { id: 'gpt-plus-1m-private', name: 'ChatGPT Plus Private', amountOrDuration: '1 Month (Private Account)', price: 17.99, originalPrice: 25.00, popular: true, stockStatus: 'instant' },
      { id: 'gpt-plus-3m-private', name: 'ChatGPT Plus 3-Month', amountOrDuration: '3 Months (Private Dedicated)', price: 46.99, originalPrice: 65.00, stockStatus: 'instant' },
      { id: 'gpt-pro-o1-pro', name: 'ChatGPT Pro (o1 Unlimited)', amountOrDuration: '1 Month Ultra Access', price: 149.00, originalPrice: 200.00, stockStatus: 'low_stock' }
    ]
  },
  {
    id: 'ai-elevenlabs-premium',
    title: 'ElevenLabs Premium / Creator Voice AI',
    category: 'ai_subscription',
    subCategory: 'Voice & Audio AI',
    shortDescription: 'Industry-standard ultra-realistic AI voice cloning, speech synthesis & commercial license.',
    fullDescription: 'Create viral YouTube faceless channel audio, audiobook narration, and character dubbing with ElevenLabs. Includes Instant Voice Cloning and 100,000+ monthly characters.',
    badge: 'Popular',
    icon: 'Mic',
    rating: 4.92,
    reviewCount: 195,
    features: [
      '100,000+ Character Quota / Month',
      'Instant Voice Cloning with 1-minute audio sample',
      'Professional Voice Cloning access',
      'Commercial Rights included for YouTube & Podcasts',
      'Ultra-low latency Text-to-Speech API compatibility'
    ],
    deliveryTimeEstimate: 'Instant (1 - 5 Minutes)',
    isActive: true,
    inStock: true,
    tags: ['elevenlabs', 'voice-ai', 'tts', 'dubbing'],
    targetInputLabel: 'Delivery Email Address',
    targetInputPlaceholder: 'creator@gmail.com',
    targetInputHelp: 'Direct license or pre-activated creator account provided.',
    tierOptions: [
      { id: 'el-starter', name: 'Creator Tier (100k Chars)', amountOrDuration: '1 Month (100,000 Chars)', price: 16.99, originalPrice: 22.00, popular: true, stockStatus: 'instant' },
      { id: 'el-pro-500k', name: 'Pro Studio (500k Chars)', amountOrDuration: '1 Month (500,000 Chars)', price: 54.00, originalPrice: 75.00, stockStatus: 'instant' },
      { id: 'el-annual', name: 'Annual Creator Pass', amountOrDuration: '12 Months Continuous Access', price: 165.00, originalPrice: 260.00, stockStatus: 'in_stock' }
    ]
  },
  {
    id: 'ai-grok-pro',
    title: 'Grok Pro / SuperGrok (xAI Premium+)',
    category: 'ai_subscription',
    subCategory: 'LLM & Assistants',
    shortDescription: 'Unfiltered AI intelligence, real-time X news search, Fun Mode, and Flux image generation.',
    fullDescription: 'Direct access to Elon Musk’s xAI Grok 2 & Grok 3 engines. Features live real-time analysis of worldwide trends on X, zero censorship filter options, and Flux.1 generation.',
    badge: 'Trending',
    icon: 'Zap',
    rating: 4.87,
    reviewCount: 142,
    features: [
      'Real-time Live Web & X (Twitter) Search Grounding',
      'Grok 2.0 & Vision Multimodal Reasoning',
      'Integrated Flux.1 Uncensored Image Synthesis',
      'Blue Checkmark Profile Verification bundle optional',
      'Instant Setup Guarantee'
    ],
    deliveryTimeEstimate: 'Instant (1 - 5 Minutes)',
    isActive: true,
    inStock: true,
    tags: ['grok', 'xai', 'elon-musk', 'flux'],
    targetInputLabel: 'Email / X Handle for Activation',
    targetInputPlaceholder: 'youremail@domain.com or @xhandle',
    targetInputHelp: 'We will dispatch your verified Grok account credentials immediately.',
    tierOptions: [
      { id: 'grok-1m', name: 'Grok Pro 1-Month', amountOrDuration: '1 Month Full Access', price: 14.50, originalPrice: 22.00, popular: true, stockStatus: 'instant' },
      { id: 'grok-3m', name: 'Grok Pro 3-Month', amountOrDuration: '3 Months Full Access', price: 38.00, originalPrice: 55.00, stockStatus: 'instant' },
      { id: 'grok-x-bundle', name: 'X Premium+ Bundle', amountOrDuration: '1 Month (Grok + X Blue Verified)', price: 21.00, originalPrice: 29.00, stockStatus: 'in_stock' }
    ]
  },
  {
    id: 'ai-midjourney-pro',
    title: 'Midjourney v6.1 Fast GPU Subscription',
    category: 'ai_subscription',
    subCategory: 'Creative & Image AI',
    shortDescription: 'Stealth mode, unlimited relax generations, 30h fast GPU time for award-winning digital art.',
    fullDescription: 'Generate hyper-realistic photography, 3D character assets, and graphic designs with Midjourney v6.1. Includes Web UI generator access + Discord bot privileges.',
    badge: 'Popular',
    icon: 'Palette',
    rating: 4.94,
    reviewCount: 310,
    features: [
      'Fast GPU Hours with Instant Generation',
      'Stealth Mode (Private image generations)',
      'Midjourney Alpha Web Interface Access',
      'Commercial usage rights for your generated art'
    ],
    deliveryTimeEstimate: 'Instant (1 - 5 Minutes)',
    isActive: true,
    inStock: true,
    tags: ['midjourney', 'art', 'image-generation', 'stealth'],
    targetInputLabel: 'Your Email / Discord Username',
    targetInputPlaceholder: 'artist@gmail.com or discord#1234',
    targetInputHelp: 'Instant invite link or private profile delivered.',
    tierOptions: [
      { id: 'mj-standard', name: 'Standard Plan (15h Fast)', amountOrDuration: '1 Month Access', price: 24.99, originalPrice: 35.00, popular: true, stockStatus: 'instant' },
      { id: 'mj-pro', name: 'Pro Plan (30h Fast + Stealth)', amountOrDuration: '1 Month Stealth Access', price: 49.99, originalPrice: 65.00, stockStatus: 'instant' }
    ]
  },
  {
    id: 'ai-claude-pro',
    title: 'Anthropic Claude 3.5 Sonnet / Pro',
    category: 'ai_subscription',
    subCategory: 'Coding & Dev AI',
    shortDescription: 'The #1 AI model for coding, software architecture, technical documentation & Artifacts.',
    fullDescription: 'Get 5x higher message usage limits for Claude 3.5 Sonnet and Opus. Perfect for senior software engineers, researchers, and creators using interactive Artifacts.',
    badge: 'Verified',
    icon: 'Cpu',
    rating: 4.96,
    reviewCount: 280,
    features: [
      'Claude 3.5 Sonnet with Artifacts Preview',
      '5x more usage volume than free tier',
      'Exceptional Code Generation & Debugging capability',
      'Instant delivery of dedicated login'
    ],
    deliveryTimeEstimate: 'Instant (1 - 5 Minutes)',
    isActive: true,
    inStock: true,
    tags: ['claude', 'anthropic', 'coding', 'artifacts'],
    targetInputLabel: 'Email for Access Delivery',
    targetInputPlaceholder: 'developer@domain.com',
    targetInputHelp: 'We dispatch official credentials via encrypted mail.',
    tierOptions: [
      { id: 'claude-1m-private', name: 'Claude Pro 1-Month', amountOrDuration: '1 Month Private Dedicated', price: 18.99, originalPrice: 26.00, popular: true, stockStatus: 'instant' },
      { id: 'claude-3m-private', name: 'Claude Pro 3-Month', amountOrDuration: '3 Months Dedicated Pass', price: 49.00, originalPrice: 70.00, stockStatus: 'instant' }
    ]
  },

  // --- AI GRAPHICS DESIGN SERVICES ---
  {
    id: 'design-logo-branding',
    title: 'Custom Brand & Logo Design (AI-Assisted Human Polish)',
    category: 'graphic_design',
    subCategory: 'Logo & Identity',
    shortDescription: 'Modern minimalist vector logos with 3 initial design concepts, full vector source files & 3D mockups.',
    fullDescription: 'Craft an unforgettable brand identity. Our hybrid design pipeline blends generative AI concept exploration with senior vector typography and manual bezier curve perfection. Includes vector SVG/EPS/AI source files and copyright transfer.',
    badge: 'Bestseller',
    icon: 'Layers',
    rating: 4.97,
    reviewCount: 265,
    features: [
      '3 Distinct Premium Concept Drafts in 24 Hours',
      'Vector Source Files (AI, EPS, SVG, High-Res PNG, PDF)',
      'Full Commercial & Trademark Copyright Transfer',
      '3D Realistic Storefront & Stationery Mockup previews',
      'Unlimited revisions until 100% satisfied'
    ],
    deliveryTimeEstimate: '24 - 48 Hours',
    isActive: true,
    inStock: true,
    tags: ['logo', 'branding', 'vector', 'identity'],
    targetInputLabel: 'Brand Name, Slogan & Design Brief',
    targetInputPlaceholder: 'Brand name, industry, preferred colors (e.g. Minimalist Black & Neon Cyan), and competitor references...',
    targetInputHelp: 'Provide your vision. You can also use our Smart Brief Creator below!',
    tierOptions: [
      { id: 'logo-starter', name: 'Startup Logo', amountOrDuration: '2 Concepts + PNG/SVG files', price: 29.99, originalPrice: 49.99, stockStatus: 'instant' },
      { id: 'logo-pro', name: 'Brand Identity Suite', amountOrDuration: '4 Concepts + All Vectors + 3D Mockup', price: 59.99, originalPrice: 89.99, popular: true, stockStatus: 'instant' },
      { id: 'logo-enterprise', name: 'Complete Brand Guidelines', amountOrDuration: 'Logo + Color Guide + Typography + Stationary', price: 119.00, originalPrice: 175.00, stockStatus: 'in_stock' }
    ]
  },
  {
    id: 'design-flyer-poster',
    title: 'Commercial Flyer, Poster & Event Banner Design',
    category: 'graphic_design',
    subCategory: 'Flyers & Posters',
    shortDescription: 'Eye-catching marketing flyers, club events, corporate brochures, and digital promotional banners.',
    fullDescription: 'Stop scrolling thumbs and draw massive crowds. We deliver high-impact print-ready (300 DPI CMYK) and digital web (RGB 4K) flyer designs tailored to your campaign.',
    badge: 'Popular',
    icon: 'FileText',
    rating: 4.89,
    reviewCount: 160,
    features: [
      'Print-Ready 300 DPI CMYK with Bleed margins',
      'Digital 4K Social Media version included',
      'Editable PSD or Canva template link available',
      'Express 12-Hour turnaround option available'
    ],
    deliveryTimeEstimate: '12 - 24 Hours',
    isActive: true,
    inStock: true,
    tags: ['flyer', 'poster', 'print', 'marketing'],
    targetInputLabel: 'Flyer Headline, Details & Dimensions',
    targetInputPlaceholder: 'Event title, date, venue, sponsor logos, bullet points, and required size (A4, 8.5x11, Instagram 1080x1350)...',
    targetInputHelp: 'Include any text content, dates, and image references.',
    tierOptions: [
      { id: 'flyer-single', name: 'Single-Sided Modern Flyer', amountOrDuration: '1 Custom Flyer (Print + Web)', price: 24.99, originalPrice: 38.00, popular: true, stockStatus: 'instant' },
      { id: 'flyer-double', name: 'Double-Sided Promo Brochure', amountOrDuration: '2-Sided Flyer / Bi-fold layout', price: 39.99, originalPrice: 58.00, stockStatus: 'instant' },
      { id: 'flyer-campaign', name: 'Full Event Campaign Kit', amountOrDuration: 'Flyer + 3 Story Banners + Ticket Pass', price: 69.00, originalPrice: 99.00, stockStatus: 'in_stock' }
    ]
  },
  {
    id: 'design-business-card',
    title: 'Luxury Business Card & NFC Smart Stationery',
    category: 'graphic_design',
    subCategory: 'Business Cards & Stationery',
    shortDescription: 'Minimalist luxury business cards with QR code / NFC vCard link, foil stamping & spot UV styling.',
    fullDescription: 'Make a powerful first impression in any boardroom. Designed with exquisite typography, modern clean spacing, and dynamic QR codes that link directly to your digital portfolio or contact card.',
    badge: 'Verified',
    icon: 'CreditCard',
    rating: 4.93,
    reviewCount: 140,
    features: [
      'Double-Sided Premium Layout (Horizontal or Vertical)',
      'Custom QR Code generated directly to your vCard / Web',
      'Spot UV, Emboss & Gold Foil print layer preparation',
      'Editable vector AI/EPS and high-res PDF print files'
    ],
    deliveryTimeEstimate: '12 - 24 Hours',
    isActive: true,
    inStock: true,
    tags: ['business-card', 'stationery', 'qr-code', 'print'],
    targetInputLabel: 'Cardholder Details & Contact Info',
    targetInputPlaceholder: 'Name, Title, Company, Phone, Email, Address, Website, and preferred color aesthetic...',
    targetInputHelp: 'We format all typography and generate the dynamic QR code for you.',
    tierOptions: [
      { id: 'card-standard', name: 'Modern Minimalist', amountOrDuration: 'Double-Sided + Print PDF + QR Code', price: 19.99, originalPrice: 30.00, stockStatus: 'instant' },
      { id: 'card-luxury', name: 'Luxury Foil & Texture', amountOrDuration: 'Double-Sided + UV Mask + Source Files', price: 34.99, originalPrice: 48.00, popular: true, stockStatus: 'instant' },
      { id: 'card-team', name: 'Corporate Multi-Seat (5 Cards)', amountOrDuration: 'Design for up to 5 team members', price: 65.00, originalPrice: 95.00, stockStatus: 'in_stock' }
    ]
  },
  {
    id: 'design-social-kit',
    title: 'Complete Social Media Content & Banner Kit',
    category: 'graphic_design',
    subCategory: 'Social Media Kits',
    shortDescription: '10 custom designed post templates, banner headers (YouTube, X, LinkedIn) & highlights.',
    fullDescription: 'Give your social channels an immediate visual upgrade. High-converting branded templates optimized for Instagram carousels, YouTube channel art, and LinkedIn banners.',
    badge: 'Hot',
    icon: 'Sparkle',
    rating: 4.91,
    reviewCount: 115,
    features: [
      '10 Custom Instagram / LinkedIn Post Designs',
      '3 High-Resolution Header Banners (YT, X, LinkedIn)',
      'Editable Canva Link for one-click future edits',
      'Color palette & typography styleboard'
    ],
    deliveryTimeEstimate: '24 - 36 Hours',
    isActive: true,
    inStock: true,
    tags: ['social-kit', 'canva', 'instagram-templates', 'youtube-banner'],
    targetInputLabel: 'Profile Links, Niche & Color Preferences',
    targetInputPlaceholder: 'Links to your channels, industry niche, brand colors, and type of content (Quotes, Carousels, Promo)...',
    targetInputHelp: 'You can also upload your logo and photos after ordering.',
    tierOptions: [
      { id: 'social-header-only', name: 'Header & Banner Pack', amountOrDuration: '3 Multi-Platform Banners', price: 24.99, originalPrice: 35.00, stockStatus: 'instant' },
      { id: 'social-full-kit', name: 'Complete 10-Post Kit', amountOrDuration: '10 Custom Templates + Canva Master', price: 49.99, originalPrice: 75.00, popular: true, stockStatus: 'instant' }
    ]
  }
];
