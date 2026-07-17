"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "STUDENT" as "STUDENT" | "MENTOR" | "PARENT",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Registration failed");
        return;
      }

      router.push("/login?registered=1");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="nova-label">First name</label>
          <input
            id="firstName"
            required
            className="nova-input"
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="nova-label">Last name</label>
          <input
            id="lastName"
            required
            className="nova-input"
            value={form.lastName}
            onChange={(e) => update("lastName", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="nova-label">Email</label>
        <input
          id="email"
          type="email"
          required
          className="nova-input"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password" className="nova-label">Password</label>
        <input
          id="password"
          type="password"
          required
          minLength={6}
          className="nova-input"
          value={form.password}
          onChange={(e) => update("password", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="role" className="nova-label">I am a...</label>
        <select
          id="role"
          className="nova-input"
          value={form.role}
          onChange={(e) => update("role", e.target.value)}
        >
          <option value="STUDENT">NOVA Explorer (Student)</option>
          <option value="MENTOR">Innovation Mentor</option>
          <option value="PARENT">Parent / Guardian</option>
        </select>
      </div>

      <button type="submit" disabled={loading} className="nova-btn-primary w-full disabled:opacity-60">
        {loading ? "Creating account..." : "Create NOVA Account"}
      </button>

      <p className="text-center text-sm text-nova-gray">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-nova-cyan hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
