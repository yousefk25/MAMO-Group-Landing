# Session Memory — MAMO Group Landing Page

## Current State
All 9 sections are built. The About section now plays a real, self-hosted intro video with native controls, and the hero/profile photos were replaced with the final Mrs. Mai images. The same working tree carries a section-divider + scroll/selection polish pass, the removal of the dead language button, and a Prettier reformat. The site is feature-complete for the English-first release — what is left is content, then the React migration.

- **HEAD:** `9dd60d4 feat: switch testimonial cards between parents and students`.
- **Ready to commit (working tree):** `index.html`, `main.js`, `src/input.css`, `src/output.css`, plus untracked `Video/video.mp4` (9.5 MB), `img/Mrs-Mai.jpg`, `img/Mrs-Mai1.jpg`. `src/output.css` was rebuilt and is byte-identical to a fresh `npm run build` (60,318 bytes — it grew because `memory.md` prose is scanned too, see Known issues).
- **Suggested commit title:** `feat: add real intro video, section dividers and scroll polish`.
- **Tracked and committed:** `DESIGN.md` and `.impeccable/config.json` (both landed in `20f2442`).
- **Ignored:** `.impeccable/design.json`, `.impeccable/live/`, `.impeccable/critique/`, `.claude/`, `/.memory` — listed individually in `.gitignore`.
- **Branch:** `main`.

## Latest Commit
- `9dd60d4 feat: switch testimonial cards between parents and students` — the Parents / Students `.cards` groups swap by tab index.
- Before that: `54a996d feat: close mobile menu on outside click and scroll`; `4751d59 feat: add hover states, nav icons and combined footer grid`; `20f2442 feat: add light/dark theme with saved preference`.
- **Not yet committed (2026-11-05 session):** see "Session 2026-11-05" below.

## Session 2026-11-05 — Real video, assets and polish

### What changed
- **About section rebuilt around a real video.** The fake `<video src="">` + JS play/pause toggle is gone. There is now one `<video controls controlsList="nodownload" disablepictureinpicture>` with `<source src="./Video/video.mp4">` (relative — the user fixed the root-absolute path the same session). The `section-title` became a direct grid child instead of sitting inside a wrapper, so the grid is `h2 → video → paragraph → stat cards` and the video spans 3 rows on `lg`.
- **Real photos.** Hero uses `img/Mrs-Mai1.jpg` (`597×1280`, `object-[0_37%]`); `img/Mrs-Mai.jpg` was added for the profile. Both `miss-mai*.jpg` files are now unreferenced but still tracked.
- **Language button deleted.** `#lang` is gone from `index.html` *and* its click handler is gone from `main.js` ("Start Dark Theme" comment duplicated as "Start Dark Dark Theme" and the trailing "// Start Dark Theme" were also fixed to `// End Dark Theme`).
- **Section dividers.** `.mamo-container` now carries `border-b border-mamo-black/10 dark:border-white/10`, so every section is separated by one rule. The footer's own `border-t` was deleted to avoid a double line.
- **Scroll / selection polish.** `<html>` gained `scroll-smooth`, gold `selection:` colours (`selection:bg-mamo-gold-deep dark:selection:bg-mamo-gold` + inverse text), and `scrollbar-thumb-*` classes that currently do nothing (see Known issues).
- **Nav / header spacing.** Header `gap-7 → gap-4`; nav `md:text-xl → md:text-lg xl:text-xl`; `lg:gap-6 → lg:gap-5`, `xl:gap-10 → xl:gap-8`; `.nav-link` hover indent `hover:ps-3 → hover:ps-5`; logo link got `duration-300`.
- **Footer credit** is now plain `Made with ♥️ by Yousef Khaled` (the `fa-heart text-red-500` icon is what kept `--color-red-500` in the bundle).
- **Prettier reformat** across `index.html` — this is why `git diff` shows ~330 lines while `git diff -w` shows ~46.

