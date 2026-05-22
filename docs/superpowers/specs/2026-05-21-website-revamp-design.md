# Website Revamp Design

## Goal

Revamp `sragsree.github.io` from an outdated resume-template site into a distinctive leadership portfolio for Sreerag Sreenivasan.

The approved positioning is:

> I build the operating layer for next-generation AI infrastructure.

The site should present Sreerag as a senior engineering manager and builder of AI infrastructure software systems. The tone should be visionary, leadership-heavy, and visually memorable, while staying public-safe and avoiding confidential partner, program, or internal implementation details.

## Current Problems

The current repository is a legacy static template with:

- A 1,900-line `index.html` mixing content, layout, old template markup, and hidden/commented blocks.
- Multiple old template pages: `blog.html`, `blog-with-sidebar.html`, `single.html`, and `portfolioitems.html`.
- Old dependencies and scripts including jQuery 1.x, Materialize, Bootstrap, Owl Carousel, SweetAlert, JWPlayer, Google Maps, PHP email code, and unused blog/contact behavior.
- Stale public content: "Freelancer", "Software Engineer", skill percentages, age, phone, home address, Google Plus, and old social/profile links.
- A missing `images/person.png` reference and many duplicate or unused assets.
- Portfolio content dominated by older student/prototype projects rather than current leadership and AI infrastructure work.

## Approved Direction

Use the **Command Center Editorial** direction approved in the visual companion.

The new site should feel like an executive-grade personal site with a strong operating-layer motif:

- Cinematic dark hero.
- Precise, large typography.
- Infrastructure command-center visual language.
- Diagram-like motifs for systems, workflows, signals, and teams.
- A premium palette using obsidian/navy, white/paper surfaces, cyan/teal, amber, and small coral accents.
- Strong leadership narrative first, builder/maker evidence second.

Avoid a generic resume clone, generic SaaS landing page, or random project scrapbook.

## Public Safety Boundary

The public website must not mention:

- Stargate by name.
- OpenAI, NVIDIA, or other private partner/program references in relation to Sreerag's work.
- Internal Oracle system names unless already clearly public and approved.
- Private scale numbers, unreleased operational details, internal diagrams, confidential process details, or specific partner commitments.

Use safe wording such as:

- "AI infrastructure software"
- "large-scale infrastructure delivery"
- "data center build workflows"
- "repair automation"
- "process optimization"
- "reliable infrastructure operations"
- "infrastructure-critical software systems"

## Content Architecture

### Header

Header should be compact and premium.

Navigation:

- Leadership
- Operating Layer
- Build Lab
- Contact

Brand:

- "Sreerag Sreenivasan"
- Small custom mark using `S` or an abstract operating-layer motif.

### Hero

Hero is the main visual signature.

Primary role line:

> Senior Engineering Manager · AI Infrastructure Software

Headline:

> I build the operating layer for next-generation AI infrastructure.

Supporting copy:

> I lead teams creating the software systems, workflows, and automation that make large-scale infrastructure delivery faster, safer, and more reliable.

Hero visual:

- Dark cinematic background with subtle grid/route/operating-layer motif.
- Right-side command-center/system map with four safe nodes:
  - Build
  - Repair
  - Signals
  - Teams
- The visual should look designed, not like a fake detailed internal dashboard.

Hero evidence tiles:

- Lead Systems: Direction, ownership, and execution across infrastructure-critical software.
- Scale Delivery: Workflow products that convert operational complexity into repeatable motion.
- Build Teams: Engineering habits, trust, and clarity for high-pressure delivery environments.

Hero CTAs:

- Leadership Work
- Build Lab

### Leadership Manifesto

Purpose: explain the kind of leadership Sreerag brings.

Section title:

> Leadership is the product surface.

Section copy:

> My work is not just a list of roles. It is a practice of turning ambiguity into systems, building teams that can execute under pressure, and creating software that makes infrastructure work more repeatable.

Cards:

- Turn ambiguity into systems.
  - Translate complex infrastructure needs into roadmaps, interfaces, ownership models, and execution rhythms.
- Automate operational drag.
  - Build software that reduces manual coordination, improves repeatability, and helps infrastructure teams move with confidence.
- Compound through people.
  - Scale impact by building high-trust teams with clear priorities, strong technical judgment, and practical delivery habits.

### Operating Layer

Purpose: replace the old resume carousel and skill percentage bars with public-safe proof areas.

Section title:

> Operating Layer

Intro:

> Three public-safe proof areas replace the old resume-card carousel and skill percentages.

Cards:

- Infrastructure Workflows
  - Software systems for coordinating complex data center build and operations work.
- Repair Automation
  - Workflow logic and automation patterns that reduce repeated operational toil.
- Process Intelligence
  - Signals, dashboards, and knowledge loops that make execution easier to reason about.

### Build Lab

Purpose: preserve the builder/maker identity, but keep it secondary to leadership.

Section title:

> Build Lab

Intro:

> The maker energy lives here: current experiments, AI-assisted workflows, personal automation, knowledge tooling, and a compact archive of older public projects.

