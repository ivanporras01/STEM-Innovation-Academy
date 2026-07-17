import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-nova-light-gray bg-nova-deep-blue text-white">
      <div className="nova-container grid gap-8 py-12 md:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-nova-cyan text-sm font-bold">
              ✦
            </span>
            <div>
              <strong className="block text-sm">NOVA STEM Innovation Academy</strong>
            </div>
          </div>
          <p className="text-sm text-nova-cyan-light/80">
            Empowering future innovators through practical STEM education, emerging technologies,
            mentorship, and authentic projects.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Explore</h3>
          <div className="flex flex-col gap-2 text-sm text-nova-cyan-light/80">
            <Link href="/#discover" className="hover:text-white">
              Discover NOVA
            </Link>
            <Link href="/courses" className="hover:text-white">
              Learning Pathways
            </Link>
            <Link href="/#parents" className="hover:text-white">
              For Parents
            </Link>
            <Link href="/#schools" className="hover:text-white">
              For Schools
            </Link>
            <Link href="/#contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Portal</h3>
          <div className="flex flex-col gap-2 text-sm text-nova-cyan-light/80">
            <Link href="/login" className="hover:text-white">
              Login
            </Link>
            <Link href="/register" className="hover:text-white">
              Register
            </Link>
            <Link href="/dashboard/student" className="hover:text-white">
              Explorer Dashboard
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Our Principle</h3>
          <p className="text-sm italic text-nova-cyan-light/80">
            Every NOVA Explorer has the potential to learn, build, innovate, and inspire.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="nova-container flex flex-col items-center justify-between gap-2 py-4 text-xs text-nova-cyan-light/60 sm:flex-row">
          <p>© NOVA – STEM Innovation Academy</p>
          <p>Learn • Build • Innovate • Inspire</p>
        </div>
      </div>
    </footer>
  );
}
