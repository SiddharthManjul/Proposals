"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { CATEGORIES, type Category } from "@/lib/proposals";
import { parseBody } from "@/lib/parseBody";
import { BodyPreview, PreviewTabs } from "@/components/BodyPreview";

const READING_WORDS_PER_MIN = 220;

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 160);
}

function estimateReadingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / READING_WORDS_PER_MIN));
}

type Status = "idle" | "submitting" | "ok" | "error";

export function SubmitForm() {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [category, setCategory] = useState<Category>(CATEGORIES[0].code);
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [handle, setHandle] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [issues, setIssues] = useState<{ path: string; message: string }[]>([]);
  const [bodyMode, setBodyMode] = useState<"write" | "preview">("write");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);
    setIssues([]);

    const sections = parseBody(body);
    if (sections.length === 0) {
      setStatus("error");
      setErrorMsg("The body can't be empty.");
      return;
    }

    const payload = {
      category,
      slug: slugify(title),
      title: title.trim(),
      abstract: abstract.trim(),
      author: author.trim(),
      authorHandle: handle.trim().replace(/^@/, ""),
      body: sections,
      readingMinutes: estimateReadingMinutes(body),
    };

    try {
      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong.");
        if (Array.isArray(data.issues)) {
          setIssues(
            data.issues.map((i: { path: (string | number)[]; message: string }) => ({
              path: i.path.join("."),
              message: i.message,
            }))
          );
        }
        return;
      }
      setStatus("ok");
      const proposal = data.proposal;
      startTransition(() => {
        router.push(
          `/${String(proposal.category).toLowerCase()}/${proposal.slug}`
        );
        router.refresh();
      });
    } catch (e) {
      setStatus("error");
      setErrorMsg(
        e instanceof Error ? e.message : "Network error. Try again in a moment."
      );
    }
  }

  const submitting = status === "submitting";

  const bodyPlaceholder =
    category === "SIP"
      ? `One-sentence framing of the wedge.\n\n## Problem\nThe specific failure mode this addresses.\n\n## Wedge\nWhy this team or shape can take it.\n\n## Why now\nWhat changed in the last 12 months that makes this fundable.\n\n## What's already been tried\n- A previous attempt and what stopped it\n- Another shape and why it didn't work\n\n## Open questions\nThe honest ones — not rhetorical.`
      : `The first paragraph reads like a lede.\n\n## Specification\n- Bullet one\n- Bullet two\n\n## Open questions\n\nA paragraph here.`;

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div>
        <div className="kicker mb-3">Step 01 — Category</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-rule">
          {CATEGORIES.map((c, i) => (
            <label
              key={c.code}
              className={`relative cursor-pointer p-4 hover:bg-accent-wash transition-colors ${
                i < CATEGORIES.length - 1
                  ? "border-b sm:border-b-0 sm:border-r border-rule"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="category"
                value={c.code}
                className="sr-only peer"
                checked={category === c.code}
                onChange={() => setCategory(c.code)}
              />
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent mb-2">
                {c.code}
              </div>
              <div className="font-display font-semibold text-[14px] tracking-[-0.01em] text-ink leading-tight">
                {c.full}
              </div>
              <div
                aria-hidden
                className="absolute inset-0 border-2 border-accent opacity-0 peer-checked:opacity-100 pointer-events-none"
              />
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="kicker mb-3">Step 02 — Title</div>
        <input
          type="text"
          required
          minLength={8}
          maxLength={200}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="A specific verb. A specific noun. Skip the adjectives."
          className="block w-full bg-paper border-b border-rule focus:border-accent outline-none py-3 text-[1.4rem] font-display tracking-[-0.01em]"
        />
        <p className="mt-2 text-[12px] text-ink-faint italic">
          Slug will be: <span className="font-mono text-ink-soft">{title ? slugify(title) : "—"}</span>
        </p>
      </div>

      <div>
        <div className="kicker mb-3">Step 03 — Abstract</div>
        <textarea
          rows={4}
          required
          minLength={40}
          maxLength={800}
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          placeholder="Two or three sentences. State the problem and the proposed change. Don't sell it."
          className="block w-full bg-paper border border-rule focus:border-accent outline-none p-4 text-[15px] leading-[1.65] resize-y"
        />
      </div>

      <div>
        <div className="kicker mb-3">Step 04 — Body</div>
        <PreviewTabs mode={bodyMode} onChange={setBodyMode} />
        {bodyMode === "write" ? (
          <textarea
            rows={14}
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={bodyPlaceholder}
            className="block w-full bg-paper border border-rule focus:border-accent outline-none p-4 text-[15px] leading-[1.7] resize-y font-mono"
          />
        ) : (
          <BodyPreview body={body} />
        )}
        <p className="mt-2 text-[12px] text-ink-faint italic leading-[1.55]">
          <span className="block">
            Sections: <code className="font-mono not-italic">## Heading</code> ·
            Lists: <code className="font-mono not-italic">- item</code> ·
            Pullquote: <code className="font-mono not-italic">&gt; line</code> ·
            Paragraphs split on blank lines.
          </span>
          <span className="block mt-1">
            Inline: <code className="font-mono not-italic">**bold**</code>,{" "}
            <code className="font-mono not-italic">*italic*</code>,{" "}
            <code className="font-mono not-italic">`code`</code>,{" "}
            <code className="font-mono not-italic">[label](https://url)</code>.
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="block">
          <div className="kicker mb-2">Your name</div>
          <input
            type="text"
            required
            minLength={2}
            maxLength={120}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="As you'd like to be credited"
            className="block w-full bg-paper border-b border-rule focus:border-accent outline-none py-2 text-[15px]"
          />
        </label>
        <label className="block">
          <div className="kicker mb-2">Handle</div>
          <input
            type="text"
            required
            minLength={2}
            maxLength={80}
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="ENS, GitHub, or whatever you'd be reached at"
            className="block w-full bg-paper border-b border-rule focus:border-accent outline-none py-2 text-[15px]"
          />
        </label>
      </div>

      {status === "error" && errorMsg && (
        <div className="border border-accent/60 bg-accent-wash p-4 text-[13px] text-ink">
          <div className="font-mono uppercase tracking-[0.14em] text-[11px] text-accent-deep mb-1">
            Submission rejected
          </div>
          <p>{errorMsg}</p>
          {issues.length > 0 && (
            <ul className="mt-2 list-disc pl-5 text-ink-soft">
              {issues.map((i, n) => (
                <li key={n}>
                  <span className="font-mono">{i.path}</span>: {i.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {status === "ok" && (
        <div className="border border-accent/60 bg-accent-wash p-4 text-[13px] text-ink">
          Submitted. Redirecting to the proposal…
        </div>
      )}

      <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-rule">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint max-w-[40ch]">
          Submitted as <em className="not-italic text-ink">Idea</em>. An editor
          moves it through Execution → MVP → PMF → Production as the venture
          ships.
        </p>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="bg-accent text-paper px-6 py-3 font-mono text-[12px] uppercase tracking-[0.16em] hover:bg-accent-deep transition-colors disabled:opacity-50"
          >
            {submitting ? "Submitting…" : "Submit for review →"}
          </button>
        </div>
      </div>
    </form>
  );
}