Cards:

- Current Experiments
  - AI workflows, graph tooling, local automation, and engineering productivity systems.
- Earlier Builds
  - Older college and prototype projects preserved as part of the journey, not the headline.

Implementation may include links to GitHub repositories where available. If current public artifacts are weak or unavailable, this section should honestly describe a lab/experiments area rather than pretending there are polished products.

### Career Snapshot

Purpose: include enough resume context without reverting to a resume site.

Use a compact timeline or profile block with:

- Current role: Senior Engineering Manager, Oracle.
- Prior engineering experience: Teradata and Tata Consultancy Services, summarized briefly.
- Education: San Diego State University and University of Calicut, compact and secondary.

Do not include age, phone number, home address, skill percentages, old endorsements, or long certification cards.

### Contact

Use a clean contact band with:

- GitHub
- LinkedIn
- Email
- Location: Seattle, Washington

Avoid Formspree/PHP contact form unless a static, privacy-safe mailto flow is explicitly preferred. The default should be simple links.

## Visual System

### Palette

- Obsidian: `#080d16`
- Deep navy: `#101827`
- Ink: `#0b1220`
- Paper: `#f7f8fb`
- White: `#ffffff`
- Mist text: `#dbe7f3`
- Cyan: `#7dd3fc`
- Teal: `#2dd4bf`
- Amber: `#f5c451`
- Coral accent: `#fb7185`

The page should not become a one-hue blue/purple theme. Cyan/teal should be balanced by amber/coral and white/paper sections.

### Typography

Use a modern, highly readable sans-serif stack. The implementation can use local/system fonts or web fonts if appropriate.

Requirements:

- Large hero headline with strong line-height and no negative letter-spacing.
- Clear section headings.
- Dense but readable card copy.
- Button/control text should be explicitly styled and never rely on browser defaults.

### Layout

Target structure:

- Sticky or fixed-looking compact header.
- Full-viewport hero with next section hinted below.
- Alternating dark and light full-width bands.
- No nested cards.
- Cards only for repeated proof items, lab items, or compact timeline entries.
- Stable responsive dimensions for visual motifs and card grids.

### Visual Motifs

Allowed motifs:

- Operating-layer route lines.
- Subtle grid patterns.
- Command-center/system map.
- Abstract nodes for Build, Repair, Signals, Teams.
- Small custom brand mark.

Avoid:

- Decorative gradient blobs/orbs.
- Fake detailed internal dashboards.
- Stock-looking generic server imagery.
- Overly sci-fi visuals that make the leadership message feel unserious.

## Repository Cleanup

The implementation should simplify the repository and remove or archive the old template system.

Target structure:

```text
/
  index.html
  README.md
  assets/
    css/
      styles.css
    js/
      main.js
    img/
      ...
  docs/
    superpowers/
      specs/
        2026-05-21-website-revamp-design.md
```

Cleanup actions:

- Replace legacy `assets/css/main.css`, `responsive.css`, color files, old bootstrap/materialize dependencies, and unused plugin CSS with a focused stylesheet.
- Replace old JS dependencies with a small local script for navigation, active section state, and any lightweight interactions.
- Remove unused blog/template pages unless intentionally archived.
- Remove `inc/sendEmail.php` if the contact form is removed.
- Remove stale audio/video/template license artifacts if unused.
- Remove `.DS_Store`, `bitbucket.log`, and other local clutter.
- Move needed images into `assets/img/` and compress/rename them with clear names.
- Keep only assets that the new site actually references.

## Accessibility And Responsiveness

Requirements:

- Semantic sections and headings.
- Keyboard-accessible navigation.
- Visible focus states.
- Sufficient color contrast.
- No text overlap on mobile.
- Responsive hero and visual motifs.
- Mobile nav should be simple and readable.
- Respect `prefers-reduced-motion` if motion is added.

## Verification

Implementation must be verified in browser:

- Desktop viewport.
- Mobile viewport.
- Page identity and title.
- No blank page or framework error overlay.
- Console has no relevant errors or warnings introduced by the new implementation.
- Navigation scroll links work.
- CTAs jump to intended sections.
- Assets render correctly.
- No overflow, clipping, or unreadable text on mobile.

Because this is a static GitHub Pages site, verification can use a local static server.

## Open Content Decisions For Implementation

Before final implementation, confirm or reasonably choose:

- Final public email address.
- Final LinkedIn URL, because current HTML contains conflicting LinkedIn paths.
- Whether to use the existing profile photo, a processed/cropped version, or no personal photo in the hero.
- Which current Build Lab artifacts should be linked. If not provided, use honest categories and GitHub link rather than fake project claims.

## Approved Scope

In scope:

- Full redesign of the homepage.
- Public-safe copy rewrite.
- Repository cleanup directly tied to the new site.
- Removing stale legacy template assets and pages.
- Modern responsive static implementation.

Out of scope:

- Blog engine.
- Backend contact form.
- Confidential program/partner details.
- New public claims that are not safe or supportable.
