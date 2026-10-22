# Session Memory — MAMO Group Landing Page

## Current State
All 9 sections are built, the light/dark theme is committed, and the **hover + icon pass is finished** but uncommitted. The site is feature-complete for the English-first release. What is left is content, then the React migration — no more feature work in this static HTML version.

- **HEAD:** `20f2442 feat: add light/dark theme with saved preference`.
- **Uncommitted working tree:** the hover + icon pass — `index.html`, `src/input.css`, `src/output.css`, `memory.md`. `main.js` is **not** touched. `src/output.css` is built and in sync (`npm run build` passes). Suggested message: `feat: add hover feedback and section icons`.
- **Tracked and committed:** `DESIGN.md` and `.impeccable/config.json` (both landed in `20f2442`).
- **Ignored:** `.impeccable/design.json`, `.impeccable/live/`, `.impeccable/critique/` — listed individually in `.gitignore`.
- **Branch:** `main`.

## Latest Commit
- `20f2442 feat: add light/dark theme with saved preference` — the theme pass.
- Before that: `7e5e6c3 refactor: extract shared Tailwind styles`.

## Next Step (exact starting point)
1. **Commit the hover + icon pass** (`feat: add hover feedback and section icons`). `npm run build` is done and `src/output.css` is in sync. Stage files explicitly, never `git add .`.
2. Show Ms. Mai the full site and lock the mock content (prices, grade wording, WhatsApp number and prefilled text, phone).
3. Fix the testimonials tab content swap (see Blind Spots) — still cosmetic only.
4. **Move to React.** Arabic + RTL are deliberately deferred to that migration (see Decisions Log). No further feature work in the HTML version.

## PENDING (blocking none)
- Commit the hover + icon pass (`feat: add hover feedback and section icons`).
- Fix testimonials tab content switch (real content swap between student/parent cards).
- Finalize ALL mock content with Ms. Mai after she sees the full site.

## Deferred to the React migration (2026-10-22)
- **Arabic + RTL.** Not built in this static HTML version. Every `ps/pe/ms/me` and every directional icon would have to be mirrored by hand here and then rebuilt again in React — cheaper to do it once, there. This includes flipping `fa-arrow-right` → `fa-arrow-left`.
- The `#lang` button is `hidden` in `index.html`. `main.js` still binds it; the element exists, so the listener is dead but harmless.

## Hover Implementation Check — resolved (2026-10-22)
- ~~**Build blocker:** `.faq-question` uses the `group` marker inside `@apply` → `Cannot apply unknown utility class 'group'`~~ → **resolved**: the marker lives on `.faq-header` in `index.html` and its children use `group-hover:`. `npm run build` passes.
- ~~Hero free-trial button only changes an imperceptible shadow~~ / ~~CTA WhatsApp changes colour with no transition~~ / ~~subject links give no directional cue~~ / ~~FAQ plus icon only reacts to direct hover~~ → **all resolved**: fill + border shift on the hero pair, `transition-all duration-300` throughout, `.subject-link-arrow` slides on `group-hover`, and `.faq-icon` reacts to the whole row.
- **What the hover pass actually is:** inline per-element utilities in `index.html` (plus `@apply` for the shared card/link classes) — **not** the `.btn*` component system that used to be described below. See "Button hover system — what actually shipped".

## Project Structure (current)
```
MAMO-Group-Landing/
├── index.html              (529 lines, all 9 sections)
├── main.js                 (116 lines — burger nav, theme + persistence, lang, video play, testimonial tabs, FAQ accordion)
├── src/
│   ├── input.css           (188 lines — @theme tokens, @custom-variant dark, @apply component classes, @font-face)
│   ├── all.min.css         (Font Awesome, local)
│   └── output.css          (generated, TRACKED on purpose — run `npm run build` after any class change)
├── img/                    (logo.svg, logo.jpg, miss-mai.jpg, miss-mai-1.jpg)
├── fonts/                  (self-hosted Poppins woff2)
├── webfonts/               (Font Awesome files)
├── AGENTS.md               (project instructions)
├── skill.md                (coaching methodology)
├── PRODUCT.md              (product context)
├── DESIGN.md               (design direction — tracked, committed in 20f2442)
├── memory.md               (this file)
├── package.json            (`npm run dev` = watch, `npm run build` = one-off)
└── README.md
```
> `AUDIT.md` and `IDEA.md` are **no longer in the repo**.

