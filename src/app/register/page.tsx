import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Register — NOVA Portal",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center py-12">
        <div className="nova-container max-w-lg">
          <div className="nova-card shadow-nova">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-nova-deep-blue">Join NOVA</h1>
              <p className="mt-1 text-sm text-nova-gray">
                Create your Explorer account and begin your NOVA journey
              </p>
            </div>
            <RegisterForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
