"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  CATEGORIES,
  proposalRef,
  shortDate,
  type Category,
  type Proposal,
  type Status,
} from "@/lib/proposals";
import { StatusPill } from "@/components/StatusPill";
import { StatusSelect } from "@/components/StatusSelect";
import { KindBadge } from "@/components/KindBadge";

type SessionInfo = {
  authenticated: boolean;
  email?: string;
  expiresAt?: string;
};

export function AdminPanel() {
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [proposals, setProposals] = useState<Proposal[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Category | "all">("all");
  const [pendingSlug, setPendingSlug] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);

  const refreshSession = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/session", { cache: "no-store" });
      const data: SessionInfo = await res.json();
      setSession(data);
      return data;
    } catch {
      setSession({ authenticated: false });
      return { authenticated: false } as SessionInfo;
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const loadProposals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/proposals?sort=updated", {
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to load proposals.");
        setProposals([]);
      } else {
        setProposals(data.proposals);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error.");
      setProposals([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session?.authenticated) loadProposals();
  }, [session?.authenticated, loadProposals]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setSession({ authenticated: false });
    setProposals(null);
  }

  async function changeStatus(p: Proposal, status: Status) {
    setPendingSlug(p.slug);
    setFlash(null);
    setError(null);
    try {
      const res = await fetch(
        `/api/proposals/${p.category.toLowerCase()}/${encodeURIComponent(p.slug)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      // Read as text first so an empty / non-JSON response doesn't crash
      // the client with "Unexpected end of JSON input".
      const raw = await res.text();
      let data: { error?: string; proposal?: Proposal } | null = null;
      if (raw) {
        try {
          data = JSON.parse(raw);
        } catch {
          // body wasn't JSON — leave data null and use status text below
        }
      }

      if (!res.ok) {
        const message =
          data?.error ??
          (raw && raw.length < 240 ? raw : null) ??
          `Status update rejected (HTTP ${res.status} ${res.statusText || ""}).`.trim();
        setError(message);
        if (res.status === 401) {
          await refreshSession();
        }
        return;
      }

      if (!data?.proposal) {
        setError("Server returned an empty response.");
        return;
      }

      setProposals((curr) =>
        curr
          ? curr.map((x) =>
              x.category === p.category && x.slug === p.slug
                ? {
                    ...x,
                    status: data!.proposal!.status,
                    updated: data!.proposal!.updated,
                  }
                : x
            )
          : curr
      );
      setFlash(`${proposalRef(p)} → ${status}`);
      setTimeout(() => setFlash(null), 2500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error.");
    } finally {
      setPendingSlug(null);
    }
  }

  const filtered = useMemo(() => {
    if (!proposals) return null;
    return filter === "all"
      ? proposals
      : proposals.filter((p) => p.category === filter);
  }, [proposals, filter]);

  if (!session) {
    return <p className="font-display italic text-ink-soft py-10">Loading…</p>;
  }

  if (!session.authenticated) {
    return <LoginForm onLoggedIn={refreshSession} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-rule">
        <div className="flex items-center gap-2 flex-wrap">
          <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
            All
            <span className="ml-2 text-ink-faint tabular-nums">
              {proposals?.length ?? 0}
            </span>
          </FilterButton>
          {CATEGORIES.map((c) => {
            const n = proposals?.filter((p) => p.category === c.code).length ?? 0;
            return (
              <FilterButton
                key={c.code}
                active={filter === c.code}
                onClick={() => setFilter(c.code)}
              >
                {c.code}
                <span className="ml-2 text-ink-faint tabular-nums">{n}</span>
              </FilterButton>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          {flash && (
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              ✓ {flash}
            </span>
          )}
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint hidden md:inline">
            Signed in as <span className="text-ink normal-case">{session.email}</span>
          </span>
          <button
            type="button"
            onClick={loadProposals}
            disabled={loading}
            className="border border-rule px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] hover:bg-tint transition-colors disabled:opacity-50"
          >
            {loading ? "Loading…" : "Refresh"}
          </button>
          <button
            type="button"
            onClick={logout}
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint hover:text-accent transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>

      {error && (
        <div className="border border-accent/60 bg-accent-wash p-4 text-[13px] text-ink">
          <span className="font-mono uppercase tracking-[0.14em] text-[11px] text-accent-deep mr-2">
            Error
          </span>
          {error}
        </div>
      )}

      {!proposals ? (
        <p className="font-display italic text-ink-soft py-10">Loading…</p>
      ) : filtered && filtered.length === 0 ? (
        <p className="font-display italic text-ink-soft py-10">
          No proposals yet. {filter !== "all" ? `Filter: ${filter}.` : null}
        </p>
      ) : (
        <div className="border border-rule overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="bg-tint border-b border-rule">
              <tr className="text-left font-mono uppercase tracking-[0.14em] text-[11px] text-ink-faint">
                <th className="px-4 py-3">Ref</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {filtered!.map((p) => (
                <tr key={`${p.category}-${p.slug}`} className="align-top">
                  <td className="px-4 py-3 font-mono text-[11px] tracking-[0.14em] text-accent whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span>{proposalRef(p)}</span>
                      <KindBadge kind={p.kind} />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/${p.category.toLowerCase()}/${p.slug}`}
                      className="font-display font-medium text-ink hover:text-accent-deep tracking-[-0.01em]"
                    >
                      {p.title}
                    </Link>
                    <div className="mt-1 text-[12px] text-ink-faint truncate max-w-[60ch]">
                      {p.abstract}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-ink-soft whitespace-nowrap">
                    {p.author}
                    <div className="text-ink-faint font-mono text-[11px]">
                      @{p.authorHandle}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-ink-faint whitespace-nowrap">
                    {shortDate(p.updated)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusPill status={p.status} />
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <StatusSelect
                      value={p.status}
                      disabled={pendingSlug === p.slug}
                      onChange={(next) => changeStatus(p, next)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] border transition-colors ${
        active
          ? "border-accent bg-accent text-paper"
          : "border-rule text-ink hover:bg-tint"
      }`}
    >
      {children}
    </button>
  );
}

function LoginForm({ onLoggedIn }: { onLoggedIn: () => Promise<SessionInfo> }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error ?? "Login failed.");
        setSubmitting(false);
        return;
      }
      await onLoggedIn();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Network error.");
      setSubmitting(false);
    }
  }

  return (
    <div className="grid grid-cols-12 gap-10">
      <div className="col-span-12 md:col-span-7">
        <div className="kicker mb-3">Sign in</div>
        <h2 className="font-display font-semibold text-[1.8rem] leading-[1.05] tracking-[-0.02em] mb-3">
          Email and password.
        </h2>
        <p className="font-display italic text-ink-soft text-[15px] leading-[1.55] mb-6 max-w-[60ch]">
          Sign in once and stay signed in for 30 days. The session is held in
          an HttpOnly cookie — no token to copy, no token to leak.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-[480px]">
          <label className="block">
            <div className="kicker mb-2">Email</div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              autoFocus
              className="block w-full bg-paper border border-rule focus:border-accent outline-none p-3 text-[15px]"
            />
          </label>
          <label className="block">
            <div className="kicker mb-2">Password</div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              className="block w-full bg-paper border border-rule focus:border-accent outline-none p-3 font-mono text-[14px]"
            />
          </label>
          {err && (
            <div className="border border-accent/60 bg-accent-wash p-3 text-[13px] text-ink">
              {err}
            </div>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="bg-accent text-paper px-6 py-3 font-mono text-[12px] uppercase tracking-[0.16em] hover:bg-accent-deep transition-colors disabled:opacity-50"
          >
            {submitting ? "Signing in…" : "Continue →"}
          </button>
        </form>
      </div>
      <aside className="col-span-12 md:col-span-5 md:border-l md:border-rule md:pl-8">
        <div className="kicker mb-3">What you can do here</div>
        <ul className="space-y-3 text-[14px] text-ink-soft leading-[1.6]">
          <li>
            <span className="text-ink font-medium">Move statuses.</span> Draft →
            Discussion → Last Call → Accepted / Rejected / Implemented / Living.
          </li>
          <li>
            <span className="text-ink font-medium">Filter by category.</span>{" "}
            CIP, EIP, CMIP, PIP, or all of them.
          </li>
          <li>
            <span className="text-ink font-medium">Audit at a glance.</span> The
            list is sorted by last activity.
          </li>
        </ul>
        <div className="mt-8 divider-dashed" />
        <p className="mt-6 text-[13px] text-ink-faint leading-[1.65]">
          Admin accounts live in the database. Create one from the terminal:{" "}
          <code className="font-mono whitespace-nowrap">npm run admin -- create you@email.com password</code>.
          Reset with <code className="font-mono">reset</code>; list with{" "}
          <code className="font-mono">list</code>.
        </p>
      </aside>
    </div>
  );
}
