# Content guide

## Profile

The website presents Sreerag Sreenivasan as an engineering leader focused on AI infrastructure, distributed platforms, reliable operations, and team development.

Career content comes from the supplied September 2026 resume, with the owner's clarification to use **12+ years**, counting career span from 2014. Keep this wording consistent in the career strip and About section.

The current role is Senior Software Engineering Manager at Oracle. The Director of Engineering promotion is explicitly dated October 1, 2026. Confirm the effective role before changing the current title.

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

The approved visual identity uses light surfaces, teal/cyan accents, personal photography, and interactive sections. Source is intentionally framework-free.

The current portrait uses the owner’s September 2026 photograph, with an AI-edited neutral studio background, wider framing, and a muted medium blue-gray shirt. Softer facial highlights and a reduced orange cast balance the portrait against the site’s cool palette. The owner prefers the original framing: vertical “A BUILDER AT HEART” side text, a floating tagline card over the lower part of the photo, and the dotted corner accent. Keep the caption clear of the face at every screen size.

At desktop widths (900px and above), center the hero copy and portrait as a group: a text column capped at 520px, a 36–64px responsive gap, and a 290px portrait column. Keep the portrait figure 430px tall; its 260 × 412px image frame retains the tall portrait shape at a compact size. Let the hero height follow its content. Preserve the existing mobile and tablet composition below 900px.
