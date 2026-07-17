export default function DashboardLoading() {
  return (
    <div className="nova-container animate-pulse py-8">
      <div className="mb-8 h-8 w-64 rounded-lg bg-nova-light-gray" />
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="nova-card h-24 bg-nova-light-gray/50" />
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2].map((i) => (
          <div key={i} className="nova-card h-48 bg-nova-light-gray/50" />
        ))}
      </div>
    </div>
  );
}
