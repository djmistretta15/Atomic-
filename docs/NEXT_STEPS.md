# ATOMIC - Next Steps

## ⚡ Quick Start (Get Running Locally)

```bash
# 1. Install dependencies
pnpm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your actual values (at minimum: DATABASE_URL)

# 3. Set up database
pnpm db:generate
pnpm db:push
pnpm seed

# 4. Start development
pnpm dev
```

Visit http://localhost:3000

**Admin login:** admin@atomic.com / admin123

---

## 🎯 Immediate Next Steps (First Week)

### 1. Complete Missing Dependencies

Several packages need to be installed:

```bash
# Add missing dependencies to packages/lib
cd packages/lib
pnpm add clsx tailwind-merge

# Add missing dependencies to packages/ui
cd ../ui
pnpm add class-variance-authority

# Add missing dependencies to apps/web
cd ../../apps/web
pnpm add bcryptjs zustand
pnpm add -D @types/bcryptjs
```

### 2. Create Essential Missing Files

**Auth Configuration:**
```typescript
// apps/web/src/app/api/auth/[...nextauth]/route.ts
// NextAuth.js configuration
```

**Middleware:**
```typescript
// apps/web/src/middleware.ts
// Protected routes, auth checks
```

**Shop Page:**
```typescript
// apps/web/src/app/shop/page.tsx
// Product listing with filters
```

**Product Detail Page:**
```typescript
// apps/web/src/app/products/[slug]/page.tsx
// Single product view with variants
```

**Cart Page:**
```typescript
// apps/web/src/app/cart/page.tsx
// Shopping cart with checkout button
```

**API Routes:**
```typescript
// apps/web/src/app/api/checkout/route.ts
// Stripe checkout session creation

// apps/web/src/app/api/webhooks/stripe/route.ts
// Stripe webhook handler
```

### 3. Set Up External Services

**Required:**
- [ ] PostgreSQL database (Neon, Supabase, or local)
- [ ] Stripe account (test mode OK initially)
- [ ] Sanity CMS project

**Optional (can defer):**
- [ ] Meilisearch instance
- [ ] PostHog account
- [ ] Resend account
- [ ] Printful account

---

## 📋 Phase 2: Core Features (Weeks 2-4)

### E-Commerce Functionality

- [ ] Complete checkout flow
- [ ] Order confirmation emails
- [ ] Order history in account
- [ ] Inventory management in admin
- [ ] Discount code system

### Admin Dashboard

- [ ] Product CRUD
- [ ] Order management
- [ ] Inventory tracking
- [ ] Impact ledger view
- [ ] User management

### Content Management

- [ ] Sanity CMS integration
- [ ] Product sync (DB ↔ CMS)
- [ ] Image management
- [ ] Collection management

---

## 🚀 Phase 3: Growth Features (Weeks 5-8)

### Drops System

- [ ] Limited edition products
- [ ] Countdown timers
- [ ] Edition numbering
- [ ] Certificate of authenticity

### Search & Discovery

- [ ] Meilisearch integration
- [ ] Product search
- [ ] Filters (collection, price, size, color)
- [ ] Sort options

### Mobile App

- [ ] Expo app setup
- [ ] QR scanner
- [ ] Product browse
- [ ] Impact viewing

### Email Automation

- [ ] Welcome email
- [ ] Order confirmation
- [ ] Shipping notification
- [ ] Impact receipt
- [ ] Back-in-stock alerts

---

## 🎨 Content & Brand

### Imagery

1. **Get Real Microscope Images**
   - Partner with local university SEM labs
   - Reach out to Long Island Marine Lab
   - Contact geology departments

2. **Create Specimen Metadata**
   - Follow format in `scripts/ingest-art.ts`
   - Include technique, magnification, taxonomy
   - Write field notes

3. **Process Images**
   ```bash
   pnpm build:images
   pnpm gen:qr
   ```

### Product Descriptions

