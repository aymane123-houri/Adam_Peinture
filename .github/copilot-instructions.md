# Copilot / AI agent instructions for adampeinture

Summary
- Small static single-page site (HTML/CSS/JS). No build pipeline or package manager detected.
- Entry point: `index.html`. Styling: `style.css` (+ Tailwind via CDN). Logic: `js.js`. Assets: `image/` and `img/`.

Quick start (run & test locally)
- Open `index.html` in a browser for quick checks.
- Or run a local static server for full-file URL semantics:
  - Python: `python -m http.server 8000` (from repo root)
  - Node: `npx serve .` or `npx http-server .`
- Use the browser console to inspect JS runtime errors (there are no automated tests).

Big picture & architecture
- Single page marketing site (French content) with static assets and a few interactive widgets.
- External integrations: Tailwind CDN (`https://cdn.tailwindcss.com`), Font Awesome, Google Fonts. Offline dev requires internet access to render Tailwind/Fonts unless you vendor them.
- No backend; all interactive behavior is client-side in `js.js`.

Important files & patterns (examples)
- `index.html` — main structure and content. Sections use French IDs (e.g., `#services`, `#Contact`) — preserve wording when changing anchors.
- `style.css` — global CSS variables, component-level classes (`.card`, `.swatch`, `.icon-box`). Tailwind utilities are used inline in markup.
- `js.js` — interactive logic: copying color hex, carousels, comparison slider, mobile menu.
  - Example: color swatches are implemented as: `<button class="swatch" data-hex="#F5F7FA" ... onclick="copyHex('#F5F7FA')"></button>`
  - Carousel selectors: `.slidess`, `.cardss`, `.dot` (note the doubled-letter naming convention used across related classes).
  - Comparison slider container class: `.comparison-containerr` with inner `.slider`, `.slider-handlered`, `.image-after` — scripts expect these exact class names.

Project-specific conventions & gotchas
- Mixed asset folders: both `img/` (logo) and `image/` (gallery) are used — be careful when adding or moving images.
- Class naming is inconsistent and sometimes uses non-standard pluralization (e.g., `.cardss`, `.slidess`) — follow existing names when targeting elements.
- Inline handlers are used (e.g., `onclick="copyHex(...)"`) alongside DOM-ready listeners in `js.js`.
- Strings, IDs and content are primarily French; keep translations consistent when editing content.

Known issues & quick fixes (discovered from code)
- Missing toast element: `js.js` calls `document.getElementById('copyToast')` but no `#copyToast` exists in `index.html`. Add a small element to fix copy feedback, e.g.:
  `<div id="copyToast" class="copy-toast" aria-live="polite"></div>`
- Accessibility: many interactive elements rely on click handlers; keyboard handlers are added for swatches but verify focus order and aria labels for carousels and sliders.

When editing JS/CSS
- Keep class names as-is to avoid breaking selectors in `js.js` and `style.css`.
- If you refactor selectors, update both `index.html` and `js.js` simultaneously.
- Prefer adding small, isolated changes (e.g., add `#copyToast`) and test in-browser—there's no test harness.

Debug checklist for any UI change
1. Open `index.html` via local server and enable DevTools.
2. Verify element renders (images, fonts). If Tailwind utilities look missing, check CDN accessibility.
3. Trigger interactions used by change (click swatch, move slider, open mobile menu) and check console for errors.
4. Fix DOM/selector mismatches (missing IDs/classes) and re-test.

If you need to add CI/tests/build
- There is no existing build/test config. If introducing Node/Tailwind CLI, add `package.json` and document build steps in README and in this file.

Questions before making changes
- Should we unify asset folders (`img/` vs `image/`) or follow current structure?
- Would you like to introduce a minimal dev script (e.g., `serve` or `live-server`) in repo metadata for contributors?

Please review and tell me which sections you'd like expanded or any project-specific rules you want enforced (naming, localization, deployment targets).