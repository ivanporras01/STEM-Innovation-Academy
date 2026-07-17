import Link from "next/link";
import { NOVA_FOOTER_EXPLORE, NOVA_FOOTER_PORTAL } from "@/lib/nova-nav";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#030712]/50 text-white backdrop-blur-md">
      <div className="relative">
        <div className="nova-container grid gap-8 py-12 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-nova-cyan text-sm font-bold shadow-[0_0_16px_rgba(0,180,216,0.4)]">
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
            <h3 className="mb-3 text-sm font-semibold">Explore the Universe</h3>
            <div className="flex flex-col gap-2 text-sm text-nova-cyan-light/80">
              {NOVA_FOOTER_EXPLORE.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Portal</h3>
            <div className="flex flex-col gap-2 text-sm text-nova-cyan-light/80">
              {NOVA_FOOTER_PORTAL.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
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
      </div>
    </footer>
  );
}
