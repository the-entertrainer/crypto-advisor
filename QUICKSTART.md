# Crypto Advisor MVP - Quick Start Guide

Get the app running in under 5 minutes.

## ⚡ Prerequisites

- **Node.js 18+** ([download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Groq API Key** (free from [console.groq.com](https://console.groq.com))

## 🚀 Quick Setup

### 1. Get Your Groq API Key (2 minutes)

```bash
# Visit and sign up
https://console.groq.com

# Create a new API key:
# 1. Click "API Keys" in sidebar
# 2. Click "Create New API Key"
# 3. Copy the key
```

### 2. Setup Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
GROQ_API_KEY=your_api_key_here
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

The app opens at **[http://localhost:3000](http://localhost:3000)**

### 5. Test on Mobile

Open in browser DevTools (F12):
- iOS: Rotate to portrait, device emulation → iPhone 14 Pro
- Android: Device emulation → Pixel 7

Or scan with phone:
```bash
# Find your machine's IP
ipconfig getifaddr en0  # macOS
hostname -I            # Linux
ipconfig                # Windows

# Open on phone:
http://<your-ip>:3000
```

## 🎯 What You Get

### Dashboard (`/`)
- Live BTC, ETH, SOL price tracking
- 24-hour change indicators with colors
- Sparkline charts
- Market overview stats
- Quick action buttons

### Feed (`/feed`)
- Global news timeline
- Whistleblower alerts
- Impact severity badges
- Asset tags
- Time-based sorting

### AI Terminal (`/terminal`)
- Groq-powered market predictions
- Buy/Sell/Hold signals
- Confidence ring gauge
- Reasoning breakdown
- Refresh for new analysis

### Settings (`/settings`)
- Notification preferences
- Display settings
- Security configuration
- App information

## 🎨 Design System

**Colors:**
- Dark background: `#0f0f0f` (zinc-950)
- Cards: `#111111` (zinc-900)
- Positive: `#10b981` (emerald-500)
- Negative: `#f43f5e` (rose-500)

**Fonts:**
- System font stack (native iOS/Android fonts)
- No external font dependencies

**Spacing:**
- 4px base unit (Tailwind default)
- 16px content padding
- 80px bottom nav height

## 🔑 API Endpoints

### `POST /api/analyze`

Analyzes market data using Groq AI.

**Request:**
```json
{
  "market_data": {
    "btc_price": 67450,
    "btc_change_24h": 2.45,
    "eth_price": 3520,
    "eth_change_24h": 1.82,
    "sol_price": 142.8,
    "sol_change_24h": -1.23
  },
  "news": "Bitcoin ETF approval, Ethereum Merge 2.0 update, Large whale movements detected"
}
```

**Response:**
```json
{
  "prediction": "buy",
  "confidence": 78,
  "market_signal": "Market showing strong momentum with ETF approvals",
  "reasoning": [
    "Bitcoin positive momentum +2.45% 24h",
    "Institutional adoption signals from ETF approval",
    "Whale movement detected but not concerning",
    "Next resistance at 68,500"
  ]
}
```

## 📱 Mobile Experience

- **Safe area support** for notched devices (iPhone X+, Dynamic Island)
- **Native scrolling** with fixed headers
- **No zoom on input** (prevents iOS autoscaling)
- **Custom scrollbar** styling
- **Touch-optimized** button sizes (44px minimum)
- **PWA ready** for home screen installation

## 🛠️ Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Run production build locally
npm run start

# Type checking
npx tsc --noEmit
```

## 🌐 Deploy to Vercel (1 minute)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Vercel will ask you to:
1. Confirm project directory
2. Set `GROQ_API_KEY` environment variable
3. Deploy

Your app will be live at a `.vercel.app` domain.

## 📊 Project Structure

```
.
├── app/                          # Next.js app router
│   ├── api/analyze/             # Groq API integration
│   ├── layout.tsx               # Root layout with nav
│   ├── page.tsx                 # Dashboard
│   ├── feed/page.tsx            # Feed
│   ├── terminal/page.tsx        # AI analysis
│   ├── settings/page.tsx        # Settings
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── BottomNavigation.tsx     # Navigation bar
│   ├── Dashboard.tsx            # Dashboard screen
│   ├── CryptoCard.tsx           # Price cards
│   ├── Feed.tsx                 # News feed
│   ├── FeedItem.tsx             # Feed item
│   ├── AITerminal.tsx           # AI analysis
│   ├── ConfidenceRing.tsx       # Confidence indicator
│   └── Settings.tsx             # Settings screen
├── public/                       # Static assets
│   ├── manifest.json            # PWA manifest
│   └── robots.txt
├── next.config.js               # Next.js config
├── tailwind.config.js           # Tailwind config
├── tsconfig.json                # TypeScript config
└── package.json
```

## 🚨 Troubleshooting

### "GROQ_API_KEY is not set"
- Make sure `.env.local` exists in root directory
- Add your API key to `.env.local`
- Restart dev server after adding key

### Build fails
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

### Mobile not loading
```bash
# Find your machine IP
ipconfig getifaddr en0  # macOS
ipconfig                # Windows
hostname -I             # Linux

# Visit: http://<your-ip>:3000
```

## 📚 Next Steps

### Real Data Integration
1. **Prices**: Connect to CoinGecko/Binance API
2. **News**: Integrate CryptoNews API or Twitter API
3. **Alerts**: Add database for user preferences

### User Features
1. Add authentication (NextAuth.js)
2. Create user accounts/portfolios
3. Save preferences to database
4. Push notifications for alerts

### Analytics
1. Add Vercel Analytics
2. Track user behavior
3. Monitor API usage

## 💡 Tips

- **Faster Dev**: Use mobile browser DevTools instead of phone emulator
- **Testing**: Use Network tab to simulate slow API responses
- **Styling**: Tailwind docs at [tailwindcss.com](https://tailwindcss.com)
- **Icons**: Lucide icon browser at [lucide.dev](https://lucide.dev)

## ❓ Need Help?

- **Groq API Docs**: https://console.groq.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **TypeScript Docs**: https://www.typescriptlang.org/docs

---

**Happy building! 🚀**
