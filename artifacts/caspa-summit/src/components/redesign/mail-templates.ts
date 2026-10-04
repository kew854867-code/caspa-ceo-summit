export const OFFICE_EMAIL = "office@caspa.com";

export type MailKind = "sponsor" | "press";

const TEMPLATES: Record<MailKind, { subject: string; body: string }> = {
  sponsor: {
    subject: "Sponsorship Inquiry – CASPA CEO Summit 2026",
    body: [
      "Hello CASPA team,",
      "",
      "I would like to receive the sponsorship deck for the CASPA CEO Summit (Oct 23–24, 2026).",
      "",
      "Name: ",
      "Title: ",
      "Company: ",
      "Email: ",
      "Message (optional): ",
      "",
      "Thank you!",
    ].join("\n"),
  },
  press: {
    subject: "Media Pass Request – CASPA CEO Summit 2026",
    body: [
      "Hello CASPA team,",
      "",
      "I would like to request a media pass for the CASPA CEO Summit (Oct 23–24, 2026).",
      "",
      "Full name: ",
      "Role / title: ",
      "Media outlet: ",
      "Outlet website: ",
      "Work email (outlet domain): ",
      "Links to 2–3 recent articles or clips: ",
      "Coverage format (written / video / podcast / newsletter): ",
      "",
      "(Freelancers: please attach your assignment letter or press ID.)",
      "",
      "Thank you!",
    ].join("\n"),
  },
};

function showFallback() {
  if (document.getElementById("mail-fallback")) return;
  const box = document.createElement("div");
  box.id = "mail-fallback";
  box.style.cssText =
    "position:fixed;left:50%;bottom:28px;transform:translateX(-50%);z-index:9999;max-width:min(92vw,460px);background:#15161a;color:#f3f1ea;border:1px solid #d6a93f;border-radius:14px;padding:16px 20px;font:15px/1.5 'DM Sans',sans-serif;box-shadow:0 12px 40px rgba(0,0,0,.5)";
  box.innerHTML = `Email app didn't open? Write to <b>${OFFICE_EMAIL}</b> and tell us your name, company and what you need. <button type="button" style="margin-left:8px;color:#d6a93f;background:none;border:0;font:inherit;cursor:pointer;text-decoration:underline">Copy address</button> <button type="button" aria-label="Close" style="margin-left:6px;color:#9a978d;background:none;border:0;font:inherit;cursor:pointer">×</button>`;
  const [copy, close] = Array.from(box.querySelectorAll("button"));
  copy.onclick = () => {
    navigator.clipboard?.writeText(OFFICE_EMAIL).catch(() => {});
    copy.textContent = "Copied";
  };
  close.onclick = () => box.remove();
  document.body.appendChild(box);
  window.setTimeout(() => box.remove(), 20000);
}

/** Opens the visitor's email app with a pre-filled message to the CASPA office. */
export function openMail(kind: MailKind) {
  const { subject, body } = TEMPLATES[kind];
  // If no mail app takes over, the page keeps focus: show the address as a fallback.
  const timer = window.setTimeout(() => {
    if (document.visibilityState === "visible" && document.hasFocus()) showFallback();
  }, 1500);
  window.addEventListener("blur", () => window.clearTimeout(timer), { once: true });
  window.location.href = `mailto:${OFFICE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
