# Content guide

## Profile

The website presents Sreerag Sreenivasan as an engineering leader focused on AI infrastructure, distributed platforms, reliable operations, and team development.

Career content was refreshed from the owner's updated September 2026 resume on September 25, 2026, with the owner's clarification to use **12+ years**, counting career span from 2014. Keep this wording consistent in the career strip and About section.

The current role is Senior Software Engineering Manager at Oracle. The updated resume dates the Director of Engineering promotion **October 15, 2026**, superseding the earlier October 1 date. Keep the promotion explicitly future-dated until it takes effect; confirm the effective role before changing the current title. Do not present the incoming Director remit as current scope.

Emphasize leadership through engineering managers, organization growth, roadmaps and budget ownership, multisite GPU infrastructure software, customer acceptance, fleet reliability, and shared operating standards. Describe team development and delivery through organizational change without publishing internal staffing events or counts. Retain earlier cloud identity, analytics, and enterprise software roles as the foundation of this progression.

Keep professional history, education, and contact information evidence-based. Describe leadership scope without inventing metrics, technologies, or responsibilities.

## Public information

- Omit private program names, internal implementation details, and operational metrics.
- Offer the full resume by email; do not add the private PDF to the repository.
- Use the approved email and LinkedIn profile already in the page.
- Keep the email address out of visible text. Use “Send me an email” and résumé-request links instead of displaying or copying the address. The owner accepts that `mailto:` links still expose the address through the browser and page source; this is presentation, not email privacy.
- Present older projects as earlier prototypes, rather than currently operated services.

## Editing conventions

`index.html` holds the site's content. Project cards and their matching `<template id="project-…">` elements both need updating when a project changes. Match each card's `data-project` value to its template suffix; category values must match the filter buttons.

Keep tab IDs, `aria-controls`, `aria-labelledby`, and section anchors synchronized with their targets. Preserve visible focus styles, native links and buttons, and the reduced-motion rules.

Use relative paths for local assets. The social-preview image uses an absolute public URL and must point to the same deployed photograph.

The visual direction takes inspiration from Apple's iPhone page: bold system typography, large rounded feature panels, quiet neutral surfaces, and progressive reveal motion. Keep the site's own teal/cyan accents and personal photography. Source is intentionally framework-free; do not add animation libraries or remote fonts for this treatment.

The leadership panel uses a dark surface with its own light text and accent tokens. Preserve those scoped colors when adjusting contrast. Project cards form a two-column feature grid on desktop and a single column on small phones. Keep tab, filter, dialog, and career-disclosure behavior intact.

Native anchor navigation provides smooth click-to-scroll and browser history. The existing animation-frame scroll handler updates `--hero-progress` for small desktop portrait/caption depth effects. Geometry is cached during remeasurement; do not add per-scroll layout reads or scroll interception. Disable depth motion below 900px and whenever reduced motion is requested. Content remains readable without JavaScript, and print rules restore dark panels to light surfaces.

Natural scrolling triggers an eased reveal when an element reaches 86% of the viewport height. `--reveal-progress` switches between hidden and visible targets; CSS completes the fade and lift even when scrolling stops. The leadership stage and project cards also scale gently toward their final size. Keep revealed content visible during small reverse scrolls; rearm only after it is fully below the viewport plus a 96px buffer. Cache untransformed layout positions, never transformed bounding boxes. Desktop project cards use `data-reveal-delay="140"` for a 140ms stagger. Keep keyboard-focused content immediately visible, reduce movement on phones, and bypass all reveal transforms for reduced motion and print.

The site supports System, Light, and Dark appearances through the header's native color-theme selector. Default to the device preference and remember an explicit selection locally. `assets/js/theme.js` resolves the theme before the stylesheet loads and updates it when the system preference changes. Keep the same layout and interactions in both themes, use semantic color tokens, and always print on a light surface.

Both portraits use the owner’s September 2026 photograph with an AI-edited studio background and the same wider framing. Light mode uses `sreerag-portrait-balanced.png`, with a muted medium blue-gray shirt and softer facial highlights. Dark mode uses `sreerag-portrait-monochrome.png`, a neutral black-and-white treatment with a mottled charcoal background, based on the earlier LinkedIn portrait. Preserve natural skin detail and restrained highlights; do not brighten the face to compensate for the dark page. The `<picture>` source follows system appearance without JavaScript and follows the saved theme when JavaScript is available. The owner prefers the original framing: vertical “A BUILDER AT HEART” side text, a floating tagline card over the lower part of the photo, and the dotted corner accent. Keep the caption clear of the face at every screen size.

At desktop widths (900px and above), center the hero copy and portrait inside a rounded stage: a text column capped at 520px, a 36–64px responsive gap, and a 290px portrait column. Keep the portrait figure 430px tall; its 260 × 412px image frame retains the tall portrait shape at a compact size. Let the hero height follow its content. Below 900px, keep the portrait's existing size and placement without the desktop stage padding.
