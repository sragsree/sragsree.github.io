# Sreerag Sreenivasan

Personal engineering leadership website: [sragsree.github.io](https://sragsree.github.io/).

Static HTML, CSS, and JavaScript. No build step, package installation, backend, or third-party runtime dependencies.

## Structure

```text
.
├── index.html                       # Profile, sections, and project templates
├── assets/
│   ├── css/styles.css               # Theme and responsive layouts
│   ├── js/main.js                   # Progressive interactions
│   └── images/
│       ├── favicon.svg
│       └── sreerag-portrait-balanced.png
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

- Update profile text, dates, navigation, project cards, and their `<template>` details in `index.html`.
- Change colors, typography, layouts, and responsive rules in `assets/css/styles.css`.
- Change navigation, tabs, filtering, and dialogs in `assets/js/main.js`.
- Keep static images in `assets/images/`. When replacing the portrait, update both its `src` and the `og:image` metadata.

See [the content guide](docs/content-guide.md) for profile conventions and public-content boundaries.

## Verify changes

```sh
node --check assets/js/main.js
git diff --check
```

In a local browser, check desktop and mobile layouts, keyboard navigation, leadership tabs, expandable career entries, project filters and dialogs, and contact links. Confirm project destinations are publicly accessible, including the matching dialog links. Also check reduced-motion and JavaScript-disabled modes, asset requests, and the console.

Core content, links, and career expansion work without JavaScript. JavaScript adds the interactive controls progressively.

Legacy template pages, frameworks, unused media, and the PHP contact handler have been removed. Git history retains previously committed files. Keep screenshots, logs, and other generated files out of version control.

All rights reserved.
