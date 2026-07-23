import type { Metadata } from "next";
import Link from "next/link";
import { verifyCertificateByCode } from "@/lib/certificates/verification";
import { PageHero } from "@/components/ui/page-hero";
import { ShieldCheck, ShieldX, AlertTriangle, SearchX } from "lucide-react";

type Props = {
  params: Promise<{ certificateId: string }>;
  searchParams: Promise<{ token?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { certificateId } = await params;
  return { title: `Verify ${certificateId} | NOVA STEM HUB` };
}

function formatDisplayDate(date: string | null): string {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function VerifyCertificateDetailPage({
  params,
  searchParams,
}: Props) {
  const { certificateId } = await params;
  const { token } = await searchParams;
  const normalized = certificateId.trim().toUpperCase();

  const view = await verifyCertificateByCode(normalized, token || undefined);

  if (!view) {
    return (
      <div className="relative flex flex-1 flex-col">
        <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
          <PageHero
            align="center"
            eyebrow="✦ NOVA STEM HUB"
            title="Credential Not Found"
            subtitle="We could not locate a credential with the identifier you provided. Please double-check the Certificate ID and try again."
          />
        </section>
        <main className="nova-container nova-space-section flex-1">
          <div className="nova-glass-island mx-auto max-w-xl p-8 text-center">
            <SearchX className="mx-auto mb-4 h-12 w-12 text-nova-cyan/60" />
            <p className="text-lg font-semibold text-white">No matching credential</p>
            <p className="mt-2 text-sm text-nova-cyan-light/70">
              The code <strong className="text-white">{certificateId}</strong> does not
              correspond to any issued NOVA STEM HUB credential.
            </p>
            <Link href="/verify" className="nova-btn-primary nova-btn-glow mt-6 inline-flex">
              Search again
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (view.status === "revoked") {
    return (
      <div className="relative flex flex-1 flex-col">
        <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
          <PageHero
            align="center"
            eyebrow="✦ NOVA STEM HUB"
            title="Credential Revoked"
            subtitle="This credential is no longer active in the NOVA STEM HUB registry."
          />
        </section>
        <main className="nova-container nova-space-section flex-1">
          <div className="nova-glass-island mx-auto max-w-xl border-red-500/30 p-8 text-center">
            <ShieldX className="mx-auto mb-4 h-12 w-12 text-red-400" />
            <p className="text-lg font-semibold text-white">This credential has been revoked.</p>
            <p className="mt-2 text-sm text-nova-cyan-light/70">
              If you believe this is an error, contact NOVA STEM HUB support with the Certificate
              ID.
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (view.status === "replaced") {
    return (
      <div className="relative flex flex-1 flex-col">
        <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
          <PageHero
            align="center"
            eyebrow="✦ NOVA STEM HUB"
            title="Credential Replaced"
            subtitle="This credential has been replaced by a newer issuance."
          />
        </section>
        <main className="nova-container nova-space-section flex-1">
          <div className="nova-glass-island mx-auto max-w-xl border-nova-orange/30 p-8 text-center">
            <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-nova-orange" />
            <p className="text-lg font-semibold text-white">This credential has been replaced.</p>
            <p className="mt-2 text-sm text-nova-cyan-light/70">
              The holder received an updated credential. Use the most recent Certificate ID for
              verification.
            </p>
            <p className="mt-4 font-mono text-xs text-white/50">{view.certificateId}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex flex-1 flex-col">
      <section className="nova-section-cosmic relative overflow-hidden border-b border-white/10 py-16 text-white">
        <PageHero
          align="center"
          eyebrow="✦ NOVA STEM HUB"
          title="Verified Credential"
          subtitle="The credential below is registered and active in the NOVA STEM HUB system."
        />
      </section>

      <main className="nova-container nova-space-section flex-1">
        <div className="nova-glass-island mx-auto max-w-2xl overflow-hidden border-nova-green/30 p-0">
          <div className="border-b border-white/10 bg-nova-green/10 px-6 py-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-nova-green" />
              <span className="text-sm font-bold uppercase tracking-wide text-nova-green">
                Verified Credential
              </span>
            </div>
          </div>

          <dl className="grid gap-4 p-6 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-nova-cyan-light/60">Holder</dt>
              <dd className="text-lg font-semibold text-white">{view.holderName}</dd>
            </div>
            <div>
              <dt className="text-nova-cyan-light/60">Program</dt>
              <dd className="font-semibold text-white">{view.programTitle}</dd>
            </div>
            <div>
              <dt className="text-nova-cyan-light/60">Credential Title</dt>
              <dd className="text-white">{view.credentialTitle}</dd>
            </div>
            <div>
              <dt className="text-nova-cyan-light/60">Category</dt>
              <dd className="text-white">{view.category || "—"}</dd>
            </div>
            <div>
              <dt className="text-nova-cyan-light/60">Level</dt>
              <dd className="text-white">{view.credentialLevel}</dd>
            </div>
            <div>
              <dt className="text-nova-cyan-light/60">Learning Hours</dt>
              <dd className="text-white">{view.learningHours ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-nova-cyan-light/60">Completion Date</dt>
              <dd className="text-white">{formatDisplayDate(view.completionDate)}</dd>
            </div>
            <div>
              <dt className="text-nova-cyan-light/60">Issue Date</dt>
              <dd className="text-white">{formatDisplayDate(view.issueDate)}</dd>
            </div>
            <div>
              <dt className="text-nova-cyan-light/60">Final Score</dt>
              <dd className="text-white">{view.finalScore != null ? `${view.finalScore}%` : "—"}</dd>
            </div>
            <div>
              <dt className="text-nova-cyan-light/60">Passing Score</dt>
              <dd className="text-white">{view.passingScore != null ? `${view.passingScore}%` : "—"}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-nova-cyan-light/60">Certificate ID</dt>
              <dd className="font-mono text-nova-cyan-light">{view.certificateId}</dd>
            </div>
          </dl>

          <div className="border-t border-white/10 bg-white/5 px-6 py-4">
            <p className="text-xs text-nova-cyan-light/70">
              Issued by <strong className="text-white">NOVA STEM HUB</strong> · STEM Innovation
              Academy
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
