# Sreerag Sreenivasan

Personal engineering leadership website: [sragsree.github.io](https://sragsree.github.io/).

Static HTML, CSS, and JavaScript. No build step, package installation, backend, or third-party runtime dependencies.

## Structure

```text
.
├── index.html                       # Profile, sections, and project templates
├── assets/
│   ├── css/styles.css               # Theme and responsive layouts
│   ├── js/
│   │   ├── main.js                  # Progressive interactions
│   │   └── theme.js                 # System appearance and saved theme selection
│   └── images/
│       ├── favicon.svg
│       ├── oracle-wordmark.svg
│       ├── sreerag-portrait-balanced.png
│       └── sreerag-portrait-monochrome.png
├── docs/content-guide.md            # Content decisions and editing guidance
├── .editorconfig                    # Consistent source formatting
└── .gitignore                       # Local artifacts and OS clutter
```

## Preview locally

Run from the repository root:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open [localhost:4173](http://127.0.0.1:4173/). GitHub Pages serves the root `index.html` and its assets directly.

## Edit the site

- Update the hero, impact stories, leadership panels, engineering decisions, company entries, earlier-build cards, and their `<template>` details in `index.html`. Keep this section order and the matching navigation anchors.
- Change colors, typography, layouts, and responsive rules in `assets/css/styles.css`.
- Change navigation, tabs, filtering, and dialogs in `assets/js/main.js`.
- Change system appearance, saved theme selection, and portrait switching in `assets/js/theme.js`.
- Keep static images in `assets/images/`. When replacing the portrait, update both its `src` and the `og:image` metadata.

See [the content guide](docs/content-guide.md) for profile conventions and public-content boundaries.

Frame management work around enabling teams, technical judgment, and shared outcomes. Credit production delivery to teams, describe prototypes as support for direction and handoff, and keep personal projects in the earlier technical foundation.

Keep cards and panels concise: before/after states and roles for impact, outcomes and three-step processes for leadership, and a capability path separating direction, team delivery, and operational ownership. Put supporting stories and tradeoffs in native disclosures; company entries start closed. Preserve the hero and portraits, and do not add decorative or unsupported metrics.

The Oracle wordmark uses the original vector artwork and red color from [Oracle’s official website](https://www.oracle.com/news/resources/). Keep its proportions and artwork intact.

## Verify changes

```sh
node --check assets/js/main.js
node --check assets/js/theme.js
git diff --check
```

In a local browser, check desktop and mobile layouts, keyboard navigation, expandable impact stories and engineering decisions, leadership tabs and their disclosures, initially closed company entries, project filters and dialogs, and contact links. Confirm project destinations are publicly accessible, including the matching dialog links. Also check reduced-motion and JavaScript-disabled modes, asset requests, and the console.

On phones and tablets, scroll through leadership steps, engineering contributions, and company entries: each block should reveal independently after entering the viewport. Desktop keeps grouped reveals. Verify that keyboard focus makes content immediately visible and that returning above a section allows its reveal to replay. Reduced-motion and print views must show all content without reveal animation.

Check System, Light, and Dark appearances, including saved selection after reload and the corresponding portrait. Verify text, controls, illustrations, and dialogs in both themes; print must retain light backgrounds.

Core content, links, and native impact, leadership, engineering, and experience disclosures work without JavaScript. JavaScript adds the interactive controls progressively.

Legacy template pages, frameworks, unused media, and the PHP contact handler have been removed. Git history retains previously committed files. Keep screenshots, logs, and other generated files out of version control.

All rights reserved.
