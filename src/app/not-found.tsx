import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-nova-off-white px-4 text-center">
      <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-nova-cyan to-nova-blue text-2xl text-white">
        ✦
      </span>
      <h1 className="text-4xl font-bold text-nova-deep-blue">404</h1>
      <p className="mt-2 max-w-md text-nova-gray">
        This page doesn&apos;t exist in the NOVA universe yet.
      </p>
      <Link href="/" className="nova-btn-primary mt-6">
        Back to Home
      </Link>
    </div>
  );
}
