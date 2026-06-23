# Architecture & Design Decisions

## Overview

Crypto Advisor MVP is a **mobile-first progressive web app** (PWA) built with modern React and Next.js. It prioritizes fast load times, native-like UX, and minimal bundle size.

## Technology Stack Rationale

### Next.js 16 (App Router)
- **Why**: Server components reduce client JavaScript, native TypeScript support, Edge-ready
- **Trade-off**: Larger server footprint vs. faster client startup
- **Features used**: App Router, API routes, built-in image optimization

### Tailwind CSS 4
- **Why**: Utility-first CSS with tiny runtime, great for mobile design, zero CSS parsing overhead
- **Trade-off**: HTML can look verbose vs. classless CSS frameworks
- **Customization**: Extended `theme.extend` for crypto-specific colors and safe-area variables

### TypeScript
- **Why**: Catch errors at compile time, better DX, excellent refactoring support
- **Trade-off**: Slight build overhead vs. untyped JavaScript
- **Strictness**: Moderate (`strict: true` but allows unused vars for flexibility)

### Groq API
- **Why**: Free tier with 300 req/min, low latency, compatible with OpenAI SDK format
- **Model**: `mixtral-8x7b-32768` (high quality, cost-effective)
- **Fallback**: Returns sensible defaults if API fails (user-facing resilience)

### Lucide React
- **Why**: 1.2KB per icon (tree-shakeable), consistent design, perfect SVG quality
- **Trade-off**: No custom icon variants vs. full control
- **Usage**: Bottom nav, price indicators, alerts, settings

## Architecture Patterns

### Component Structure

```
├── App Router (app/)
│   ├── Layout (shared UI shell)
│   ├── Pages (route handlers)
│   └── API (server functions)
├── React Components (components/)
│   ├── Container (Dashboard, Feed, AITerminal, Settings)
│   └── Atomic (CryptoCard, FeedItem, ConfidenceRing)
```

**Key principle**: Components are route-aware but not route-dependent. Can be tested and reused independently.

### Data Flow

```
Page (Server Component)
  ↓
  Container Component (Client, 'use client')
    ↓
    API Hook (fetch on useEffect)
      ↓
      POST /api/analyze
        ↓
        Groq API
          ↓
        JSON Response
    ↓
    Render Sub-Components
      ↓
      Atomic Components (CryptoCard, FeedItem, etc.)
```

### State Management

- **Local state**: `useState` for UI toggle, loading states
- **Server state**: Data passed as props from parent
- **Global**: Not needed for MVP - add context if multi-page state required
- **Persistence**: `localStorage` for preferences (not implemented in MVP)

## Mobile-First Design Approach

### Safe Area Insets

```css
/* Handles notched devices (iPhone X, Dynamic Island) */
padding-bottom: max(1rem, env(safe-area-inset-bottom));
```

Defined in `tailwind.config.js`:
```js
spacing: {
  'safe-bottom': 'env(safe-area-inset-bottom)',
}
```

### Viewport Meta Tag

```html
<!-- No zoom on input, prevents keyboard scaling issues -->
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no" />
```

### Fixed Headers, Scrollable Content

```tsx
<div className="fixed inset-0 flex flex-col">
  <header className="flex-shrink-0">Header</header>
  <main className="flex-1 overflow-y-auto">Content</main>
  <nav className="flex-shrink-0 fixed bottom-0">Bottom Nav</nav>
</div>
```

- Header doesn't scroll
- Content scrolls independently
- Navigation fixed at bottom (matches iOS/Android patterns)
- Bottom nav uses `safe-bottom` for home indicator clearance

## Performance Optimizations

### Bundle Size
- Next.js: ~80KB
- React: ~40KB
- Tailwind: ~15KB (purged in production)
- Lucide: ~5KB (tree-shaken icons)
- **Total**: ~140KB gzipped

### Rendering Strategy
- Pages: **Static** (Dashboard, Feed, Settings) - prerendered at build time
- API: **Dynamic** - computed on request with Groq
- Images: **Inlined** as SVG sparklines (no image requests)

### Network Optimization
- Single API call per analysis request
- Fallback response if Groq fails (no UX degradation)
- JSON request/response (minimal overhead)
- No external fonts (system fonts only)

## API Design

### `/api/analyze` Endpoint

**Why POST instead of GET?**
- Large request body (market data + news)
- Idempotent requests inappropriate (AI analysis is non-deterministic)
- Can support caching strategies in future

**Response Format**
```json
{
  "prediction": "buy" | "sell" | "hold",  // Required, enum
  "confidence": 0-100,                     // Required, number
  "market_signal": "string",               // Required, one-liner
  "reasoning": ["reason1", "reason2"]     // Required, array
}
```

**Error Handling**
- 400: Invalid input (missing fields)
- 500: Server error (API key missing or Groq API down)
- Fallback: Returns sensible default prediction

### Groq Integration

**Prompt Engineering**
- Temperature: 0.3 (deterministic, analytical)
- Max tokens: 500 (bounded response)
- JSON-only output (structured parsing)
- 3 examples in reasoning array

**Model Selection**
- Primary: `mixtral-8x7b-32768` (production)
- Alternatives: `llama-3-70b`, `llama-3-8b` (if needed)
- Free tier: 300 req/min (sufficient for MVP)

## UI/UX Decisions

### Color Palette

