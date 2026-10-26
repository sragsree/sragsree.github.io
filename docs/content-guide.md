# Content guide

## Profile

The website presents Sreerag Sreenivasan as an engineering leader focused on AI infrastructure, distributed platforms, reliable operations, and team development. Since the transition into management, emphasize enabling teams through direction, technical judgment, ownership, and organizational execution.

Use **12+ years** in the career strip only. Education years may remain visible.

Keep the page order focused on evidence: hero and career strip; three expandable impact stories; leadership tabs (**Develop leaders**, **Build ownership**, **Align partners**); engineering decisions and hands-on foundations; concise company entries; compact earlier builds; contact.

Group experience by company and domain: **Oracle · AI Infrastructure & Cloud Identity**, **Teradata · Cloud Analytics & Developer Platforms**, and **Tata Consultancy Services · Enterprise Software**. Describe contributions and responsibilities within these three entries. Omit exact job titles, individual role chronology, employment date ranges, and promotion announcements or effective dates from public copy and metadata.

Emphasize leadership through engineering managers, organization growth, roadmap and resource planning, multisite GPU infrastructure software, customer acceptance, fleet reliability, and shared operating standards. Describe team development and delivery through organizational change without publishing internal staffing events or counts. Retain cloud identity, analytics, and enterprise software contributions within the company entries.

Keep professional history, education, and contact information evidence-based. Each impact story should connect the problem, leadership contribution, team delivery, and resulting change. Credit teams for delivered outcomes. Engineering examples should demonstrate technical judgment through decisions and tradeoffs; technology names alone do not establish the architecture or personal implementation. Describe prototypes as tools for testing direction and enabling team handoff, not as evidence of personally delivering the production system.

Lead the AI infrastructure impact story with higher GPU availability and faster recovery. Connect those outcomes to fleet-health priorities, reusable remediation automation, team formation, and operational handoff. Keep internal metrics private and avoid implying that every repair is automated.

Frame cloud identity around more reliable access and fewer disruptions. Show how release strategy and coordinated SDK adoption spread circuit breakers and bounded retries across dependent services. Preserve the distinction between faster incident mitigation and complete recovery; do not turn reliability improvements into claims about breach prevention or uninterrupted access.

Distinguish work personally built from work designed, directed, or delivered by a team. Do not imply full budget authority from headcount or resource planning, or present approved future work as delivered. Describe leadership scope without inventing metrics, technologies, or responsibilities.

## Public information

- Omit private program names, internal implementation details, and operational metrics.
- Offer the full resume by email; do not add the private PDF to the repository.
- Use the verified SimpleLogin forwarding alias `sreerag.partner045@slmail.me` in every email link and retain the approved LinkedIn profile. Keep the destination inbox out of HTML, scripts, documentation, and metadata.
- Keep the alias out of visible text. Use “Let’s connect” and résumé-request links. The alias remains public in `mailto:` links and page source; forwarding keeps the destination inbox out of the current website files. Preserve existing subject parameters when changing the alias.
- Present personal projects as earlier technical foundations and prototypes, rather than currently operated services or examples of current management responsibilities.
- Keep project descriptions aligned with repository evidence: sample-page price extraction for the book demo, locally reproducible Firebase flows with optional Maps, retrospective movie-label classification, and five-finger flexion with physical bench validation still required.

## Editing conventions

`index.html` holds the site's content. Project cards and their matching `<template id="project-…">` elements both need updating when a project changes. Match each card's `data-project` value to its template suffix; category values must match the filter buttons.

Keep tab IDs, `aria-controls`, `aria-labelledby`, and section anchors synchronized with their targets. Preserve visible focus styles, native links and buttons, and the reduced-motion rules.

Use relative paths for local assets. The social-preview image uses an absolute public URL and must point to the same deployed photograph.

The visual direction takes inspiration from Apple's iPhone page: bold system typography, large rounded feature panels, quiet neutral surfaces, and progressive reveal motion. Keep the site's own teal/cyan accents and personal photography. Source is intentionally framework-free; do not add animation libraries or remote fonts for this treatment.

