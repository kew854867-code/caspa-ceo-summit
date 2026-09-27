import { useClerk, UserProfile } from "@clerk/react";
import { useGetCurrentUser } from "@workspace/api-client-react";
import { Link } from "wouter";
import { SiteNav } from "@/components/layout/site-nav";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function UserPortalPage() {
  const { signOut } = useClerk();
  const { data, isPending, isError, refetch } = useGetCurrentUser();

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="container mx-auto max-w-5xl px-5 pb-24 pt-32 md:pt-40">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-primary">
          CASPA CEO Summit · 2026
        </p>
        <h1 className="font-serif text-4xl md:text-6xl">Your account</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Your profile and Summit links, all in one place.
        </p>

        <section className="mt-12 border border-white/10 bg-white/[0.03] p-6 md:p-9">
          {isPending ? (
            <p className="text-muted-foreground">Loading your account…</p>
          ) : isError ? (
            <div>
              <p>We couldn’t load your account. Please try again.</p>
              <button
                type="button"
                onClick={() => void refetch()}
                className="mt-4 border border-primary px-5 py-3 text-sm uppercase tracking-widest text-primary hover:bg-primary/10"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="font-serif text-2xl">{data.displayName}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{data.email}</p>
                <span className="mt-5 inline-block border border-primary/50 px-3 py-1 text-xs uppercase tracking-widest text-primary">
                  {data.isAdmin ? "Administrator" : "Member"}
                </span>
                {data.isAdmin && (
                  <p className="mt-3 max-w-md text-sm text-muted-foreground">
                    Your administrator access is active. Management tools can be added when their scope is defined.
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => void signOut({ redirectUrl: basePath || "/" })}
                className="self-start border border-white/20 px-5 py-3 text-sm uppercase tracking-widest transition-colors hover:border-primary hover:text-primary"
              >
                Sign out
              </button>
            </div>
          )}
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          <Link href="/summit" className="border border-white/10 p-6 transition-colors hover:border-primary/50">
            <span className="text-xs uppercase tracking-widest text-primary">Explore</span>
            <h2 className="mt-3 font-serif text-xl">Summit home →</h2>
          </Link>
          <Link href="/program" className="border border-white/10 p-6 transition-colors hover:border-primary/50">
            <span className="text-xs uppercase tracking-widest text-primary">Discover</span>
            <h2 className="mt-3 font-serif text-xl">Program →</h2>
          </Link>
          <Link href="/sponsorship" className="border border-white/10 p-6 transition-colors hover:border-primary/50">
            <span className="text-xs uppercase tracking-widest text-primary">Connect</span>
            <h2 className="mt-3 font-serif text-xl">Sponsorship →</h2>
          </Link>
        </section>

        <section className="mt-16">
          <h2 className="mb-6 font-serif text-2xl">Manage your profile</h2>
          <div className="overflow-x-auto">
            <UserProfile routing="hash" />
          </div>
        </section>
      </main>
    </div>
  );
}