### Known issues introduced (none blocking)
- ~~**`#play-button` is dead markup** sitting inside `<video>`~~ / ~~**video path is root-absolute** (`/Video/video.mp4`)~~ → **both fixed by the user in the same session**: the button is gone, the source is `./Video/video.mp4`, and `main.js` / the stylesheet links are relative too.
- **Tailwind scans the Markdown docs.** `memory.md` and `AGENTS.md` are picked up by the automatic source detection, so any class-like string in prose lands in the bundle — `.gap-7` and `.text-red-500` are in `output.css` today purely because someone wrote them in a sentence. Harmless but it makes `output.css` change whenever the docs are edited. Fix when convenient: `@source not "./memory.md";` and `@source not "./AGENTS.md";` in `src/input.css`.
- ~~**`scrollbar-thumb-*` classes are silently dropped**~~ → **wrong, corrected 2026-11-05.** Tailwind v4.3 ships `scrollbar-color` utilities **built in** (no plugin). Verified live in Chromium 152: computed `scrollbar-color` on `<html>` is `rgb(212, 175, 55) rgba(0, 0, 0, 0)` in dark and `rgb(116, 87, 10) …` in light. **The catch is the track:** `--tw-scrollbar-track` defaults to `#0000`, so only the thumb is painted — the scrollbar looks unchanged until the thumb is visible, which is why it reads as "not working". There is no `scrollbar-width` class in use, so the scrollbar stays full width.
  - **Why it "looks" broken:** only the thumb changes, and on platforms with overlay scrollbars (Linux/macOS) the bar is thin and fades out when idle.
  - **The real trap:** `scrollbar-color` is an *inherited* property, and MDN is explicit that browsers ignore every `::-webkit-scrollbar-*` pseudo-element on any element whose computed `scrollbar-color` is not `auto`. So while these classes are on `<html>`, hand-written `::-webkit-scrollbar` styling anywhere in the page is dead too. Use one approach or the other.
  - **Support:** Baseline 2025 (Chrome/Edge 121+, Firefox 64+, Safari only from late 2025). Older Safari silently keeps the native scrollbar.
- **`h-100` + `aspect-video` on the video fight each other** — a fixed height wins, so the 16:9 ratio only holds at one width. Prefer `w-full` + `aspect-video` and drop `h-100`.
- **`@custom-variant hover (&:hover)` redefines the built-in `hover` variant.** Tailwind's default gates hover behind `@media (hover: hover)`; this override removes the gate, so hover styles now fire and stick after a tap on touch devices.
- The `img` in the hero also carries `flex justify-center items-center text-xl`, which do nothing on a replaced element. Harmless, but noise.

## Next Step (exact starting point)
1. Show Ms. Mai the full site — now including her real intro video and photos — and lock the mock content (prices, grade wording, WhatsApp number and prefilled text, phone).
2. **Move to React.** Arabic + RTL are deliberately deferred to that migration (see Decisions Log). No further feature work in the HTML version.