Keep the first view concise: impact cards show before/after operating states, compact role labels, and outcomes, with the story in a disclosure. Leadership tabs show a short outcome and a three-step process, with supporting detail expandable. The engineering capability path separates personal direction and prototyping, team production delivery, and operational ownership; keep the tradeoff in its disclosure. Company entries start closed. Use these patterns to reduce text density without adding decorative metrics or implying unverified results. Preserve the existing hero and portraits.

The leadership panel uses a dark surface with its own light text and accent tokens. Preserve those scoped colors when adjusting contrast. Earlier-build cards form a compact four-column grid at widths of 1101px and above, two columns at medium widths, and one column on small phones. Keep tab, filter, dialog, and disclosure behavior intact. Impact stories, leadership detail, engineering decisions, and company entries use native `<details>` and `<summary>` elements so their content remains accessible without JavaScript.

Native anchor navigation provides smooth click-to-scroll and browser history. The existing animation-frame scroll handler updates `--hero-progress` for small desktop portrait/caption depth effects. Geometry is cached during remeasurement; do not add per-scroll layout reads or scroll interception. Disable depth motion below 900px and whenever reduced motion is requested. Content remains readable without JavaScript, and print rules restore dark panels to light surfaces.

Natural scrolling triggers an eased reveal when an element reaches 76% of the viewport height on both desktop and mobile, so the entrance remains visible within the reading area. `--reveal-progress` switches between hidden and visible targets; CSS completes the fade and lift even when scrolling stops. Desktop uses grouped reveals; mobile reveals leadership steps, engineering contributions, and company entries independently with a 48px lift. `data-reveal="desktop"` and `data-reveal="mobile"` prevent parent and child reveal transforms from stacking. Keep revealed content visible during small reverse scrolls; rearm only after it is fully below the viewport plus a 96px buffer. Cache untransformed layout positions, never transformed bounding boxes. Desktop project cards use `data-reveal-delay="140"` for a 140ms stagger. Keep keyboard-focused content immediately visible and bypass all reveal transforms for reduced motion and print.

Keep reveal fade and movement synchronized with the same 720ms duration and moderate ease-out curve. Use translation without scaling so text and images retain their size during entry. Desktop impact cards stagger by 80ms; stacked mobile cards have no added delay. Restrict project hover movement to fine pointers with hover support. Preserve native wheel and touch scrolling, and avoid blanket layer promotion or a continuous animation loop.

The site supports System, Light, and Dark appearances through the header's native color-theme selector. Default to the device preference and remember an explicit selection locally. `assets/js/theme.js` resolves the theme before the stylesheet loads and updates it when the system preference changes. Keep the same layout and interactions in both themes, use semantic color tokens, and always print on a light surface.

Both portraits use the owner’s September 2026 photograph with an AI-edited studio background and the same wider framing. Light mode uses `sreerag-portrait-balanced.png`, with a muted medium blue-gray shirt and softer facial highlights. Dark mode uses `sreerag-portrait-monochrome.png`, a neutral black-and-white treatment with a mottled charcoal background, based on the earlier LinkedIn portrait. Preserve natural skin detail and restrained highlights; do not brighten the face to compensate for the dark page. The `<picture>` source follows system appearance without JavaScript and follows the saved theme when JavaScript is available. The owner prefers the original framing: vertical “A BUILDER AT HEART” side text, a floating tagline card over the lower part of the photo, and the dotted corner accent. Keep the caption clear of the face at every screen size.

At desktop widths (900px and above), center the hero copy and portrait inside a rounded stage: a text column capped at 520px, a 36–64px responsive gap, and a 290px portrait column. Keep the portrait figure 430px tall; its 260 × 412px image frame retains the tall portrait shape at a compact size. Let the hero height follow its content. Below 900px, keep the portrait's existing size and placement without the desktop stage padding.
