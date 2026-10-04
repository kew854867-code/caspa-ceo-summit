import { Link } from "wouter";
import { REDESIGN_BASE } from "@/data/redesign/base";

export function HeroSection() {
  return (
    <header className="hero">
      <div className="vbg">
        <video
          src={`${REDESIGN_BASE}hero-loop.mp4`}
          poster={`${REDESIGN_BASE}hero-poster.jpg`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>
      <div className="wrap">
        <div className="when">
          <span>CASPA 35th Annual Conference &amp; Dinner Banquet</span>
          <span>Oct 23–24, 2026 · Santa Clara Convention Center</span>
        </div>
        <h1>
          The <em>CEO Summit</em>
        </h1>
        <div className="celeb">Celebrating CASPA&apos;s 35th Anniversary</div>
        <div className="cta" style={{ marginTop: 34 }}>
          <a
            className="btn gold"
            href="https://www.eventbrite.com/e/caspa-35th-annual-conference-dinner-banquet-the-ceo-summit-tickets-1994631439329?aff=oddtdtcreator"
            target="_blank"
            rel="noopener noreferrer"
          >
            Register now →
          </a>
          <Link className="btn line" href="/agenda">
            See the agenda
          </Link>
        </div>
      </div>
    </header>
  );
}
