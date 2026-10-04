import { Link } from "wouter";
import { Show } from "@clerk/react";
import { REDESIGN_BASE } from "@/data/redesign/base";

type RedesignNavProps = {
  active?: "speakers" | "agenda" | "sponsors" | "tickets";
};

export function RedesignNav({ active }: RedesignNavProps) {
  return (
    <nav>
      <div className="wrap">
        <Link href="/summit" aria-label="CASPA CEO Summit home">
          <img src={`${REDESIGN_BASE}caspa-logo.png`} alt="CASPA" />
        </Link>
        <div className="links">
          <Link href="/summit#speakers" className={active === "speakers" ? "on" : undefined}>
            Speakers
          </Link>
          <Link href="/agenda" className={active === "agenda" ? "on" : undefined}>
            Agenda
          </Link>
          <Link href="/summit#sponsors" className={active === "sponsors" ? "on" : undefined}>
            Sponsors
          </Link>
          <a href="/redesign/history.html" target="_blank" rel="noopener">
            History
          </a>
          <Link href="/summit#tickets" className={active === "tickets" ? "on" : undefined}>
            Tickets
          </Link>
        </div>
        <div className="nav-auth">
          <Show when="signed-out">
            <Link href="/sign-in">Sign in</Link>
            <Link href="/sign-up" className="btn gold sm">
              Create account
            </Link>
          </Show>
          <Show when="signed-in">
            <Link href="/user-portal" className="btn line sm">
              My account
            </Link>
          </Show>
          <Link href="/summit#tickets" className="btn gold sm">
            Get tickets
          </Link>
        </div>
      </div>
    </nav>
  );
}
