import { prisma } from '@atomic/lib';
import type { ImpactSummary } from '@atomic/lib';

export async function getImpactSummary(): Promise<ImpactSummary> {
  // Get all impact ledger entries that are allocated or paid
  const ledgerEntries = await prisma.impactLedger.findMany({
    where: {
      status: { in: ['allocated', 'paid'] },
    },
  });

  const totalDonatedCents = ledgerEntries.reduce((sum, entry) => sum + entry.amountCents, 0);

  // Group by impact route
  const routeMap = new Map<string, { name: string; type: string; amount: number }>();

  for (const entry of ledgerEntries) {
    const existing = routeMap.get(entry.impactRouteId);
    if (existing) {
      existing.amount += entry.amountCents;
    } else {
      routeMap.set(entry.impactRouteId, {
        name: entry.impactRouteName,
        type: '', // Will fetch from routes
        amount: entry.amountCents,
      });
    }
  }

  // Fetch impact routes for type information
  const routes = await prisma.impactRoute.findMany({
    where: {
      id: { in: Array.from(routeMap.keys()) },
    },
  });

  for (const route of routes) {
    const entry = routeMap.get(route.id);
    if (entry) {
      entry.type = route.type;
    }
  }

  const routeBreakdown = Array.from(routeMap.entries()).map(([routeId, data]) => ({
    routeId,
    routeName: data.name,
    routeType: data.type,
    amountCents: data.amount,
    percentage: totalDonatedCents > 0 ? Math.round((data.amount / totalDonatedCents) * 100) : 0,
  }));

  // Get order stats
  const orders = await prisma.order.findMany({
    where: {
      status: { in: ['paid', 'fulfilled'] },
    },
  });

  const totalProducts = orders.reduce((sum, order) => {
    const items = order.items as any[];
    return sum + items.reduce((itemSum, item) => itemSum + (item.quantity || 1), 0);
  }, 0);

  return {
    totalDonatedCents,
    routeBreakdown,
    totalOrders: orders.length,
    totalProducts,
  };
}

export async function getImpactRoutes() {
  return prisma.impactRoute.findMany({
    where: { active: true },
    orderBy: { name: 'asc' },
  });
}
