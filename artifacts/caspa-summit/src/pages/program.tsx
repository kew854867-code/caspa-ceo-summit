import { AgendaSection } from "@/components/sections/agenda";
import { Footer } from "@/components/layout/footer";
import { SiteNav } from "@/components/layout/site-nav";

export default function ProgramPage() {
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