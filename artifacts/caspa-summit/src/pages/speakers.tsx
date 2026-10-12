import { useRef, useState } from "react";
import { useReveal } from "@/components/redesign/use-reveal";
import { RedesignNav } from "@/components/redesign/redesign-nav";
import { RedesignFooter } from "@/components/redesign/redesign-footer";
import { PersonCard, ProfileModal } from "@/components/redesign/speakers-section";
import { LISTED, MODERATORS, MCS, topSpeakers, type Person } from "@/data/redesign/speakers";

// Headliners first (same order as the homepage), then everyone else.
const SPEAKERS: Person[] = [...topSpeakers, ...LISTED.filter((p) => !topSpeakers.includes(p))];

export default function SpeakersPage() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root, []);
  const [selected, setSelected] = useState<string | null>(null);

  const grid = (people: Person[]) => (
    <div className="spk-grid">
      {people.map((p) => (
        <PersonCard key={p.name} person={p} onOpen={() => setSelected(p.name)} />
      ))}
    </div>
  );

  return (
    <div className="rsv3" ref={root}>
      <RedesignNav active="speakers" />
      <main className="spage">
        <section id="all-speakers">
          <div className="wrap">
            <div className="head rv">
              <div>
                <span className="eyebrow">Who Takes The Stage</span>
                <h2>
                  All <em>Speakers</em>
                </h2>
              </div>
            </div>
            {grid(SPEAKERS)}

            <div className="tier-l">Moderators</div>
            {grid(MODERATORS)}

            <div className="tier-l">MCs</div>
            {grid(MCS)}
          </div>
        </section>
      </main>
      <ProfileModal name={selected} onClose={() => setSelected(null)} />
      <RedesignFooter />
    </div>
  );
}
