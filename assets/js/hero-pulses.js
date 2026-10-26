(() => {
  "use strict";

  const init = () => {
    const hero = document.querySelector(".hero-grid");
    const toggle = document.getElementById("hero-motion-toggle");
    const label = toggle && toggle.querySelector("[data-motion-label]");
    const signals = hero ? [...hero.querySelectorAll(".infrastructure-signal")] : [];
    // Each burst requires two distinct paths and a pause control.
    if (!hero || !toggle || !label || signals.length < 2) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pulseInterval = 3000;
    let userPaused = false;
    let heroVisible = false;
    let pageSuspended = false;
    let timer = null;
    let previousSignals = new Set();

    const clearSignals = () => {
      signals.forEach((signal) => signal.classList.remove("is-pulsing"));
    };

    const stop = () => {
      if (timer !== null) window.clearTimeout(timer);
      timer = null;
      clearSignals();
    };

    const canRun = () => heroVisible && !userPaused && !reducedMotion.matches && !document.hidden && !pageSuspended;

    const playBurst = () => {
      if (!canRun()) {
        stop();
        return;
      }
      clearSignals();
      const freshPaths = signals.filter((signal) => !previousSignals.has(signal));
      const candidates = freshPaths.length >= 2 ? freshPaths : [...signals];
      const selected = [];
      while (selected.length < 2) {
        const index = Math.floor(Math.random() * candidates.length);
        selected.push(candidates.splice(index, 1)[0]);
      }
      previousSignals = new Set(selected);
      selected.forEach((signal) => signal.classList.add("is-pulsing"));
      timer = window.setTimeout(() => {
        timer = null;
        playBurst();
      }, pulseInterval);
    };

    const syncPlayback = () => {
      if (!canRun()) stop();
      else if (timer === null) playBurst();
    };

    const updateControl = () => {
      toggle.hidden = reducedMotion.matches;
      toggle.setAttribute("aria-pressed", String(userPaused));
      label.textContent = userPaused ? "Resume motion" : "Pause motion";
      toggle.setAttribute("aria-label", userPaused ? "Resume motion: background light pulses" : "Pause motion: background light pulses");
    };

    const readVisibility = () => {
      const bounds = hero.getBoundingClientRect();
      heroVisible = bounds.width > 0 && bounds.height > 0
        && bounds.bottom > 0 && bounds.top < window.innerHeight
        && bounds.right > 0 && bounds.left < window.innerWidth;
      syncPlayback();
    };

    toggle.type = "button";
    toggle.addEventListener("click", () => {
      userPaused = !userPaused;
      updateControl();
      syncPlayback();
    });

    signals.forEach((signal) => {
      signal.addEventListener("animationend", (event) => {
        if (event.target === signal && event.animationName === "infrastructure-pass") signal.classList.remove("is-pulsing");
      });
    });

    reducedMotion.addEventListener("change", () => {
      updateControl();
      syncPlayback();
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else readVisibility();
    });
    window.addEventListener("pagehide", () => {
      pageSuspended = true;
      stop();
    });
    window.addEventListener("pageshow", () => {
      pageSuspended = false;
      readVisibility();
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.target !== hero) return;
          heroVisible = entry.isIntersecting && entry.intersectionRatio >= 0.01;
        });
        syncPlayback();
      }, { threshold: 0.01 });
      observer.observe(hero);
    } else {
      window.addEventListener("scroll", readVisibility, { passive: true });
      window.addEventListener("resize", readVisibility, { passive: true });
    }

    updateControl();
    readVisibility();
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