Use the template from `docs/BRAND_GUIDE.md`:
- Hook (what you're seeing)
- Science (what's happening)
- Field note (why it matters)
- Impact (where money goes)

---

## 🔧 Technical Improvements

### Performance

- [ ] Add Redis caching layer
- [ ] Optimize images (already using sharp)
- [ ] Implement ISR for product pages
- [ ] Edge caching for static assets

### SEO

- [ ] Sitemap generation
- [ ] Structured data (Product schema)
- [ ] OG images per product
- [ ] Meta descriptions

### Testing

- [ ] Unit tests (Vitest)
- [ ] E2E tests (Playwright)
- [ ] Load testing (k6)

### Security

- [ ] Rate limiting
- [ ] CSRF protection
- [ ] Input validation (already using Zod)
- [ ] Content Security Policy headers

---

## 📊 Analytics & Monitoring

### Set Up Tracking

- [ ] PostHog events:
  - `view_home`
  - `view_product`
  - `add_to_cart`
  - `checkout_start`
  - `purchase`
  - `qr_scan`

- [ ] Google Analytics 4
- [ ] Conversion funnel analysis

### Monitoring

- [ ] Vercel Analytics
- [ ] Error tracking (Sentry)
- [ ] Uptime monitoring (Better Uptime)
- [ ] Performance monitoring (Web Vitals)

---

## 🤝 Partnerships

### Contributor Outreach

**Month 1:**
- [ ] 3 university labs (SEM access)
- [ ] 2 marine biologists (LI specimens)
- [ ] 1 geologist (mineral imaging)

**Email Template:**
```
Subject: Partnership: Scientific Imagery → STEM Education Funding

Hi [Name],

I'm building ATOMIC—a clothing brand that turns scientific imagery into
streetwear and funds STEM education programs.

Would you be interested in contributing microscopy/macro photography?
We offer:
- Credit on every product
- Optional revenue share (5-10%)
- Your specimens reaching thousands of people
- Direct funding to educational programs you care about

Your work at [Lab/Institution] on [Topic] would be perfect for our
[Collection Name] collection.

Interested? Let's chat.

Best,
[Your Name]
```

### Impact Partners

- [ ] North Babylon School District (lab equipment)
- [ ] Long Island beach restoration orgs
- [ ] Local STEM youth programs

---

## 💰 Financial

### Pricing Strategy

Current: $45-55 per tee

Consider:
- Cost of goods (POD provider)
- Target margin (30-40%)
- Impact allocation (10-20%)
- Competitive positioning

### Revenue Projections

**Conservative (Year 1):**
- 50 orders/month × $50 avg = $2,500/month
- 20% impact = $500/month → $6,000/year donated

**Optimistic (Year 1):**
- 200 orders/month × $50 avg = $10,000/month
- 20% impact = $2,000/month → $24,000/year donated

---

## 🗓️ Launch Plan

### Soft Launch (Week 8)

- [ ] 10 products ready
- [ ] Checkout working
- [ ] Impact tracking functional
- [ ] Launch to friends/family
- [ ] Collect feedback

### Public Launch (Week 12)

- [ ] 20+ products
- [ ] Press kit ready
- [ ] Social media presence
- [ ] 3 contributor partnerships
- [ ] 1 impact partner confirmed

**Launch Checklist:**
- [ ] Product Hunt submission
- [ ] Local news outlets (LI)
- [ ] University newspapers
- [ ] Science Twitter/Reddit
- [ ] Instagram content (10+ posts ready)

### Post-Launch (Month 4+)

- [ ] Monthly drops
- [ ] Contributor spotlight series
- [ ] Impact reports
- [ ] Community events (lab tours, beach cleanups)

---

## 🎓 Student/Researcher Discounts

### Verification System

Options:
1. **SheerID** (paid service, automated)
2. **Manual verification** (email domain checking)
3. **Honor system** (risk of abuse)

**Recommended:** Start with #2 (manual), scale to #1

### Implementation

```typescript
// Discount codes with eligibility check
STUDENT25 → 25% off (verify .edu email)
RESEARCHER30 → 30% off (verify institution email)
```

---

## 📱 Marketing (First 90 Days)

### Content Strategy

**Instagram:** 3x/week
- Specimen close-ups
- Behind-the-scenes lab visits
- Contributor stories
- Impact updates

**TikTok:** 2x/week
- Zoom-in videos (macro → micro)
- "Guess the substance" series
- Lab tours

**Email:** 1x/week
- New products
- Specimen deep-dives
- Impact reports

### Partnerships

- [ ] Science YouTubers (sponsorships)
- [ ] University science clubs (affiliate codes)
- [ ] Science conferences (booth?)

---

## ⚠️ Known Limitations (Address in Phase 2)

1. **No admin UI yet** — DB direct edits only
2. **No order fulfillment** — Manual Printful orders
3. **No email** — No transactional emails
4. **No mobile app** — Web only
5. **No search** — Basic filtering only
6. **No CMS UI** — Sanity not fully integrated

---

## 📚 Resources

**Learning:**
- [Next.js 14 Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Radix UI](https://www.radix-ui.com/)

**Inspiration:**
- [The Universe Project](https://theuniverse.store/) — Space imagery
- [Everlane](https://www.everlane.com/) — Transparent pricing/impact
- [Girlfriend Collective](https://girlfriend.com/) — Sustainable fashion

**Science Resources:**
- [Nikon Small World](https://www.nikonsmallworld.com/) — Microscopy competition
- [USGS Mineral Database](https://www.usgs.gov/centers/gggsc/science/mineral-resources-program)
- [iNaturalist](https://www.inaturalist.org/) — Species observations

---

## ❓ Questions?

**Technical:** See `docs/RUNBOOK.md`
**Brand:** See `docs/BRAND_GUIDE.md`
**Legal:** See `docs/LEGAL_IP.md`

---

**You've built 70% of an MVP.** 🎉

The foundation is solid. Now: **content, partnerships, and launch.**

**"Built for those who look closer."**
