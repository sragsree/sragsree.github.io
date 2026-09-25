(() => {
  "use strict";

  const storageKey = "sreerag-theme";
  const root = document.documentElement;
  const systemTheme = typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;
  const normalizePreference = (value) => (
    value === "light" || value === "dark" ? value : "system"
  );
  let preference = "system";

  try {
    preference = normalizePreference(window.localStorage.getItem(storageKey));
  } catch {
    // The theme still works when storage is unavailable or blocked.
  }

  const applyTheme = () => {
    const theme = preference === "system"
      ? (systemTheme?.matches ? "dark" : "light")
      : preference;
    root.dataset.theme = theme;

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute("content", theme === "dark" ? "#141719" : "#ffffff");
    }

    const portraitSource = document.getElementById("portrait-dark-source");
    if (portraitSource) {
      // Keep image selection in <picture>; do not race an img.src update.
      portraitSource.media = theme === "dark" ? "all" : "not all";
    }

    const themeSelect = document.getElementById("theme-select");
    if (themeSelect) themeSelect.value = preference;
  };

  // This script runs before the stylesheet so the first paint uses the chosen theme.
  applyTheme();

  const onSystemThemeChange = () => {
    if (preference === "system") applyTheme();
  };
  if (systemTheme?.addEventListener) {
    systemTheme.addEventListener("change", onSystemThemeChange);
  } else if (systemTheme?.addListener) {
    systemTheme.addListener(onSystemThemeChange);
  }

  window.addEventListener("storage", (event) => {
    if (event.key !== storageKey && event.key !== null) return;
    preference = normalizePreference(event.newValue);
    applyTheme();
  });

  const init = () => {
    const themeSelect = document.getElementById("theme-select");
    if (themeSelect) {
      themeSelect.addEventListener("change", () => {
        preference = normalizePreference(themeSelect.value);
        try {
          window.localStorage.setItem(storageKey, preference);
        } catch {
          // Keep the selected theme for this visit even without persistent storage.
        }
        applyTheme();
      });
      const themeControl = themeSelect.closest(".theme-control");
      if (themeControl) themeControl.hidden = false;
    }
    applyTheme();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
