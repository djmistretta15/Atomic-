# ATOMIC Clothing

**Matter. Pattern. Purpose.**

Science-inspired apparel using real microscopy and macroscopy imagery from minerals, rocks, chemicals, insects, marine textures, and celestial matter. 100% of profits fund local education, restoration, and lab programs.

---

## 🔬 What is ATOMIC?

ATOMIC creates premium streetwear featuring authentic scientific imagery captured at 100x–10,000x magnification. Each piece includes:

- **Real microscope/macro photography** from research labs and contributors
- **Specimen Card** with scientific context (technique, magnification, taxonomy)
- **Provenance QR code** linking to specimen data and impact allocation
- **Impact routing**: 10–20% of each sale funds specific STEM programs

### Collections

1. **Microscope** — SEM/optical textures
2. **Geology** — Minerals, rocks, thin sections
3. **BioPatterns** — Insects, shells, leaf venation
4. **Marine Long Island** — Seaweed, shells (nod to LI roots)
5. **Astral** — Meteorites, space imagery

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** ≥ 8
- **PostgreSQL** database
- **Stripe** account (for payments)
- **Sanity** project (for CMS)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/atomic-clothing.git
cd atomic-clothing

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Generate Prisma client
pnpm db:generate

# Push database schema
pnpm db:push

# Seed database
pnpm seed

# Start development servers
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

**Default Admin Login:**
- Email: `admin@atomic.com`
- Password: `admin123`

---

## 📁 Repository Structure

```
atomic/
├── apps/
│   ├── web/              # Next.js 14 storefront + admin
│   └── mobile/           # Expo React Native app (QR scanner)
├── packages/
│   ├── ui/               # Radix UI design system
│   ├── config/           # Shared configs (ESLint, TS, Tailwind)
│   └── lib/              # Shared utilities, types, validations
├── services/
│   ├── cms/              # Sanity schemas + studio
│   └── worker/           # Image pipeline jobs
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed data
├── scripts/
│   ├── generate-qr.ts    # QR code generation
│   ├── build-images.ts   # Image processing pipeline
│   └── ingest-art.ts     # Artwork ingestion
├── docs/                 # Documentation
└── infra/                # Infrastructure as code
```

---

## 🛠️ Development

### Available Commands

```bash
# Development
pnpm dev                  # Start all dev servers
pnpm build                # Build all apps
pnpm lint                 # Lint all packages
pnpm typecheck            # Type-check all packages
pnpm test                 # Run tests

# Database
pnpm db:generate          # Generate Prisma client
pnpm db:push              # Push schema to DB
pnpm db:migrate           # Run migrations
pnpm seed                 # Seed database

# Assets
pnpm build:images         # Process artwork
pnpm gen:qr               # Generate QR codes
pnpm ingest:art           # Ingest new artwork

# Deployment
pnpm deploy               # Deploy to production
```

### Adding New Products

1. **Add Artwork:**
   ```bash
   # Place original image in:
   public/art/original/my-specimen.jpg

   # Create metadata file:
   public/art/original/my-specimen.yml
   ```

2. **Metadata Format:**
   ```yaml
   title: "Salt Crystal Formation"
   category: "Microscope"
   technique: "Polarized Light Microscopy"
   magnification: "1000x"
   contributor: "Dr. Sarah Moore"
   productTitle: "Salt Crystal T-Shirt"
   productDescription: "Table salt magnified 1000x..."
   priceCents: 4500
   collection: "Microscope"
   impactRoute: "north-babylon-labs"
   tags: ["crystals", "chemistry"]
   ```

3. **Ingest:**
   ```bash
   pnpm ingest:art
   ```

4. **Review & Publish** in admin dashboard

---

## 🎨 Design System

Built with **Radix UI** + **Tailwind CSS**

### Brand Colors

```typescript
--primary: #001F3F      // Deep navy
--secondary: #FFFEF7    // Off-white canvas
--accent-cyan: #00D4FF
--accent-purple: #7B2CBF
--accent-magenta: #FF006E
```

### Typography

- **Display**: Space Grotesk
- **Body**: Inter

### Components

All components in `packages/ui/src/` are built on Radix primitives with full accessibility support.

---

## 📦 Deployment

### Vercel (Recommended for Web)

```bash
# Install Vercel CLI
pnpm i -g vercel

# Deploy
cd apps/web
vercel
```

### Environment Variables

