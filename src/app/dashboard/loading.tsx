export default function DashboardLoading() {
  return (
    <div className="nova-container animate-pulse py-8">
      <div className="mb-8 h-8 w-64 rounded-lg bg-white/10" />
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="nova-glass-card h-24 bg-white/5" />
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2].map((i) => (
          <div key={i} className="nova-glass-card h-48 bg-white/5" />
        ))}
      </div>
    </div>
  );
}
