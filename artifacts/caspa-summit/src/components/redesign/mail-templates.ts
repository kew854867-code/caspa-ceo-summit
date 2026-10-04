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

/** Opens the visitor's email app with a pre-filled message to the CASPA office. */
export function openMail(kind: MailKind) {
  const { subject, body } = TEMPLATES[kind];
  window.location.href = `mailto:${OFFICE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
