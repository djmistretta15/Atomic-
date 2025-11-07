# ATOMIC Runbook

**Operations, Troubleshooting, and Monitoring**

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Deployment](#deployment)
3. [Database Operations](#database-operations)
4. [Monitoring & Alerts](#monitoring--alerts)
5. [Common Issues](#common-issues)
6. [Maintenance Tasks](#maintenance-tasks)
7. [Incident Response](#incident-response)
8. [Backup & Recovery](#backup--recovery)

---

## System Architecture

### Services Overview

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  Next.js App (apps/web)                        │
│  ├── Storefront (SSR + Client)                 │
│  ├── Admin Dashboard                           │
│  ├── API Routes                                │
│  └── Server Actions                            │
│                                                 │
└────────┬────────────────────────────────┬───────┘
         │                                │
    ┌────▼─────┐                    ┌─────▼──────┐
    │          │                    │            │
    │ Postgres │                    │   Stripe   │
    │ (Neon)   │                    │            │
    │          │                    └────────────┘
    └────┬─────┘
         │
    ┌────▼────────────┐
    │                 │
    │  Sanity CMS     │
    │                 │
    └─────────────────┘

External:
- Printful (fulfillment)
- Meilisearch (search)
- PostHog (analytics)
- Resend (email)
```

### Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript
- **Database:** PostgreSQL (via Prisma ORM)
- **Auth:** NextAuth.js
- **Payments:** Stripe
- **CMS:** Sanity
- **Hosting:** Vercel (web), Neon (DB)
- **CDN:** Vercel Edge Network
- **Analytics:** PostHog, Google Analytics 4

---

## Deployment

### Production Deployment (Vercel)

```bash
# Automatic on push to main branch
git push origin main

# Manual deploy
cd apps/web
vercel --prod
```

### Environment Variables

**Critical Variables** (must be set in Vercel):

```env
# Database
DATABASE_URL=postgresql://...

# Auth
NEXTAUTH_URL=https://atomic-clothing.com
NEXTAUTH_SECRET=[generate with: openssl rand -base64 32]

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Printful
PRINTFUL_API_KEY=...

# Sanity
SANITY_API_TOKEN=...
NEXT_PUBLIC_SANITY_PROJECT_ID=...

# Search
MEILISEARCH_HOST=...
MEILISEARCH_MASTER_KEY=...

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=...
```

### Pre-Deployment Checklist

- [ ] Run `pnpm typecheck` locally
- [ ] Run `pnpm lint` locally
- [ ] Run `pnpm test` locally
- [ ] Check Prisma migrations are applied
- [ ] Verify environment variables in Vercel
- [ ] Review recent commits for breaking changes
- [ ] Notify team in Slack #deploys channel

### Rollback Procedure

**Via Vercel Dashboard:**
1. Go to Deployments
2. Find last stable deployment
3. Click "..." → "Promote to Production"

**Via CLI:**
```bash
vercel rollback
```

---

## Database Operations

### Migrations

```bash
# Create migration
cd prisma
npx prisma migrate dev --name description_of_change

# Apply to production
npx prisma migrate deploy
```

### Backup

**Automated:** Neon takes daily snapshots (7-day retention)

**Manual Backup:**
```bash
# Export database
pg_dump $DATABASE_URL > atomic_backup_$(date +%Y%m%d).sql

# Upload to S3 or safe location
aws s3 cp atomic_backup_*.sql s3://atomic-backups/
```

### Seeding

```bash
# Seed database (development only)
pnpm seed

# WARNING: Never run seed on production!
```

### Common Queries

**Check order count:**
```sql
SELECT status, COUNT(*)
FROM orders
GROUP BY status;
```

**Impact totals:**
```sql
SELECT
  impact_route_name,
  SUM(amount_cents) / 100 as total_dollars,
  COUNT(*) as num_orders
FROM impact_ledger
WHERE status IN ('allocated', 'paid')
GROUP BY impact_route_name;
```

**Low stock products:**
```sql
SELECT p.title, v.size, v.color, v.stock_qty
FROM variants v
JOIN products p ON v.product_id = p.id
WHERE v.stock_qty < 5 AND p.published = true
ORDER BY v.stock_qty ASC;
```

---

## Monitoring & Alerts

### Health Checks

**Endpoints to monitor:**

1. **Web App:** `https://atomic-clothing.com/api/health`
   - Should return 200 with `{ status: "ok" }`

2. **Database:** Check connection via Neon dashboard

3. **Stripe Webhooks:** Monitor in Stripe Dashboard > Developers > Webhooks
   - Should show successful deliveries

### Key Metrics

**Business Metrics:**
- Orders per day
- Revenue per day
- Conversion rate (visitors → orders)
- Average order value

**Technical Metrics:**
- Response time (P50, P95, P99)
- Error rate
- Database query performance
- CDN cache hit rate

**Impact Metrics:**
- Total donated (updated daily)
- Impact ledger entries created
- Pending vs. allocated funds

### Alert Thresholds

Set up alerts for:

1. **Error rate > 5%** in 5-minute window
2. **Response time P95 > 2s** for 10 minutes
3. **Database CPU > 80%** for 5 minutes
4. **Stripe webhook failures > 10** in 1 hour
5. **No orders in 24 hours** (weekday only)

### Logging

**Application Logs:**
- Vercel logs (via dashboard or CLI)
- Severity levels: `error`, `warn`, `info`, `debug`

**View logs:**
```bash
vercel logs [deployment-url]
```

**Database Logs:**
- Neon dashboard → Logs tab

---

## Common Issues

### Issue: Orders Not Creating

**Symptoms:** Stripe payment succeeds, but no order in database

**Diagnosis:**
1. Check Stripe webhook delivery (Stripe Dashboard)
2. Check Vercel logs for `/api/webhooks/stripe` errors
3. Verify webhook secret matches

**Resolution:**
```bash
# Test webhook locally
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Re-send failed events from Stripe Dashboard
```

### Issue: Images Not Loading

**Symptoms:** Product images show broken

**Diagnosis:**
1. Check image URLs in database
2. Verify images exist in `/public/art/`
3. Check Vercel deployment includes public assets

**Resolution:**
```bash
# Re-process images
pnpm build:images

# Re-deploy
git push origin main
```

### Issue: Slow Product List Page

**Symptoms:** `/shop` page loads slowly

**Diagnosis:**
1. Check database query performance (Prisma logging)
2. Check Meilisearch index status
3. Check for missing database indexes

**Resolution:**
```sql
-- Add index if missing
CREATE INDEX idx_products_published ON products(published);
CREATE INDEX idx_products_collection ON products(collection_id);
```

### Issue: Checkout Fails

**Symptoms:** Stripe Checkout session doesn't complete

**Diagnosis:**
1. Check Stripe logs for error messages
2. Verify line items are valid (price, quantity)
3. Check tax calculation service (Stripe Tax)

**Resolution:**
- Review `/api/checkout` logs
- Test checkout with Stripe test mode
- Verify product prices in cents (not dollars!)

---

## Maintenance Tasks

### Daily

- [ ] Check error logs
- [ ] Review order queue (pending fulfillment)
- [ ] Monitor low-stock alerts

### Weekly

- [ ] Review analytics (PostHog)
- [ ] Check impact ledger accuracy
- [ ] Update product inventory if needed

### Monthly

- [ ] Database performance review
- [ ] Security updates (dependencies)
- [ ] Impact report generation
- [ ] Contributor payments (if applicable)

### Quarterly

- [ ] Full backup test (restore to staging)
- [ ] SSL certificate check (Vercel auto-renews)
- [ ] Review and archive old orders (>1 year)
- [ ] Audit impact fund allocations

---

## Incident Response

### Severity Levels

**P0 - Critical:** Site down, checkout broken
- Response time: Immediate
- On-call engineer notified

**P1 - High:** Feature broken, impacting sales
- Response time: 1 hour
- Eng team notified

**P2 - Medium:** Bug affecting some users
- Response time: Next business day
- Create GitHub issue

**P3 - Low:** Minor visual issue
- Response time: Next sprint
- Add to backlog

### Incident Checklist

1. **Acknowledge:** Post in #incidents Slack channel
2. **Assess:** Determine severity and impact
3. **Communicate:** Update status page (if P0/P1)
4. **Mitigate:** Rollback or hotfix
5. **Resolve:** Verify fix in production
6. **Postmortem:** Document (within 48 hours)

### Postmortem Template

```markdown
# Incident: [Title]

**Date:** YYYY-MM-DD
**Severity:** P0/P1/P2/P3
**Duration:** X hours
**Impact:** X users affected, $X revenue lost

## Timeline

- HH:MM - Incident detected
- HH:MM - Root cause identified
- HH:MM - Fix deployed
- HH:MM - Verified resolved

## Root Cause

[What went wrong]

## Resolution

[How we fixed it]

## Action Items

- [ ] Prevent: [Steps to prevent recurrence]
- [ ] Detect: [Improve monitoring]
- [ ] Respond: [Improve response process]
```

---

## Backup & Recovery

### Database Backup Schedule

- **Automated:** Daily snapshots (Neon)
- **Manual:** Weekly full exports
- **Retention:** 30 days

### Recovery Procedure

**Scenario: Database corruption**

```bash
# 1. Get latest backup
neon branches list
neon branches restore [branch-id]

# 2. Update DATABASE_URL in Vercel

# 3. Run migrations
pnpm db:migrate

# 4. Verify data integrity
```

**Scenario: Accidental data deletion**

```bash
# Option 1: Restore from backup (see above)

# Option 2: Replay Stripe events (if order-related)
# - Go to Stripe Dashboard
# - Resend webhook events
```

### Disaster Recovery

**RTO (Recovery Time Objective):** 4 hours
**RPO (Recovery Point Objective):** 24 hours (daily backups)

**Full Site Recovery:**
1. Restore database from backup
2. Re-deploy app to Vercel
3. Verify environment variables
4. Test critical flows (checkout, admin login)
5. Monitor for 1 hour post-recovery

---

## Contact Information

**On-Call Engineer:** Pager via Slack `/oncall`
**Database Admin:** db-admin@atomic-clothing.com
**DevOps Lead:** devops@atomic-clothing.com
**External Support:**
- Vercel Support: support@vercel.com
- Stripe Support: In-dashboard chat
- Neon Support: support@neon.tech

---

**Last updated:** 2025-01-07
**Version:** 1.0
**Next review:** 2025-04-07
