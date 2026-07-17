export default function CoursesLoading() {
  return (
    <div className="nova-container animate-pulse py-12">
      <div className="mx-auto mb-10 h-10 w-80 rounded-lg bg-nova-light-gray" />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="nova-card h-64 bg-nova-light-gray/50" />
        ))}
      </div>
    </div>
  );
}
