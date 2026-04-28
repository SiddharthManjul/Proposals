import { Masthead } from "@/components/Masthead";
import { CategoryNav } from "@/components/CategoryNav";
import { Footer } from "@/components/Footer";
import { AdminPanel } from "./AdminPanel";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <>
      <Masthead />
      <CategoryNav />
      <main className="mx-auto max-w-[1440px] px-6 lg:px-10 pt-12 pb-16">
        <header className="pb-10 border-b border-rule">
          <div className="kicker mb-3">Editorial desk</div>
          <h1
            className="font-display font-semibold text-ink leading-[0.98] tracking-[-0.035em] max-w-[20ch]"
            style={{ fontSize: "clamp(2.4rem, 5.4vw, 4rem)" }}
          >
            Admin <span className="text-accent">panel</span>.
          </h1>
          <p className="mt-7 max-w-[60ch] text-[18px] leading-[1.55] text-ink-soft font-display italic">
            Move proposals through their lifecycle. Sign in with your email and
            stay signed in for 30 days — no bearer token to keep pasting.
          </p>
        </header>

        <section className="pt-10">
          <AdminPanel />
        </section>
      </main>
      <Footer />
    </>
  );
}
