"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "خطأ في تسجيل الدخول.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-8 rounded-2xl border border-border bg-white">
        <h1 className="font-head text-xl font-semibold mb-1">لوحة التحكم</h1>
        <p className="text-sm text-slate-500 mb-6">Cabinet Hassar — دخول الأدمن</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="كلمة السر"
          className="w-full px-4 py-3 rounded-lg border border-border bg-bg text-sm mb-4"
          autoFocus
        />
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full py-3 font-semibold text-sm bg-navy text-white disabled:opacity-60"
        >
          {loading ? "..." : "دخول"}
        </button>
      </form>
    </div>
  );
}
