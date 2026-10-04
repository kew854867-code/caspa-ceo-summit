# CASPA CEO Summit — redesign (static preview)

Self-contained static pages (no build step). Open `index.html` or `agenda.html`, or serve this folder:

    python3 -m http.server 8765    # then visit http://localhost:8765/index.html

Once the app is running, the same files are also reachable at `/redesign/index.html` (they live in the Vite `public/` folder).

## Structure
- `index.html` – home page; `agenda.html` – full agenda
- `assets/site.css` – all styles; `assets/data.js` – speaker list; `assets/bios.js` – speaker bios + LinkedIn / Wikipedia / personal-site links; `assets/person.js` – speaker pop-up
- `assets/spk/` – speaker photos (face-aligned crops) · `assets/logos/` – sponsor logos (white, one file each) · `assets/media/` – media-partner logos · `assets/img/` – event stills · `assets/hero-loop.mp4` – 15 s silent hero loop

## Editing
- Speakers/bios/links: `assets/data.js` and `assets/bios.js`. Agenda: the `DAYS` array in `agenda.html`.
- Ticket prices are in the `.tier` blocks in `index.html` (currently $499 / $1,799 / $1,399 — keep in sync with Eventbrite).
- The sponsorship and media-pass forms only show a confirmation message; they do not send anything yet (needs a backend endpoint).
