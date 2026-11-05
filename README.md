# MAMO Group — Landing Page

An online advert for **MAMO Group**, the private tutoring practice of Mrs. Mai Elnaggar: Science classes taught live on Zoom.

**Demo:** https://yousefk25.github.io/MAMO-Group-Landing/

## What this page is

A one-page advert — the printed flyer, except it never runs out and it can answer back.

Visitors arrive from a Facebook ad or a forwarded WhatsApp link without knowing who Mrs. Mai is. The page has to do the whole job in one scroll: show her face, state her record, explain what she teaches and how the groups work, answer the awkward questions about money and missed classes, then hand the visitor to her on WhatsApp.

There are no forms and no sign-up. Every call to action opens a chat with a prefilled message; she replies, the student sits one or two free classes, and only then does anything get paid.

## Who it speaks to

Parents and students are both audiences here. Parents decide and pay, so the page carries their proof points — teaching record, small cohorts, corrected homework, monthly exams. Students are the ones in the class, so the testimonial tabs and the subject cards speak to the experience of learning itself, not only to a parent's checklist.

## The page

A single long page, in this order:

| Section | What it does |
| --- | --- |
| **Header** | Logo, anchor navigation, theme switch. Collapses into a burger menu on mobile. |
| **Hero** | The advert's opening frame: portrait, positioning line, and the two primary actions — free trial and learn more. |
| **About** | The teacher's record in one paragraph, an intro video, and four stat cards. |
| **Subjects** | The three teaching tracks and what each stage covers. |
| **Pricing** | A free-trial card plus the paid packages, each ending in a booking action. |
| **Reviews** | Testimonials in two tabs — parents and students — because both audiences read them differently. |
| **CTA band** | The gold band: a second, unmissable path to WhatsApp. |
| **FAQ** | The objections that stop a visitor from messaging: levels, groups, payment, missed classes. |
| **Footer** | Quick links, contact, social profiles, and the credit. |

## Design direction

The page is built around the brand's own canvas. The logo is a white monogram on black, so **dark is the default theme** and light is the secondary mode. Gold is the anchor colour, taken from the logo.

Gold does two different jobs, and they are not interchangeable:

| Role | Colour | Where |
| --- | --- | --- |
| Fill | `#d4af37` | Buttons, card accents, the CTA band, and gold text on dark |
| Ink on light | `#74570a` | Gold text and icons on white or pale surfaces |

The darker gold exists for one reason: `#d4af37` as text on white sits at roughly 1.9:1 and disappears. Every colour pair in both themes was measured during the build, and the remaining contrast failures were fixed before the first release.

Type is Poppins, self-hosted. Icons are Font Awesome, also self-hosted. Nothing loads from a CDN, so the page has no third-party dependency at runtime.

## Responsive and accessible

- Four layout tiers — phone, tablet, laptop, wide desktop — with an explicit width for each.
- Navigation, pricing cards, and testimonials all reflow rather than shrink.
- Both themes were audited for contrast, and every failure found at build time was fixed in both modes.
- The intro video uses the browser's native player, with picture-in-picture and downloading disabled.

## Behaviour

All of it is plain JavaScript, no framework and no libraries:

- **Theme** — remembers the visitor's choice and applies it before the page paints, so there is no flash of the wrong theme.
- **Mobile menu** — closes on a link tap, on a click outside it, and on scroll.
- **Testimonials** — the parent and student card groups swap with the tabs.
- **FAQ** — one answer open at a time; tapping an open question closes it.

## Built with

Plain HTML, CSS, and JavaScript. No framework, no bundler, and nothing loaded from a CDN.

- **HTML5** — one hand-written page with semantic sections and proper landmarks.
- **Tailwind CSS v4.3** — the whole design is written in utility classes; brand tokens and shared component styles live in `src/input.css` and are compiled with the Tailwind CLI.
- **JavaScript (ES6)** — theme persistence, mobile navigation, testimonial tabs, and the FAQ accordion, in about 160 lines. No libraries.
- **Font Awesome Free 7.3** — self-hosted icon set.
- **Poppins** — self-hosted WOFF2 at 400, 600, and 700.
- **Git & GitHub** — version control, with the demo served from GitHub Pages.
- **Prettier** with `prettier-plugin-tailwindcss` — formatting and class ordering.

## Content status

The design and structure are final. The copy is not.

Placeholder until the client reviews the full site:

- prices and payment terms
- the phone number and the WhatsApp number
- testimonials and the names attached to them
- the "500+ students" figure

Real and approved: the teacher's name, her credentials, the About video, and the brand assets.

## Credits

Designed and built by **Yousef Khaled** for Mrs. Mai Elnaggar.
