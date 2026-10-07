import { useState } from "react";
import { Link } from "wouter";
import { Show } from "@clerk/react";
import { REDESIGN_BASE } from "@/data/redesign/base";

type RedesignNavProps = {
  active?: "speakers" | "agenda" | "sponsors" | "tickets";
};

export function RedesignNav({ active }: RedesignNavProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <nav className={open ? "menu-open" : undefined}>
      <div className="wrap">
        <Link href="/summit" aria-label="CASPA CEO Summit home">
          <img src={`${REDESIGN_BASE}caspa-logo.png`} alt="CASPA" />
        </Link>
        <div className="links" onClick={close}>
          <Link href="/summit#speakers" className={active === "speakers" ? "on" : undefined}>
            Speakers
          </Link>
          <Link href="/agenda" className={active === "agenda" ? "on" : undefined}>
            Agenda
          </Link>
          <Link href="/sponsors" className={active === "sponsors" ? "on" : undefined}>
            Sponsors
          </Link>
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
            Get Tickets
          </Link>
        </div>
        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