## Design Tokens (src/input.css @theme)
- `--color-mamo-gold`: `#d4af37` — **fill role**: button/card/CTA backgrounds, and gold as text **on dark surfaces** (9.4:1 on `#0a0a0a`, 8.5:1 on `#22222f`).
- `--color-mamo-gold-deep`: `#74570a` — **ink role**: gold as text/icons **on light surfaces** (6.75:1 on white, 6.01:1 on the `gold/10` pill).
- `--color-mamo-black`: `#0a0a0a` — dark page surface.
- `--color-mamo-white`: `#f8f9fa` — light page surface **and** body ink on dark.
- `--color-mamo-card`: `#22222f` — dark card surface (1.26:1 against the page; the `white/10` border carries the edge).
- `--color-mamo-faq` was **removed** — it named a section, not a role. FAQ dividers now use `border-mamo-black/10 dark:border-white/10`.
- **Rule:** `mamo-gold` is never used as ink on a light surface. That is what `mamo-gold-deep` exists for; breaking it drops text to ~2:1.
- `--font-poppins` — self-hosted woff2 (400/600/700).
- Container pattern: `max-w-93.75 px-5` / `md:max-w-191.25` / `lg:max-w-250` / `xl:max-w-375` / `xl:px-15` — repeated in every section (final refactor pending).
- Type rule agreed: use Tailwind scale names where a size exists; keep arbitrary px ONLY for non-scale sizes (28/32/40/56); icons are the legit arbitrary exception.

## Decisions Log
- Coaching method: AI asks questions, user writes code — but the user requested design specs (measurements/colors/JS behavior), not code.
- Badge style standardized across sections: `text-mamo-gold bg-mamo-gold/10 border-mamo-gold border-2 rounded-full max-w-fit` + `text-2xl`.
- **Content is MOCK until Ms. Mai sees the full site** — prices, grades wording, WhatsApp texts, phone placeholder all finalized at client handoff. The user's priority = visual form only for now.
- Responsive cards spacing pattern: wrapper `space-y-3 md:space-y-0 md:gap-4` (no mbe on children).
- User commits after AI confirms; commit titles: lowercase `feat:`/`fix:` + space.
- Icon language = Font Awesome only.
- Session memory: AGENTS.md → AI reads memory.md → knows state; updated every session.
- **FAQ accordion**: selector is `#faq ul div` — click on the header div only, so clicking an answer `<p>` doesn't toggle.
- **FAQ toggle**: if/else on the presence of `faq-active` — close-all + open, vs. close-only toggle.
- **Theme strategy (2026-10-14):** `.dark` class on `<html>` + `@custom-variant dark (&:where(.dark, .dark *))`. **Dark is the default**, because it is the brand's native canvas — the logo asset is a white monogram on a baked-in black plate. Light is the secondary "day" mode.
- **`prefers-color-scheme` is deliberately NOT used.** First visit = dark by design, and the choice is read only from `localStorage`. Don't "fix" this without asking.
- **Specificity note:** under this variant, `hover:` beats `dark:` (`hover:` = 0,2,0 vs `dark:` = 0,1,0 through `:where`). No live conflict exists right now, because the old `hover:bg-mamo-gold hover:text-mamo-black` gold-fill button was replaced by a `bg-mamo-gold/60` wash on different properties. Keep the ordering in mind if a `hover:` and a `dark:` ever set the same property again.
- Theme state: `localStorage` key `theme`, values `"light"` / `"dark"`. Nothing is written on first load; "no value" means the HTML default (dark).
- **Text colours and section backgrounds inherit; card surfaces and borders do not.** Preferred fix order: delete the hardcoded class and let it inherit, only then add an explicit `dark:` pair.
- **Unlayered `@apply` rules beat inline utilities.** A colour set inside a custom class in `input.css` cannot be overridden by a class on the element — so set any given colour in exactly one place.
- **Arabic + RTL are deferred to the React migration (2026-10-22).** Not built in the static HTML version. Directional logic gets written once, in React, instead of twice by hand.
- **`color-scheme` was considered and declined (2026-10-22).** The native scrollbar stays light next to the dark page. No form controls exist yet, so the practical cost is that scrollbar only. Do not re-raise it as a pending item.