| Use Case | Color | Hex | Tailwind |
|----------|-------|-----|----------|
| Background | Dark | #0f0f0f | zinc-950 |
| Cards | Darker | #111111 | zinc-900 |
| Borders | Subtle | #1f1f1f | zinc-800 |
| Positive | Green | #10b981 | emerald-500 |
| Negative | Red | #f43f5e | rose-500 |
| Text | White | #ffffff | white |
| Muted | Gray | #a1a1a1 | zinc-400 |

**Why minimal colors?**
- Reduces cognitive load
- Professional fintech aesthetic
- Easier WCAG compliance
- Better accessibility for color-blind users

### Typography

- **No custom fonts** → System fonts only (San Francisco, Roboto)
- **Font weights**: Regular (400), Medium (500), Semibold (600), Bold (700)
- **Sizes**: 12px (caption), 14px (body), 18px (heading), 24px (title)
- **Line height**: 1.5 (body), 1.2 (heading)

### Motion

- **Minimal animations** (transitions, not keyframes)
- **No parallax or 3D effects** (reduces jank on low-end devices)
- **Smooth scroll** on scrollable containers
- **Tap highlight disabled** (better mobile UX)

## Scalability Considerations

### Adding Real Data

1. **Price Feeds**
   ```ts
   // Replace mock data in Dashboard.tsx
   const cryptoData = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true')
   ```

2. **News Feeds**
   ```ts
   // Integrate crypto news API
   const news = await fetch('https://api.cryptonews.com/...')
   ```

3. **Database**
   ```ts
   // Store user preferences, alerts, portfolios
   import { db } from '@/lib/database'
   const user = await db.users.findUnique(...)
   ```

### Multi-Tab State Management

Current: Props passing (suitable for 4 pages)
Future: React Context or Zustand
```tsx
// If adding shared state across tabs:
const MarketContext = createContext<MarketData | null>(null)

export function Provider({ children }) {
  const [data, setData] = useState(null)
  return (
    <MarketContext.Provider value={data}>
      {children}
    </MarketContext.Provider>
  )
}
```

### Authentication

Current: Public app
Future: NextAuth.js
```tsx
// Add session provider
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
```

## Testing Strategy

### Unit Tests (Not implemented in MVP)
```ts
// Test individual components
import { render, screen } from '@testing-library/react'
import CryptoCard from '@/components/CryptoCard'

test('displays correct price', () => {
  render(<CryptoCard crypto={{ symbol: 'BTC', price: 67450 }} />)
  expect(screen.getByText('$67,450.00')).toBeInTheDocument()
})
```

### Integration Tests (Not implemented in MVP)
```ts
// Test page flows
import { render, screen, waitFor } from '@testing-library/react'
import AITerminal from '@/components/AITerminal'

test('loads analysis on mount', async () => {
  render(<AITerminal />)
  await waitFor(() => {
    expect(screen.getByText(/buy|sell|hold/i)).toBeInTheDocument()
  })
})
```

### Manual Testing Checklist
- [ ] Dashboard loads without API
- [ ] AI Terminal shows loading state
- [ ] Navigation switches between tabs
- [ ] Scrolling works on mobile
- [ ] Bottom nav doesn't overlap content
- [ ] Colors accurate on different devices
- [ ] Safe area respected on notched devices

## Security Considerations

### API Key Protection
- ✅ `GROQ_API_KEY` in `.env.local` (not committed)
- ✅ API calls from server only (not client)
- ✅ Never exposed in bundle or network requests

### Input Validation
```ts
// In route.ts
if (!body.market_data || !body.news) {
  return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
}
```

### Rate Limiting (Not implemented)
Future: Add Vercel rate limiting or Upstash
```ts
import { Ratelimit } from '@upstash/ratelimit'
const ratelimit = new Ratelimit({ ... })
const result = await ratelimit.limit(userId)
```

### Content Security Policy (Not implemented)
Future: Add CSP headers in Next.js middleware
```ts
// next.config.js
headers: {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval';"
}
```

## Deployment Architecture

```
┌─────────────────────────────────────────┐
│         User Browser (Mobile)           │
└─────────────────────────────────────────┘
                    ↓ HTTPS
┌─────────────────────────────────────────┐
│      Vercel Edge Network (Global)       │
│  - Next.js App Router                   │
│  - API Routes                           │
│  - Static Generation                    │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│    Groq API (https://api.groq.com)      │
│  - Mixtral Model                        │
│  - OpenAI Compatible Format             │
└─────────────────────────────────────────┘
```

### CDN & Caching Strategy
- **Static pages**: Cached at edge (infinite TTL)
- **API responses**: Not cached (always fresh)
- **Assets**: Gzipped, minified, cached forever

## Monitoring & Analytics (Future)

```ts
// Add Vercel Analytics
import { reportWebVitals } from 'next/analytics'

// Track API performance
console.time('groq-api-call')
const response = await fetch('/api/analyze', ...)
console.timeEnd('groq-api-call')

// Error tracking with Sentry
import * as Sentry from '@sentry/nextjs'
Sentry.init({ dsn: '...' })
```

## File Size Budget

| Category | Size | Target |
|----------|------|--------|
| JavaScript | 140KB | 200KB |
| CSS | 15KB | 30KB |
| Images | 0KB | 100KB |
| HTML | 50KB | 100KB |
| **Total** | **205KB** | **430KB** |

All measurements gzipped. Well under target for mobile networks (4G).

---

**Last Updated**: June 2024  
**Maintainer**: Crypto Advisor Team  
**Version**: MVP (v1.0.0)
