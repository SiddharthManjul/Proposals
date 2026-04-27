import type { Comment } from "@/lib/proposals";
import { formatDate } from "@/lib/proposals";

type Props = {
  comments: Comment[];
};

export function CommentThread({ comments }: Props) {
  if (!comments.length) {
    return (
      <div className="py-12 text-center">
        <p className="font-display italic text-ink-soft text-lg">
          No replies yet — be the first to weigh in.
        </p>
      </div>
    );
  }

  return (
    <ol className="divide-y divide-rule">
      {comments.map((c, i) => (
        <li key={c.id} className="py-7">
          <CommentItem comment={c} index={i + 1} />
          {c.replies?.length ? (
            <ol className="mt-5 pl-6 border-l-2 border-accent/40 space-y-5">
              {c.replies.map((r, j) => (
                <li key={r.id} className="pl-2">
                  <CommentItem comment={r} index={i + 1} subIndex={j + 1} reply />
                </li>
              ))}
            </ol>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function CommentItem({
  comment,
  index,
  subIndex,
  reply = false,
}: {
  comment: Comment;
  index: number;
  subIndex?: number;
  reply?: boolean;
}) {
  const ref = subIndex
    ? `${String(index).padStart(2, "0")}.${String(subIndex).padStart(2, "0")}`
    : String(index).padStart(2, "0");

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-2 md:text-right">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
          §{ref}
        </div>
        <div className="mt-1 text-[14px] text-ink font-medium">
          {comment.author}
        </div>
        <div className="font-mono text-[11px] text-ink-faint mt-0.5">
          @{comment.handle}
        </div>
        <div className="font-mono text-[11px] text-ink-faint mt-2">
          {formatDate(comment.date)}
        </div>
      </div>
      <div className="col-span-12 md:col-span-10">
        <p className={`text-[15.5px] leading-[1.7] text-ink ${reply ? "" : ""}`}>
          {comment.body}
        </p>
        <div className="mt-3 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
          <button type="button" className="hover:text-accent transition-colors">
            Reply
          </button>
          <button type="button" className="hover:text-accent transition-colors">
            Quote
          </button>
          <button type="button" className="hover:text-accent transition-colors">
            Link
          </button>
        </div>
      </div>
    </div>
  );
}
