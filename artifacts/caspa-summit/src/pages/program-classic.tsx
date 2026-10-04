import { AgendaSection } from "@/components/sections/agenda";
import { Footer } from "@/components/layout/footer";
import { SiteNav } from "@/components/layout/site-nav";

// Rollback version of the pre-redesign program page (kept for one-line restore in App.tsx).
export default function ProgramClassic() {
  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <SiteNav active="program" />
      <main className="pt-16 md:pt-20">
        <AgendaSection />
      </main>
      <Footer />
    </div>
  );
}