## FAQ Accordion — How It Works
- **Selector:** `#faq ul div` (click on the header `<div>` only, NOT `<li>` — so clicking an answer `<p>` doesn't trigger the toggle).
- **Logic (`main.js`):**
  - If `faqtext[index]` does NOT have `faq-active` → close all pluses/answers, then open this one.
  - If `faqtext[index]` HAS `faq-active` → close this one only (toggle off).
- **Classes:** `rotate-45` on the plus = open indicator; `faq-active` on the `<p>` = answer open; `max-h-0` on the `<p>` = answer hidden.
- **Result:** opening one closes the others; re-clicking an open item closes it.

## Footer Structure
- **Grid:** `md:grid-cols-3` + `md:justify-items-center`. The logo sits alone in row 1; Quick Links / Contact / Follow Us share row 2 via `row-start-2`; the copyright bar is `col-span-3 justify-self-stretch` beneath them. (Was `grid-cols-4` before 2026-10-22 — four blocks could never fill three columns plus a full-width bar.)
- Logo (`logo.svg`, `w-15 lg:w-20`, wrapped in a black chip in light mode; `mbe-10` beneath it inside the grid).
- Quick Links: Home, About, Subjects, Pricing, Reviews, FAQ — each prefixed with its Font Awesome icon.
- Contact: placeholder phone `+20 1XX XXX XXXX`.
- Follow Us: Facebook, Instagram — both icon-prefixed.
- Copyright: `© 2026 MAMO Group. All rights reserved.`
- Credit: `Made with ♥️ by Yousef Khaled`.
- Container pattern: same as other sections (`max-w-93.75 px-5` etc.).
- `.footer-links` is `flex items-center gap-2`; the markup also leaves a literal space after each icon, so the visual gap is 8px + one space width.

## Client Requirements (client: Miss Mai — science teacher)
- **Teacher**: Science for Primary/Preparatory + Biology for Secondary, at Narmer Language School.
- 30+ years experience, studied coaching and uses it; teaches on Zoom.
- **Name**: MAMO Group — has a logo (in navbar); has a FB page (ads) + Instagram page.
- **Sections**: navbar+burger · Hero · About · Subjects · Pricing · Testimonials (students AND parents) · CTA · FAQ · Footer.
- **Funnel**: WhatsApp → teacher adds student to group with details → 1-2 free trials → continue (pay) or leave.
- **Payment**: Vodafone Cash / InstaPay, every 4 sessions, no installments.
- **Groups**: 20-25 per stage; weekly homework corrected; monthly exams.
- **Recorded sessions**: only for students who MISSED the live class (not sold separately).
- **Features**: WhatsApp button → chat with teacher · Light/Dark mode · English only for now.
- **Release plan**: first release English only. **Arabic + RTL moved to the React migration (2026-10-22)** — not part of this static HTML build.
  > Note: the built site now ships **dark** by default, which is the user's later decision (2026-10-14) and is consistent with the logo asset.

## Blind Spots to raise with the user (coach role)
- **Testimonials tabs are cosmetic only**: `main.js` toggles `testimonial-active` but NEVER swaps the card content — clicking "Parents" still shows the 4 student cards. The client wants students AND parents. Needs a real content switch (or two card groups toggled by `hidden`).
- The 4 testimonial cards are identical duplicates (same "Ahmed S., Grade 8" + same quote) — placeholder only.
- WhatsApp links all use the placeholder `201XXXXXXXXX` + the same prefilled text (fine until client handoff).
- `#lang` only rewrites its own label; it does not switch language or direction. It is now `hidden` in `index.html` (2026-10-22), pending the React/RTL work.

## Production-Readiness Audit
- `AUDIT.md` (created 2026-09-17) is **no longer in the repo**. If the user says "رجّعني للـ audit", say the file is gone and offer to rebuild a priority list from the current source instead of pretending to resume it.

## Tailwind v4 Review (2026-10-08)
- Audited `index.html` and `src/input.css` against Tailwind CSS v4.3 docs; Tailwind CLI 4.3.3 compile passed. No implementation files changed during that review.
- Initial review found the footer arbitrary grid class had been split by whitespace; the learner restored `md:grid-cols-4`, and a fresh build contains the intended four-column utility.
- `src/input.css` uses global class selectors composed with `@apply`; the right test is whether the exact bundle is reused and stays visually consistent, not a rule to avoid `@apply`. The learner's direct About/Pricing utilities plus repeated testimonial sub-patterns are a reasonable balance for static HTML.
- Custom class rules remain unlayered; utility overrides may lose if properties conflict. This is now a known trap, not a theory — it is why per-card backgrounds live in `index.html` rather than in `.pricing-card`.

## Dark/Light Theme Coaching (2026-10-12)
- Working strategy in place: `@custom-variant dark (&:where(.dark, .dark *))` in `src/input.css`, and the theme button (`#theme`) toggles the `.dark` class on `document.documentElement`. Verified in the compiled CSS: `dark:` utilities emit `:where(.dark, .dark *)`, and the mobile-nav cascade resolves correctly (`lg:dark:bg-transparent` is emitted after `dark:bg-mamo-black`, so the nav is transparent on desktop in both themes).
- Base is light (`<body class="bg-mamo-white dark:bg-mamo-black ...">`); header, nav links, FAQ title/icon, footer titles, subject-card text, pricing title/cost got dark variants. `#subjects` and `#reviews` lost their hardcoded `bg-mamo-black` and now inherit the body.
- ~~Still NOT converted: `#about` and `#pricing` keep a white background in dark mode~~ → **RESOLVED 2026-10-14**: both sections now inherit the body surface, and the hardcoded `bg-mamo-white` / `text-mamo-black` were deleted rather than paired.
- ~~Not done yet: localStorage + pre-paint theme assignment~~ → **RESOLVED 2026-10-14**: dark is the HTML default and an inline `<head>` script restores `"light"` from `localStorage` before first paint. `prefers-color-scheme` was dropped on purpose (see Decisions Log).

### Verified colour review (2026-10-12)
Method: scratch copy of the project, fresh CSS build, headless full-page capture in both themes, computed-style reads, plus WCAG ratios from the real token values. Screenshots were written to a scratch cache outside the repo.
- **Detector on `index.html` at that time:** 39 findings — 10 low-contrast (real), 1 hero eyebrow chip, 1 glowing-shadow accent, 27 "cramped padding" that are FALSE POSITIVES (the detector reads HTML classes only and cannot see `@apply`-ed padding inside `.subject-card`, `.pricing-card`, `.testimonial-card`, `.nav-link`, `.faq-question`).
- **Blockers found then (all since fixed):** `.section-title` gold on the gold/10 pill = 1.87:1; `.pricing-cost` + `.pricing-btn` gold on the light section = 1.99:1; hero subtitle `text-gray-400` = 2.32:1; free-trial list `text-gray-600` on `#d4af37` = 3.59:1; `.testimonial-detail` `gray-600` on `#1a1a2e` = 2.26:1 in both themes; testimonial tabs `gray-600` on dark = 2.62:1; `.faq-answer` / `.footer-links` `gray-500` on dark = 4.09:1; `.faq-question` border `#333` on dark = 1.57:1.
- **Why the old dark-navy card failed:** `bg-mamo-card #1a1a2e` with no dark variant is 16.18:1 against a light page (heavy dark blocks on a pale page) but only 1.16:1 against the dark page (the surface disappears and text floats). One value cannot serve two themes — that is what produced the final two-surface card system.

## Impeccable Live Setup (2026-10-13)
- Created `DESIGN.md` and `.impeccable/design.json` to unblock live mode. The chosen direction: "The Trusted Academic Guide" — confident/warm voice, academic gold, light tonal layering, welcoming components.
- Added `.impeccable/live/config.json` for `index.html`; the CSP scan found no policy (`shape: null`). `impeccable live` booted successfully.
- Live iteration did not start: the browser tool stayed disconnected from the OpenCode Desktop session and `live-poll` returned `exit` before any element-selection event. The helper was stopped and the temporary static server on port 8000 was terminated. No live wrappers remain in `index.html`.
- **Next step if resumed:** reconnect the OpenCode Desktop browser, start a static server for this project, open it, then start a fresh `impeccable live` session. The config and design artifacts are already in place.

## Impeccable Critique (2026-10-14)
- The user asked whether the homepage looks professional. Reviewed the current source and ran the detector; no UI code was changed.
- Source-only score: **18/36 (50%)**, heuristic 7 `n/a`. Strong foundation: teacher portrait, 30+ years, a clear free-trial/WhatsApp funnel, consistent tokens. Highest priorities: mock/repeated proof content, controls that don't perform their promised action, contrast verification, and the light-first release mismatch.
- Detector on `index.html` at that time: 28 low-contrast, 1 hero-chip, 25 cramped-padding (mostly false positives), 1 radius advisory, 6 color advisories.
- Browser was disconnected, so there was no live screenshot or overlay. Snapshot: `.impeccable/critique/2026-10-14T06-55-30Z__index-html.md`.

## Theme System — Implemented (2026-10-14)
- The learner implemented the entire theme pass himself from the colour tables; verified with a fresh Tailwind v4.3.3 build and the detector.
- **Structure:** `<html lang="en" class="dark">` is the no-JS / first-paint default. An inline `<head>` script removes `.dark` only when `localStorage.theme === "light"`. `main.js` toggles the class and writes `theme` on click. The `#theme` button holds the icon.
- **Detector before → after: 10 low-contrast warnings → 0.** Remaining: 27 `cramped-padding` (FALSE POSITIVES), 1 `hero-eyebrow-chip`, 1 `dark-glow` (the deliberate gold card glow on the dark page — a style choice, not a bug).
- **Card surfaces now:** light = `bg-white border-mamo-black/10`; dark = `dark:bg-mamo-card dark:border-white/10`. Card backgrounds are set **inline per card in `index.html`**, not in `.pricing-card`'s `@apply` — deliberate, because an unlayered `@apply` colour would beat the inline utility and block the Free-Trial card's `bg-mamo-gold`.
- ~~**Known gaps at commit time:** the PENDING items above (hovers, `testimonial-detail` dark value, `fa-book` icon gold on white cards).~~ → **all resolved 2026-10-22**: `.testimonial-detail` is `dark:text-gray-400`, the pricing `fa-book` icons are `text-mamo-gold-deep dark:text-mamo-gold`, and the hover pass landed.
- **Deferred theme-JS review notes** (learner judged them non-blocking; revisit when the theme code is next touched):
  - The icon state is derived from `localStorage` in two places instead of from the `.dark` class — right result today only because the mapping happens to be symmetric.
  - The click handler flips the class and `localStorage` as two independent toggles; they stay in sync only because both were in sync to begin with. A forced form (`toggle("dark", next === "dark")`) is safer.
  - No `try/catch` around `localStorage`: with storage blocked the exception aborts `main.js` before the click listener is registered, so the theme button dies.
  - The inline `<head>` script sits **after** the stylesheet links; inline scripts wait for preceding stylesheets, so moving it above them removes even the theoretical flash on a slow connection.
  - Icons could be pure CSS instead of JS: two `<i>` elements with `dark:hidden` / `hidden dark:inline-block` — verified to compile in the right order, which removes all icon JS, the icon flash, and any chance of drift.

## Hover Audit (2026-10-14)
Full sweep of every `hover:` in the project. **All of it was applied on 2026-10-22** — kept here for the reasoning and the measured ratios.

### Gold-as-text on a light surface (~1.99:1 — the link/icon disappears in day mode)
| Element | Where | Fix |
|---|---|---|
| `.nav-link` | `src/input.css` | `hover:text-mamo-gold-deep dark:hover:text-mamo-gold` |
| `.testimonial-tab` | `src/input.css` | same |
| `.faq-title` | `src/input.css` | same |
| `.footer-links` | `src/input.css` | same |
| burger bars `group-hover:bg-mamo-gold` | `index.html` (3 spans) | `group-hover:bg-mamo-gold-deep dark:group-hover:bg-mamo-gold` |

- Extra bug: `.testimonial-tab`'s `hover:` (0,2,0) beats `.testimonial-active` (0,1,0), so hovering the **active** tab strips its gold and it vanishes in day mode. ~~The fix above resolves both~~ → **applied**: the hover colour is now identical to the active colour, so the collision is invisible in both themes.

### No hover at all
- ~~CTA "Chat on WhatsApp" — add `hover:bg-mamo-gold hover:text-mamo-black` like "Try Now".~~ → **applied differently** (2026-10-22): `hover:bg-mamo-black/75` + `hover:text-mamo-white`. The gold-fill inversion was rejected because gold→black text passes through ~1:1 mid-transition.
- ~~`#lang` and `#theme` — add `hover:opacity-70`.~~ → **applied differently**: `hover:bg-mamo-gold/60 dark:hover:bg-mamo-gold/20` disc.
- ~~`.subject-link` — use `hover:underline` or move the arrow.~~ → **applied**: the arrow moves (`.subject-link-arrow` + `group-hover:translate-x-1`) **and** the text shifts to `mamo-black` / `dark:mamo-white`.

### Consistency
- ~~`.about-card` and `.subject-card` have `hover:-translate-y-0.5`; `.pricing-card` and `.testimonial-card` don't~~ → **resolved**: all four cards now lift.
- ~~The FAQ row is clickable as a whole, but `hover:` is on the title and the icon separately~~ → **resolved 2026-10-22**: `.faq-header` carries `group` in `index.html`, and `.faq-title` / `.faq-icon` use `group-hover:`.
- ~~The gold Free-Trial button uses `hover:shadow-mamo-gold/50` on a gold background → invisible.~~ → **resolved 2026-10-22**: the fill shifts instead (see "Button hover system — what actually shipped").

### Verified working (leave alone)
`#logo` and the footer logo (`hover:opacity-75`), hero portrait (`hover:scale-105`), `#play-button` (`hover:scale-110`). Buttons are handled inline per element — see "Button hover system — what actually shipped" below.

## Button hover system — what actually shipped (2026-10-22)
> The write-up that used to sit here claimed a `.btn` / `.btn-primary` / `.btn-outline` / `.btn-ink` / `.icon-btn` system had been implemented in `src/input.css`. **It was not.** None of those classes exist in the codebase, there is no `:active` or `:focus-visible` rule, and `.pricing-btn` is still there (used 3×). Corrected so this file matches the site. What shipped is the same *intent* expressed as **inline utilities on each element** — nothing centralised, so nothing can drift, but nothing is reusable either.

### What each element actually carries
- **Shared base (hero pair + CTA):** `inline-flex items-center justify-center gap-2 rounded-full border-2 font-semibold transition-all duration-300` — **300ms**, no custom easing. Padding and text size stay per-instance (hero `px-8 py-3.5 text-base`, CTA `px-4 py-3.5 text-base lg:text-lg`).
- **Hero "Free Trial"** — `bg-mamo-gold text-mamo-black`; hover `bg-mamo-gold/60`, `hover:border-mamo-gold`, label → `gold-deep` (light) / `gold` (dark).
- **Hero "Learn More"** — `text-mamo-gold-deep border-mamo-gold-deep` (+ the dark gold pair), transparent fill; hover `bg-mamo-gold/60` / `dark:hover:bg-mamo-gold/20`, text unchanged.
- **`.pricing-btn`** ("Book Now", 3×) — same shape declared in `@apply`; hover `bg-mamo-gold/60` / `dark:hover:bg-mamo-gold/20`.
- **"Try Now"** (free card) + **CTA "Chat on WhatsApp"** — `bg-mamo-black` + `text-mamo-gold` + `border-2 border-mamo-black`; hover `bg-mamo-black/75` + `hover:border-mamo-black/75` + `hover:text-mamo-white`.
- **`#theme` / `#lang`** — `rounded-full p-2` + `hover:bg-mamo-gold/20` (one value for both themes). The old dead `hover:p-2` / `hover:rounded-full` are gone.
- **`.subject-link`** — `hover:text-mamo-black dark:hover:text-mamo-white`, plus `.subject-link-arrow` through `group-hover:translate-x-1`. 300ms.
- **Cards** — all four lift (`hover:-translate-y-0.5`) and all four run at **300ms**. Glow: `/20→/80` on about, `/50` on subject, `/80` on pricing and testimonial.
- **`.pricing-title`** is `flex items-center gap-2` so the `fa-book` / `fa-gift` icon sits on the title's baseline.
- **Absent by design or by omission:** no `:focus-visible` styling anywhere (UA outline only), no `:active` press state.

### What those values measure (measured 2026-10-22, kept as fact)
- Hero "Free Trial" hover, **dark**: `#d4af37` on `#836d25` = **2.39:1**; the label also crosses gold while the fill darkens, so it briefly disappears.
- Hero "Free Trial" hover, **light**: `#74570a` on `#e2cd85` = **4.28:1**.
- `.pricing-btn` / "Learn More" hover, **light**: `#74570a` on `#e2cd85` = **4.28:1** (14–16px is not "large text", so this misses AA).
- "Try Now" / CTA hover: `bg-mamo-black/75` over a gold surface renders `#3d3315` (olive-brown). The border fades to the same value, so the ring disappears into the fill instead of separating from it.
- Rejected alternatives, recorded so they are not re-derived: `#c6a02e` / `#e2c257` solid fills with the label kept `mamo-black` = 7.98:1 / 11.40:1; `gold/10` / `gold/20` washes = 6.01:1 / 6.70:1; `#232323` fill with a gold label = 7.47:1.
