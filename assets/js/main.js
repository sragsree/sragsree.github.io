(() => {
  "use strict";

  const init = () => {
    const root = document.documentElement;
    root.classList.remove("no-js");
    root.classList.add("js");

    const header = document.getElementById("site-header");
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("primary-menu");
    const progress = document.getElementById("scroll-progress");
    const backToTop = document.getElementById("back-to-top");
    const navLinks = menu ? [...menu.querySelectorAll("a[href^='#']")] : [];
    const sections = [...document.querySelectorAll("[data-nav-section][id]")];
    const desktop = window.matchMedia("(min-width: 900px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let sectionPositions = [];
    let headerHeight = 0;
    let scrollRange = 0;
    let framePending = false;
    let measureNeeded = true;
    let activeSection;

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
        headerHeight = header ? header.getBoundingClientRect().height : 0;
        scrollRange = Math.max(0, root.scrollHeight - window.innerHeight);
        sectionPositions = sections.map((section) => ({
          id: section.id,
          top: section.getBoundingClientRect().top + scrollY,
        })).sort((first, second) => first.top - second.top);
        measureNeeded = false;
      }
      if (header) header.classList.toggle("is-scrolled", scrollY > 12);
      if (progress) {
        const fraction = scrollRange ? Math.min(1, scrollY / scrollRange) : 0;
        progress.style.transform = `scaleX(${fraction})`;
      }
      if (backToTop) backToTop.hidden = scrollY <= 600;

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
        window.requestAnimationFrame(updateScrollState);
      }
    };
    window.addEventListener("scroll", () => scheduleScrollUpdate(), { passive: true });
    window.addEventListener("resize", () => scheduleScrollUpdate(true), { passive: true });
    window.addEventListener("load", () => scheduleScrollUpdate(true), { once: true });
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

    const reveals = [...document.querySelectorAll(".reveal")];
    document.addEventListener("focusin", (event) => {
      let element = event.target.closest(".reveal");
      while (element) {
        element.classList.add("is-visible");
        element = element.parentElement ? element.parentElement.closest(".reveal") : null;
      }
    });
    if ("IntersectionObserver" in window && !reducedMotion.matches) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
      root.classList.add("has-reveal");
      reveals.forEach((element) => revealObserver.observe(element));
      reducedMotion.addEventListener("change", (event) => {
        if (!event.matches) return;
        revealObserver.disconnect();
        root.classList.remove("has-reveal");
        reveals.forEach((element) => element.classList.add("is-visible"));
      });
    } else {
      reveals.forEach((element) => element.classList.add("is-visible"));
    }

    scheduleScrollUpdate(true);
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
