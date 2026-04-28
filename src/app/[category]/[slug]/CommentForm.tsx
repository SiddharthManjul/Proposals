"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import type { Category } from "@/lib/proposals";

type Props = {
  category: Category;
  slug: string;
  parentId?: string;
  onPosted?: () => void;
  compact?: boolean;
};

export function CommentForm({ category, slug, parentId, onPosted, compact }: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [author, setAuthor] = useState("");
  const [handle, setHandle] = useState("");
  const [body, setBody] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPosting(true);

    try {
      const res = await fetch(
        `/api/proposals/${category.toLowerCase()}/${encodeURIComponent(slug)}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            author: author.trim(),
            handle: handle.trim().replace(/^@/, ""),
            body: body.trim(),
            parentId,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to post.");
        setPosting(false);
        return;
      }
      setAuthor("");
      setHandle("");
      setBody("");
      setPosting(false);
      onPosted?.();
      startTransition(() => router.refresh());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error.");
      setPosting(false);
    }
  }

  return (
    <div
      className={
        compact
          ? "mt-4 border border-rule p-4 bg-tint/40"
          : "mt-10 border border-rule p-6 md:p-8"
      }
    >
      <div className="kicker mb-3">
        {parentId ? "Reply to comment" : "Add to the record"}
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
              Your name
            </span>
            <input
              type="text"
              required
              minLength={2}
              maxLength={120}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Reema Khan"
              className="mt-1 block w-full bg-paper border-b border-rule focus:border-accent outline-none py-2 text-[15px]"
            />
          </label>
          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
              Handle
            </span>
            <input
              type="text"
              required
              minLength={2}
              maxLength={80}
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="e.g. reema.eth"
              className="mt-1 block w-full bg-paper border-b border-rule focus:border-accent outline-none py-2 text-[15px]"
            />
          </label>
        </div>
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
            {parentId ? "Your reply" : "Reply"}
          </span>
          <textarea
            rows={parentId ? 4 : 6}
            required
            minLength={2}
            maxLength={5000}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="State your position. Cite specifics. Don't argue with the headline."
            className="mt-1 block w-full bg-paper border border-rule focus:border-accent outline-none p-3 text-[15px] leading-[1.6] resize-y"
          />
        </label>
        {error && (
          <div className="border border-accent/60 bg-accent-wash p-3 text-[13px] text-ink">
            {error}
          </div>
        )}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
            Replies are public and kept permanently.
          </p>
          <button
            type="submit"
            disabled={posting}
            className="bg-accent text-paper px-6 py-3 font-mono text-[12px] uppercase tracking-[0.16em] hover:bg-accent-deep transition-colors disabled:opacity-50"
          >
            {posting ? "Posting…" : parentId ? "Post reply →" : "Post reply →"}
          </button>
        </div>
      </form>
    </div>
  );
}
