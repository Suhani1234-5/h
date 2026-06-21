
# Girls Leading Tech — Mentorship Cohort 1 Landing Page

A warm, mission-driven, women-in-tech landing page. Single marketing site with anchor-linked sections plus a sticky navbar. Two distinct CTAs throughout: **Apply as Mentee** and **Apply as Mentor**.

## Design Direction

- **Vibe:** warm, ambitious, credible, structured. Not corporate, not flashy.
- **Palette:** white background, deep indigo text, primary purple, lavender surfaces, soft pink accents, subtle warm gradients (lavender → pink) for hero and CTA bands.
- **Typography:** modern sans (Inter/Plus Jakarta Sans for body, Sora or similar for headings).
- **Components:** soft rounded cards (radius-xl), subtle shadows, generous whitespace, restrained motion (gentle fades, no parallax/neon).
- All colors wired through `src/styles.css` semantic tokens (oklch). New tokens: `--brand-purple`, `--brand-lavender`, `--brand-pink`, `--gradient-warm`, `--shadow-soft`.

## Route Architecture

Single-page marketing site is appropriate here (the user explicitly listed a section order with anchor nav). Use one route with section IDs and smooth-scroll anchors.

- `src/routes/index.tsx` → full landing page, real `head()` metadata (title, description, og tags).
- Update `src/routes/__root.tsx` head defaults (title/description) to GLT branding.

The two Apply buttons link to external forms (placeholders for now — `#apply-mentee` / `#apply-mentor` until real URLs supplied).

## Section Breakdown (in order)

1. **Sticky Navbar** — logo wordmark "Girls Leading Tech", links: About, Program, Timeline, Mentors, FAQs, and a primary "Apply" button (opens dropdown to choose Mentee/Mentor).
2. **Hero** — Program name eyebrow, H1 headline, supporting paragraph, two CTA buttons (Mentee / Mentor), trust stats row (4,000+ girls · 1,100+ colleges · 23+ states). Right side: stacked mentor preview cards + community visual collage.
3. **Why This Exists** — two-column: heading + mission paragraph, supportive illustration/quote card.
4. **Program Overview** — 5 stat cards (Duration, Format, Mentor Ratio, Mode, Eligibility) + two side-by-side panels: "What mentees will learn" / "What mentors will do".
5. **Cohort Timeline** — vertical timeline (4 weeks) with week badge, title, description per node.
6. **Meet the Mentors** — 3–4 featured mentor cards (photo, name, role, expertise line, LinkedIn icon button). Footer note "More mentors revealed soon".
7. **Organizing Team** — compact profile grid (photo, name, role, LinkedIn).
8. **Who Should Apply** — checklist card with 5 bullet "great fit for" items.
9. **Application Process** — 4-step horizontal flow (Apply → Shortlisting → Matching → Cohort Begins) + "limited seats / selection-based" callout.
10. **Community Proof** — image collage of community events / screenshots / quotes (placeholder cards).
11. **FAQ** — shadcn Accordion with the 7 listed questions.
12. **Final CTA Band** — gradient section, headline, subhead, two Apply buttons.
13. **Footer** — socials (LinkedIn, Instagram, email), community links, "Made with ♥ by Girls Leading Tech".

## Technical Details

- Stack: TanStack Start (existing), Tailwind v4 via `src/styles.css`, shadcn components already installed (Button, Accordion, Card).
- Add design tokens in `src/styles.css` `:root` and `@theme inline`. No hex in components — use semantic Tailwind classes (`bg-primary`, `bg-lavender`, `text-foreground`, `bg-gradient-warm`).
- Replace placeholder content in `src/routes/index.tsx` with the new page composed from small components in `src/components/landing/` (Navbar, Hero, TrustStats, WhyThisExists, ProgramOverview, Timeline, Mentors, Team, WhoShouldApply, Process, CommunityProof, FAQ, FinalCTA, Footer).
- Generate 4–6 images via `imagegen`: hero illustration of women collaborating, mentor portraits (placeholder avatars), community collage. Saved to `src/assets/`.
- Smooth-scroll via `scroll-behavior: smooth` on `html` + anchor `#id` per section.
- `head()` with title "GLT Mentorship Cohort 1 — DSA & Internship Guidance", meta description, og tags.

## Content I Need From You (or I'll use placeholders)

- Real mentor names/photos/LinkedIn URLs (will use 4 placeholder mentors otherwise)
- Real organizing team list (will use 4 placeholders)
- Application form URLs for mentee + mentor (will use `#` placeholders, easy to swap later)
- Social/email links for footer (will use placeholders)

## Out of Scope (this pass)

- Backend / form submission (forms link out)
- Auth, database, admin panel
- Multiple cohort templating (single static page; can refactor to reusable later)
