import { useEffect, useState, type FormEvent, type ReactNode } from "react";

export type DialogKind = "sponsor" | "press";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function DialogShell({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string;
  subtitle: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="dlg"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="fm">
          <button type="button" className="x" onClick={onClose} aria-label="Close">
            ×
          </button>
          <span className="eyebrow">CASPA CEO Summit</span>
          <h3>{title}</h3>
          <p className="dim">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}

function useMailtoForm(onClose: () => void) {
  const [submitted, setSubmitted] = useState(false);
  const [bad, setBad] = useState<Record<string, boolean>>({});

  const validate = (f: HTMLFormElement) => {
    const next: Record<string, boolean> = {};
    let ok = true;
    f.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[required]").forEach((i) => {
      const isEmail = i.type === "email";
      const isBad = !i.value.trim() || (isEmail && !EMAIL_RE.test(i.value));
      next[i.name] = isBad;
      if (isBad) ok = false;
    });
    setBad(next);
    return ok;
  };

  const sendMailto = (f: HTMLFormElement, subject: string) => {
    const data = new FormData(f);
    const lines = Array.from(f.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea"))
      .filter((i) => i.name && !i.classList.contains("hp") && i.type !== "checkbox")
      .map((i) => {
        let value: string;
        if (i.type === "file") {
          value = (data.get(i.name) as File | null)?.name ?? "";
        } else {
          value = String(data.get(i.name) ?? "").trim();
        }
        return `${i.name}: ${value}`;
      });
    const checked = Array.from(f.querySelectorAll<HTMLInputElement>("input[type=checkbox]:checked"))
      .map((i) => i.name)
      .join(", ");
    if (checked) lines.push(`Coverage format: ${checked}`);
    const body = lines.join("\n");
    window.location.href = `mailto:office@caspa.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>, subject: string) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (f.querySelector<HTMLInputElement>(".hp")?.value) return; // honeypot
    if (!validate(f)) return;
    sendMailto(f, subject);
  };

  return { submitted, bad, onSubmit };
}

function SponsorDialog({ onClose }: { onClose: () => void }) {
  const { submitted, bad, onSubmit } = useMailtoForm(onClose);
  return (
    <DialogShell
      title="Request The Sponsorship Package"
      subtitle="Leave your details and we will email you the package."
      onClose={onClose}
    >
      {submitted ? (
        <div className="ok">
          <b>Thank you.</b> Your email draft has been opened — please press send to deliver your sponsorship
          request to office@caspa.com.
        </div>
      ) : (
        <form className="fm" data-kind="sponsor" onSubmit={(e) => onSubmit(e, "Sponsorship inquiry — CASPA CEO Summit")}>
          <div className="g2">
            <label>
              Name
              <input name="Name" required autoComplete="name" className={bad["Name"] ? "bad" : ""} />
            </label>
            <label>
              Title
              <input name="Title" required autoComplete="organization-title" className={bad["Title"] ? "bad" : ""} />
            </label>
          </div>
          <label>
            Company
            <input name="Company" required autoComplete="organization" className={bad["Company"] ? "bad" : ""} />
          </label>
          <label>
            Email
            <input name="Email" type="email" required autoComplete="email" className={bad["Email"] ? "bad" : ""} />
          </label>
          <label>
            Message <i>(optional)</i>
            <textarea name="Message" rows={3} />
          </label>
          <input name="website" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button className="btn gold" type="submit">
            Send Me The Package →
          </button>
        </form>
      )}
    </DialogShell>
  );
}

function PressDialog({ onClose }: { onClose: () => void }) {
  const { submitted, bad, onSubmit } = useMailtoForm(onClose);
  return (
    <DialogShell
      title="Apply For A Media Pass"
      subtitle="For working journalists and editors. We review every application and email a personal registration code to approved applicants."
      onClose={onClose}
    >
      {submitted ? (
        <div className="ok">
          <b>Application received.</b> Your email draft has been opened — please press send to deliver your
          application to office@caspa.com.
        </div>
      ) : (
        <form className="fm" data-kind="press" onSubmit={(e) => onSubmit(e, "Media pass application — CASPA CEO Summit")}>
          <div className="g2">
            <label>
              Full name
              <input name="Full name" required autoComplete="name" className={bad["Full name"] ? "bad" : ""} />
            </label>
            <label>
              Role / title
              <input name="Role / title" required className={bad["Role / title"] ? "bad" : ""} />
            </label>
          </div>
          <div className="g2">
            <label>
              Media outlet
              <input name="Media outlet" required className={bad["Media outlet"] ? "bad" : ""} />
            </label>
            <label>
              Outlet website
              <input name="Outlet website" type="url" placeholder="https://" required className={bad["Outlet website"] ? "bad" : ""} />
            </label>
          </div>
          <label>
            Work email <i>(outlet domain)</i>
            <input name="Work email" type="email" required autoComplete="email" className={bad["Work email"] ? "bad" : ""} />
          </label>
          <label>
            Links to 2–3 recent articles or clips
            <textarea name="Links to recent articles or clips" rows={3} required className={bad["Links to recent articles or clips"] ? "bad" : ""} />
          </label>
          <fieldset>
            <legend>Coverage format</legend>
            <label className="ck">
              <input type="checkbox" name="Coverage format: Written" value="Written" /> Written
            </label>
            <label className="ck">
              <input type="checkbox" name="Coverage format: Video / broadcast" value="Video / broadcast" /> Video / broadcast
            </label>
            <label className="ck">
              <input type="checkbox" name="Coverage format: Podcast / newsletter" value="Podcast / newsletter" /> Podcast / newsletter
            </label>
          </fieldset>
          <label>
            Assignment letter or press ID <i>(required for freelancers; please attach to your email)</i>
            <input name="Assignment letter or press ID" type="file" accept=".pdf,.jpg,.jpeg,.png" />
          </label>
          <p className="fine">
            Press passes are not issued for PR, marketing, sales or sponsor staff. For those, please request the
            sponsorship package.
          </p>
          <input name="website" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button className="btn gold" type="submit">
            Submit Application →
          </button>
        </form>
      )}
    </DialogShell>
  );
}

export function RedesignDialogs({ kind, onClose }: { kind: DialogKind | null; onClose: () => void }) {
  if (kind === "sponsor") return <SponsorDialog onClose={onClose} />;
  if (kind === "press") return <PressDialog onClose={onClose} />;
  return null;
}