Required for production:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
STRIPE_SECRET_KEY="sk_live_..."
PRINTFUL_API_KEY="..."
SANITY_API_TOKEN="..."
MEILISEARCH_HOST="..."
```

See `.env.example` for full list.

---

## 🔌 Integrations

### Stripe (Payments)

- Checkout sessions via `stripe` SDK
- Webhook handler at `/api/webhooks/stripe`
- Customer portal for subscriptions/invoices

### Printful (Print-on-Demand)

- Adapter in `apps/web/src/lib/print/printful.ts`
- Auto-submits orders on payment
- Tracking numbers synced via webhook

### Sanity (CMS)

- Studio mounted at `/studio`
- Schemas in `services/cms/`
- Real-time preview in admin

### PostHog (Analytics)

- Events: `view_product`, `add_to_cart`, `purchase`
- Configured in `apps/web/src/lib/analytics.ts`

### Meilisearch (Search)

- Index products, collections, specimens
- Instant search UI in `/shop`

---

## 📊 Impact Tracking

Every order creates an `ImpactLedger` entry allocating a percentage of profits to the designated `ImpactRoute`.

### View Impact

- **Public**: `/impact` page shows live totals
- **Admin**: `/admin/impact` for detailed breakdowns
- **Provenance**: `/impact/{SKU}` shows per-product allocation

### Impact Routes

Configured in database (`ImpactRoute` model):

- **North Babylon School Labs** (15% split)
- **LI Beach Restoration** (10% split)
- **STEM Youth Program** (20% split)

---

## 🧪 Testing

```bash
# Unit tests
pnpm test

# E2E tests (Playwright)
cd apps/web
pnpm test:e2e

# Type checking
pnpm typecheck
```

---

## 📚 Documentation

Full docs in `/docs`:

- **[BRAND_GUIDE.md](./docs/BRAND_GUIDE.md)** — Visual identity, voice, positioning
- **[CONTENT_GUIDE.md](./docs/CONTENT_GUIDE.md)** — Writing style for specimen cards, field notes
- **[DROPS_PLAYBOOK.md](./docs/DROPS_PLAYBOOK.md)** — Limited edition launch process
- **[RUNBOOK.md](./docs/RUNBOOK.md)** — Operations, troubleshooting, monitoring
- **[LEGAL_IP.md](./docs/LEGAL_IP.md)** — Licensing, attribution, contributor agreements
- **[MARKETING_KIT.md](./docs/MARKETING_KIT.md)** — Assets, campaigns, partnerships

---

## 🤝 Contributing

### Contributors Program

ATOMIC partners with:

- **Research labs** (SEM/microscopy facilities)
- **Photographers** (macro/polarized light)
- **Marine biologists, geologists, entomologists**

**Submit imagery:** `/contributors/submit`

**Revenue share:** Optional 5–10% per product sold

### Code Contributions

1. Fork the repo
2. Create a feature branch
3. Make changes with tests
4. Submit PR with clear description

---

## 📄 License

**Code:** MIT License
**Artwork:** Rights retained by contributors; licensed to ATOMIC for merchandise

See [LEGAL_IP.md](./docs/LEGAL_IP.md) for details.

---

## 🗺️ Roadmap

### Phase 1 (MVP) ✅
- [x] Monorepo setup
- [x] Database schema
- [x] Storefront (home, shop, product detail)
- [x] Admin dashboard
- [x] Stripe checkout
- [x] Impact tracking
- [x] Seed data with 10 products

### Phase 2 (Launch)
- [ ] Sanity CMS integration
- [ ] Mobile app with QR scanner
- [ ] Printful auto-fulfillment
- [ ] Meilisearch indexing
- [ ] Email flows (Resend)
- [ ] Student/researcher verification

### Phase 3 (Growth)
- [ ] Drops system (limited editions)
- [ ] Community features (reviews, galleries)
- [ ] Contributor portal
- [ ] Advanced analytics
- [ ] International shipping

---

## 💬 Support

- **Issues:** [GitHub Issues](https://github.com/your-org/atomic-clothing/issues)
- **Email:** support@atomic-clothing.com
- **Discord:** [Join Community](https://discord.gg/atomic)

---

## 🌟 Built By

**Your Team** — Science lovers, designers, and engineers

**Special Thanks:**
- All contributing labs and photographers
- Long Island STEM community
- Open source maintainers

---

**"Built for those who look closer."**

ATOMIC Clothing • 2025 