## PENDING (blocking none)
- Finalize ALL mock content with Ms. Mai after she sees the full site.
- Decide whether the 9.5 MB `Video/video.mp4` ships as-is or gets compressed before the first deploy with it.
- Delete the unreferenced `img/miss-mai.jpg` / `img/miss-mai-1.jpg` (needs the user's OK — tracked files).

## Deferred to the React migration (2026-10-22)
- **Arabic + RTL.** Not built in this static HTML version. Every `ps/pe/ms/me` and every directional icon would have to be mirrored by hand here and then rebuilt again in React — cheaper to do it once, there. This includes flipping `fa-arrow-right` → `fa-arrow-left`.
- The `#lang` button and its `main.js` listener were **deleted entirely on 2026-11-05** — there is no language toggle in the build at all. When React lands, the language switch gets written there for the first time, not resurrected from here.

## Hover Implementation Check — resolved (2026-10-22)
- ~~**Build blocker:** `.faq-question` uses the `group` marker inside `@apply` → `Cannot apply unknown utility class 'group'`~~ → **resolved**: the marker lives on `.faq-header` in `index.html` and its children use `group-hover:`. `npm run build` passes.
- ~~Hero free-trial button only changes an imperceptible shadow~~ / ~~CTA WhatsApp changes colour with no transition~~ / ~~subject links give no directional cue~~ / ~~FAQ plus icon only reacts to direct hover~~ → **all resolved**: fill + border shift on the hero pair, `transition-all duration-300` throughout, `.subject-link-arrow` slides on `group-hover`, and `.faq-icon` reacts to the whole row.
- **What the hover pass actually is:** inline per-element utilities in `index.html` (plus `@apply` for the shared card/link classes) — **not** the `.btn*` component system that used to be described below. See "Button hover system — what actually shipped".

## Project Structure (current)
```
MAMO-Group-Landing/
├── index.html              (595 lines, all 9 sections — Prettier-formatted 2026-11-05)
├── main.js                 (160 lines — burger nav with outside-click/scroll close, theme + persistence, testimonial tabs, FAQ accordion)
├── src/
│   ├── input.css           (190 lines — @theme tokens, @custom-variant dark, @custom-variant hover, @apply component classes, @font-face)
│   ├── all.min.css         (Font Awesome, local)
│   └── output.css          (generated, TRACKED on purpose — run `npm run build` after any class change)
├── Video/                  (video.mp4, 9.5 MB — the About intro video, referenced as /Video/video.mp4)
├── img/                    (logo.svg, logo.jpg, Mrs-Mai.jpg, Mrs-Mai1.jpg; miss-mai.jpg + miss-mai-1.jpg are unreferenced)
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

## Persistent Memory (supermemory) — indexed 2026-10-25
- Container `repo_mamo_group_landing` (50 documents). Covers stack/commands, the `output.css` rule, theme + gold tokens, container ladder, JS structure, FAQ/mobile-nav mechanics, the `@apply` layering trap, mock-content rule, known defects, git/deploy conventions, roadmap, and user-scope preferences.
- 11 superseded July–August 2026 entries (design-spec.html, `#111827` palette, "no git", GitHub `yousefk2030`) were deleted; one correction entry records the overrides.
- If the `supermemory` tool is missing from a session, the plugin's v5 API still works: `POST /ns/<container>/document` with the key in `~/.supermemory-opencode/credentials.json`.

## Design Tokens (src/input.css @theme)
- `--color-mamo-gold`: `#d4af37` — **fill role**: button/card/CTA backgrounds, and gold as text **on dark surfaces** (9.4:1 on `#0a0a0a`, 8.5:1 on `#22222f`).
- `--color-mamo-gold-deep`: `#74570a` — **ink role**: gold as text/icons **on light surfaces** (6.75:1 on white, 6.01:1 on the `gold/10` pill).
- `--color-mamo-black`: `#0a0a0a` — dark page surface.
- `--color-mamo-white`: `#f8f9fa` — light page surface **and** body ink on dark.
- `--color-mamo-card`: `#22222f` — dark card surface (1.26:1 against the page; the `white/10` border carries the edge).
- `--color-mamo-faq` was **removed** — it named a section, not a role. FAQ dividers now use `border-mamo-black/10 dark:border-white/10`.
- **Rule:** `mamo-gold` is never used as ink on a light surface. That is what `mamo-gold-deep` exists for; breaking it drops text to ~2:1.
- `--font-poppins` — self-hosted woff2 (400/600/700).
- **Selection colours (2026-11-05)** follow the gold rule on `<html>`: `selection:bg-mamo-gold-deep dark:selection:bg-mamo-gold`, with inverted text (`selection:text-mamo-white dark:selection:text-mamo-black`).
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
- **`hover` is redefined (2026-11-05):** `@custom-variant hover (&:hover)` replaces Tailwind's `@media (hover: hover)`-gated variant, so hover styles apply on touch devices too. Chosen for consistency on desktop; the cost is that the hover state sticks after a tap. Don't move essential information into `hover:` only.
- **`.mamo-container` owns the section divider (2026-11-05).** The bottom rule lives in the class (`border-b border-mamo-black/10 dark:border-white/10`), so a new section gets its divider for free and no section should add its own `border-t` (the footer's was removed for exactly this reason).
- **The intro video is a local file, not an embed (2026-11-05).** `Video/video.mp4` with native `controls`, `controlsList="nodownload"`, `disablepictureinpicture` — no YouTube/Vimeo, no JS player. Keeps the page dependency-free.

## FAQ Accordion — How It Works
- **Selector:** `#faq ul div` (click on the header `<div>` only, NOT `<li>` — so clicking an answer `<p>` doesn't trigger the toggle).
- **Logic (`main.js`):**
  - If `faqtext[index]` does NOT have `faq-active` → close all pluses/answers, then open this one.
  - If `faqtext[index]` HAS `faq-active` → close this one only (toggle off).
- **Classes:** `rotate-45` on the plus = open indicator; `faq-active` on the `<p>` = answer open; `max-h-0` on the `<p>` = answer hidden.
- **Result:** opening one closes the others; re-clicking an open item closes it.

## Mobile Navigation — Current Behaviour (2026-10-25)
- `main.js` groups the navigation logic under a dedicated section. `barsBehaviour()` toggles the burger/X icon; `openMenus()` toggles the nav panel; `closeMenu()` explicitly restores the closed nav and burger state.
- The mobile menu closes after a nav-link click, after a click whose target is outside both `nav` and `#burger-icon`, and after a scroll while the menu carries `max-h-85`.
- The scroll handler is restricted to the mobile breakpoint. Keep that breakpoint definition consistent with Tailwind's `lg` breakpoint when this code is next refactored.

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
- **Testimonials tabs content switch — RESOLVED**: the two `.cards` groups (Parents / Students) are now toggled by `main.js` via `card.hidden`. The client wants students AND parents — now working.
- **Testimonials tab wiring is still index-coupled** (see comment): it maps a tab to its card group by array index, not by a shared identifier (`data-tab` / `data-card`). It works fine for the current fixed ordering, but any reorder, insert, or future swap of the two groups will misalign them. Recommended future fix: give each tab and its card group a matching `data-tab` / `data-card` and wire by ID instead. This is cosmetic/organizational only — not blocking.
- The 4 testimonial cards are identical duplicates (same "Ahmed S., Grade 8" + same quote) — placeholder only.
- WhatsApp links all use the placeholder `201XXXXXXXXX` + the same prefilled text (fine until client handoff).
- ~~`#lang` only rewrites its own label; it does not switch language or direction.~~ → **resolved 2026-11-05**: the button and its JS were removed. Language switching no longer exists in the static build; it is React-only work now.

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
