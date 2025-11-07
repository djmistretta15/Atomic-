import { getImpactSummary } from '@/lib/impact';

export async function ImpactStats() {
  const impact = await getImpactSummary();

  const stats = [
    {
      label: 'Total Donated',
      value: `$${(impact.totalDonatedCents / 100).toLocaleString()}`,
    },
    {
      label: 'Orders Fulfilled',
      value: impact.totalOrders.toLocaleString(),
    },
    {
      label: 'Products Sold',
      value: impact.totalProducts.toLocaleString(),
    },
    {
      label: 'Active Programs',
      value: impact.routeBreakdown.length.toString(),
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
          <div className="text-white/80 text-sm uppercase tracking-wide">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
