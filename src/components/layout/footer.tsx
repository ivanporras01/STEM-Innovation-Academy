import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-nova-light-gray bg-nova-deep-blue text-white">
      <div className="nova-container grid gap-8 py-12 md:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-nova-cyan text-sm">✦</span>
            <div>
              <strong className="block text-sm">NOVA</strong>
              <small className="text-xs text-nova-cyan-light/70">STEM Innovation Academy</small>
            </div>
          </div>
          <p className="text-sm text-nova-cyan-light/80">
            Empowering future innovators through project-based STEM education.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Explore</h3>
          <div className="flex flex-col gap-2 text-sm text-nova-cyan-light/80">
            <Link href="/#discover" className="hover:text-white">Discover NOVA</Link>
            <Link href="/pathways" className="hover:text-white">Learning Pathways</Link>
            <Link href="/courses" className="hover:text-white">Mission Board</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Portal</h3>
          <div className="flex flex-col gap-2 text-sm text-nova-cyan-light/80">
            <Link href="/login" className="hover:text-white">Login</Link>
            <Link href="/register" className="hover:text-white">Register</Link>
            <Link href="/dashboard/student" className="hover:text-white">Student Dashboard</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Our Principle</h3>
          <p className="text-sm italic text-nova-cyan-light/80">
            Every student is a NOVA waiting to shine.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="nova-container flex flex-col items-center justify-between gap-2 py-4 text-xs text-nova-cyan-light/60 sm:flex-row">
          <p>© {new Date().getFullYear()} STEM Innovation Academy. All rights reserved.</p>
          <p>Learn • Build • Innovate</p>
        </div>
      </div>
    </footer>
  );
}
