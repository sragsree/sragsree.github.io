(() => {
  "use strict";

  const init = () => {
    const root = document.documentElement;
    root.classList.remove("no-js");
    root.classList.add("js");

    const header = document.getElementById("site-header");
    const hero = document.querySelector(".hero");
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("primary-menu");
    const progress = document.getElementById("scroll-progress");
    const backToTop = document.getElementById("back-to-top");
    const navLinks = menu ? [...menu.querySelectorAll("a[href^='#']")] : [];
    const sections = [...document.querySelectorAll("[data-nav-section][id]")];
    const reveals = [...document.querySelectorAll(".reveal")];
    const desktop = window.matchMedia("(min-width: 900px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hasAnimationFrame = typeof window.requestAnimationFrame === "function";
    const revealProgress = new WeakMap();
    let sectionPositions = [];
    let revealPositions = [];
    let viewportHeight = 1;
    let headerHeight = 0;
    let heroTop = 0;
    let heroHeight = 1;
    let heroProgress = -1;
    let scrollRange = 0;
    let framePending = false;
    let measureNeeded = true;
    let activeSection;

    const setRevealProgress = (element, value) => {
      if (revealProgress.get(element) === value) return;
      revealProgress.set(element, value);
      element.style.setProperty("--reveal-progress", String(value));
    };

    const setMenuOpen = (open) => {
      if (!menuToggle || !menu) return;
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      document.body.classList.toggle("menu-open", open);
      if (!open && !desktop.matches && menu.contains(document.activeElement)) {
        menuToggle.focus({ preventScroll: true });
      }
    };

    if (menuToggle && menu) {
      menuToggle.hidden = false;
      menuToggle.addEventListener("click", () => {
        setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
      });
      menu.addEventListener("click", (event) => {
        const link = event.target.closest("a");
        if (!link) return;
        const wasOpen = menuToggle.getAttribute("aria-expanded") === "true";
        setMenuOpen(false);
        if (wasOpen && !desktop.matches && link.hash) {
          const target = document.getElementById(link.hash.slice(1));
          if (!target) return;
          const needsTabIndex = !target.hasAttribute("tabindex");
          if (needsTabIndex) target.tabIndex = -1;
          // Leave scrolling to the anchor's native navigation, including reduced-motion CSS.
          target.focus({ preventScroll: true });
          if (needsTabIndex) {
            target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
          }
        }
      });
      document.addEventListener("click", (event) => {
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
          setMenuOpen(false);
        }
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
          setMenuOpen(false);
          menuToggle.focus();
        }
      });
      desktop.addEventListener("change", (event) => {
        if (event.matches) setMenuOpen(false);
      });
      setMenuOpen(false);
    }

    const updateScrollState = () => {
      framePending = false;
      const scrollY = Math.max(0, window.scrollY);
      if (measureNeeded) {
        viewportHeight = Math.max(1, window.innerHeight);
        headerHeight = header ? header.getBoundingClientRect().height : 0;
        if (hero) {
          const bounds = hero.getBoundingClientRect();
          heroTop = bounds.top + scrollY;
          heroHeight = Math.max(1, bounds.height);
        }
        scrollRange = Math.max(0, root.scrollHeight - viewportHeight);
        sectionPositions = sections.map((section) => ({
          id: section.id,
          top: section.getBoundingClientRect().top + scrollY,
        })).sort((first, second) => first.top - second.top);
        revealPositions = reveals.map((element) => {
          if (element.matches(".experience-heading") || element.hidden || element.offsetHeight === 0) {
            return { element, skip: true };
          }
          // Offset coordinates exclude the transforms used by the reveal itself.
          let top = 0;
          for (let parent = element; parent; parent = parent.offsetParent) {
            top += parent.offsetTop;
          }
          return { element, top, skip: false };
        });
        measureNeeded = false;
      }
      if (header) header.classList.toggle("is-scrolled", scrollY > 12);
      if (progress) {
        const fraction = scrollRange ? Math.min(1, scrollY / scrollRange) : 0;
        progress.style.transform = `scaleX(${fraction})`;
      }
      if (backToTop) backToTop.hidden = scrollY <= 600;
      if (hero) {
        const nextProgress = hasAnimationFrame && desktop.matches && !reducedMotion.matches
          ? Math.min(1, Math.max(0, (scrollY + headerHeight - heroTop) / heroHeight))
          : 0;
        if (nextProgress !== heroProgress) {
          heroProgress = nextProgress;
          hero.style.setProperty("--hero-progress", String(heroProgress));
        }
      }
      const revealMotionEnabled = hasAnimationFrame && !reducedMotion.matches;
      revealPositions.forEach(({ element, top, skip }) => {
        if (element.contains(document.activeElement)) element.classList.add("is-focus-visible");
        let value = revealProgress.get(element) ?? 0;
        if (!revealMotionEnabled || skip || element.classList.contains("is-focus-visible")) {
          value = 1;
        } else if (top <= scrollY + viewportHeight * 0.86) {
          value = 1;
        } else if (top > scrollY + viewportHeight + 96) {
          // Re-arm only after the element is fully below the viewport, avoiding threshold flicker.
          value = 0;
        }
        setRevealProgress(element, value);
      });
      // Set initial targets before enabling transitions so already-visible content stays visible.
      root.classList.toggle("has-reveal", revealMotionEnabled);

      let current = null;
      for (const section of sectionPositions) {
        if (section.top <= scrollY + headerHeight + 100) current = section.id;
      }
      if (scrollRange > 0 && scrollY >= scrollRange - 2 && sectionPositions.length) {
        current = sectionPositions[sectionPositions.length - 1].id;
      }
      if (current !== activeSection) {
        activeSection = current;
        navLinks.forEach((link) => {
          const active = link.getAttribute("href") === `#${current}`;
          link.classList.toggle("is-active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }
    };

    const scheduleScrollUpdate = (remeasure = false) => {
      measureNeeded = measureNeeded || remeasure;
      if (!framePending) {
        framePending = true;
        if (hasAnimationFrame) window.requestAnimationFrame(updateScrollState);
        else updateScrollState();
      }
    };
    window.addEventListener("scroll", () => scheduleScrollUpdate(), { passive: true });
    window.addEventListener("resize", () => scheduleScrollUpdate(true), { passive: true });
    window.addEventListener("load", () => scheduleScrollUpdate(true), { once: true });
    desktop.addEventListener("change", () => scheduleScrollUpdate(true));
    reducedMotion.addEventListener("change", () => scheduleScrollUpdate(true));
    if ("ResizeObserver" in window) {
      const resizeObserver = new ResizeObserver(() => scheduleScrollUpdate(true));
      resizeObserver.observe(document.body);
      sections.forEach((section) => resizeObserver.observe(section));
    }
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => scheduleScrollUpdate(true));
    }

    const tabList = document.getElementById("leadership-tabs");
    if (tabList) {
      const tabs = [...tabList.querySelectorAll("[role='tab']")];
      const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));
      if (tabs.length && panels.every(Boolean)) {
        const selectTab = (index, moveFocus = false) => {
          tabs.forEach((tab, tabIndex) => {
            const selected = tabIndex === index;
            tab.setAttribute("aria-selected", String(selected));
            tab.tabIndex = selected ? 0 : -1;
            panels[tabIndex].hidden = !selected;
          });
          if (moveFocus) tabs[index].focus();
          scheduleScrollUpdate(true);
        };
        tabs.forEach((tab, index) => {
          tab.addEventListener("click", () => selectTab(index));
          tab.addEventListener("keydown", (event) => {
            let nextIndex = index;
            if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
            else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
            else if (event.key === "Home") nextIndex = 0;
            else if (event.key === "End") nextIndex = tabs.length - 1;
            else return;
            event.preventDefault();
            selectTab(nextIndex, true);
          });
        });
        tabList.hidden = false;
        const initialIndex = tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true");
        selectTab(initialIndex < 0 ? 0 : initialIndex);
      }
    }

    const filters = document.getElementById("project-filters");
    const cards = [...document.querySelectorAll(".project-card[data-category]")];
    const projectCount = document.getElementById("project-count");
    if (filters) {
      const buttons = [...filters.querySelectorAll("button[data-filter]")];
      const applyFilter = (selectedButton) => {
        const filter = selectedButton.dataset.filter;
        let visibleCount = 0;
        cards.forEach((card) => {
          const categories = card.dataset.category.split(/[\s,]+/);
          const visible = filter === "all" || categories.includes(filter);
          card.hidden = !visible;
          if (visible) visibleCount += 1;
        });
        buttons.forEach((button) => {
          button.setAttribute("aria-pressed", String(button === selectedButton));
        });
        if (projectCount) projectCount.textContent = `${visibleCount} ${visibleCount === 1 ? "project" : "projects"}`;
        scheduleScrollUpdate(true);
      };
      buttons.forEach((button) => button.addEventListener("click", () => applyFilter(button)));
      filters.hidden = false;
      if (buttons.length) {
        applyFilter(buttons.find((button) => button.getAttribute("aria-pressed") === "true") || buttons[0]);
      }
    }

    const dialog = document.getElementById("project-dialog");
    const dialogTitle = document.getElementById("project-dialog-title");
    const dialogCategory = document.getElementById("project-dialog-category");
    const dialogDescription = document.getElementById("project-dialog-description");
    const dialogLink = document.getElementById("project-dialog-link");
    const closeProject = document.getElementById("close-project");
    let dialogOpener = null;
    if (dialog && typeof dialog.showModal === "function" && dialogTitle && dialogCategory && dialogDescription && dialogLink) {
      document.querySelectorAll("button[data-project]").forEach((button) => {
        const template = document.getElementById(`project-${button.dataset.project}`);
        if (!(template instanceof HTMLTemplateElement)) return;
        const title = template.content.querySelector(".detail-title");
        const category = template.content.querySelector(".detail-category");
        const description = template.content.querySelector(".detail-description");
        const link = template.content.querySelector(".detail-link");
        if (!title || !category || !description || !link) return;
        button.hidden = false;
        button.addEventListener("click", () => {
          dialogTitle.textContent = title.textContent;
          dialogCategory.textContent = category.textContent;
          dialogDescription.replaceChildren(...[...description.childNodes].map((node) => node.cloneNode(true)));
          dialogLink.textContent = link.textContent;
          dialogLink.setAttribute("href", link.getAttribute("href"));
          dialogLink.setAttribute("target", "_blank");
          dialogLink.setAttribute("rel", "noopener noreferrer");
          dialogOpener = button;
          dialog.showModal();
          if (closeProject) closeProject.focus();
        });
      });
      if (closeProject) closeProject.addEventListener("click", () => dialog.close());
      let pointerStartedOutside = false;
      const outsideDialog = (event) => {
        const bounds = dialog.getBoundingClientRect();
        return event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
      };
      dialog.addEventListener("pointerdown", (event) => {
        pointerStartedOutside = event.target === dialog && outsideDialog(event);
      });
      dialog.addEventListener("click", (event) => {
        if (pointerStartedOutside && event.target === dialog && outsideDialog(event)) dialog.close();
        pointerStartedOutside = false;
      });
      dialog.addEventListener("close", () => {
        if (dialogOpener && dialogOpener.isConnected) dialogOpener.focus({ preventScroll: true });
        dialogOpener = null;
      });
    }

    const footerYear = document.getElementById("footer-year");
    if (footerYear) footerYear.textContent = String(new Date().getFullYear());

    document.addEventListener("focusin", (event) => {
      let element = event.target.closest(".reveal");
      while (element) {
        element.classList.add("is-focus-visible");
        setRevealProgress(element, 1);
        element = element.parentElement ? element.parentElement.closest(".reveal") : null;
      }
      scheduleScrollUpdate();
    });
    document.addEventListener("focusout", () => scheduleScrollUpdate());

    scheduleScrollUpdate(true);
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
