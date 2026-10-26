(() => {
  "use strict";

  const init = () => {
    const lab = document.querySelector(".readiness-lab");
    const hero = document.querySelector(".hero-grid");
    const surfaces = [hero, lab].filter(Boolean);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (lab) {
      const inputs = [...lab.querySelectorAll("input[data-gate]")];
      const presets = [...lab.querySelectorAll("button[data-scenario]")];
      const keys = ["node", "fabric", "evidence", "ownership"];
      const scenarios = {
        repair: { node: false, fabric: false, evidence: false, ownership: true },
        fabric: { node: true, fabric: false, evidence: true, ownership: true },
        ready: { node: true, fabric: true, evidence: true, ownership: true },
      };
      const gateNames = {
        node: "node validation", fabric: "fabric qualification",
        evidence: "current evidence", ownership: "release authority",
      };
      const title = lab.querySelector("[data-release-title]");
      const reason = lab.querySelector("[data-release-reason]");
      const owner = lab.querySelector("[data-release-owner]");
      const blockers = lab.querySelector("[data-release-blockers]");
      const stateLabel = lab.querySelector("[data-release-state]");
      const count = lab.querySelector("[data-gate-count]");
      const result = lab.querySelector(".decision-result");
      const preview = lab.querySelector(".capacity-preview");
      const previewLabels = preview && ["node", "fabric", "eligibility", "evidence", "authority"]
        .map((key) => preview.querySelector(`[data-${key}-caption]`));
      const hasPreview = previewLabels && previewLabels.every(Boolean);
      const valid = inputs.length === keys.length && keys.every((key) => inputs.some((input) => input.dataset.gate === key))
        && presets.every((button) => scenarios[button.dataset.scenario])
        && title && reason && owner && blockers && stateLabel && count && result;

      if (valid) {
        const render = (animate = true) => {
          const values = Object.fromEntries(inputs.map((input) => [input.dataset.gate, input.checked]));
          const missing = keys.filter((key) => !values[key]);
          const ready = missing.length === 0;
          const wasReady = lab.dataset.ready === "true";
          lab.dataset.ready = String(ready);
          inputs.forEach((input) => {
            input.closest("label").querySelector("[data-gate-status]").textContent = input.checked ? "Met" : "Required";
          });
          presets.forEach((button) => {
            const scenario = scenarios[button.dataset.scenario];
            button.setAttribute("aria-pressed", String(keys.every((key) => values[key] === scenario[key])));
          });
          count.textContent = `${keys.length - missing.length} of ${keys.length} conditions met`;
          stateLabel.textContent = ready ? "Eligible" : "Held";
          blockers.textContent = ready ? "All four conditions met in this model." : `Still required: ${missing.map((key) => gateNames[key]).join(", ")}.`;

          if (hasPreview) {
            preview.dataset.nodes = !values.node ? "required" : values.evidence ? "met" : "stale";
            preview.dataset.fabric = !values.fabric ? "required" : values.evidence ? "met" : "stale";
            preview.dataset.evidence = values.evidence ? "met" : "missing";
            preview.dataset.authority = values.ownership ? "met" : "missing";
            preview.dataset.eligible = String(ready);
            const captions = [
              !values.node ? "Check health" : values.evidence ? "Validated" : "Revalidate",
              !values.fabric ? "Qualify fabric" : values.evidence ? "Qualified" : "Revalidate",
              ready ? "Eligible in model" : "Held",
              values.evidence ? "Current evidence" : "Refresh evidence",
              values.ownership ? "Handoff authorized" : "Handoff held",
            ];
            previewLabels.forEach((element, index) => { element.textContent = captions[index]; });
            // One visual acknowledgement of newly eligible capacity, never a running-workload claim.
            preview.classList.toggle("is-releasing", animate && ready && !wasReady && !reducedMotion.matches);
          }

          let decision;
          if (!values.ownership) {
            decision = ["Hold for ownership.", "Release requires a clear control boundary. Close maintenance and authorize exclusive handoff before release.", "Operations + Allocation control"];
          } else if (!values.node) {
            decision = ["Hold for qualification.", "A completed repair does not prove GPU and host health. Re-run validation before relying on this capacity.", "Platform engineering + Qualification"];
          } else if (!values.evidence) {
            decision = ["Current evidence required.", "Existing checks do not establish current readiness. Refresh evidence for the current hardware, software, and topology before release.", "Platform engineering + Operations"];
          } else if (!values.fabric) {
            decision = ["Healthy nodes. Unqualified fabric.", "Individual GPUs can pass while distributed workloads still struggle. Validate the requested topology and collective performance.", "Networking + Qualification"];
          } else {
            decision = ["Eligible for handoff.", "Node and fabric checks pass, evidence matches the current configuration, and release authority is established. This model permits handoff.", "Allocation control + Customer readiness"];
          }
          [title.textContent, reason.textContent, owner.textContent] = decision;
          if (animate) result.classList.add("is-changing");
        };

        inputs.forEach((input) => {
          input.disabled = false;
          input.addEventListener("change", () => render());
        });
        presets.forEach((button) => {
          button.disabled = false;
          button.addEventListener("click", () => {
            const scenario = scenarios[button.dataset.scenario];
            inputs.forEach((input) => { input.checked = scenario[input.dataset.gate]; });
            render();
          });
        });
        result.addEventListener("animationend", () => result.classList.remove("is-changing"));
        if (hasPreview) {
          preview.addEventListener("animationend", (event) => {
            if (event.animationName === "capacity-release") preview.classList.remove("is-releasing");
          });
          reducedMotion.addEventListener("change", () => {
            if (reducedMotion.matches) preview.classList.remove("is-releasing");
          });
        }
        render(false);
      }
    }

    if (!surfaces.length) return;

    const pointerMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
    const hasAnimationFrame = typeof window.requestAnimationFrame === "function";
    let frameId = 0;
    let pendingPoint = null;
    let activeSurface = null;

    const clearSurface = (surface) => {
      if (!surface) return;
      surface.classList.remove("is-pointer-active");
      ["--pointer-x", "--pointer-y", "--pointer-dx", "--pointer-dy"].forEach((property) => surface.style.removeProperty(property));
    };

    const resetPointer = () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
      pendingPoint = null;
      clearSurface(activeSurface);
      activeSurface = null;
    };

    const pointerEnabled = () => hasAnimationFrame && pointerMedia.matches && !reducedMotion.matches && !document.hidden;

    const updatePointer = () => {
      frameId = 0;
      const point = pendingPoint;
      pendingPoint = null;
      if (!point || !pointerEnabled()) {
        resetPointer();
        return;
      }
      // One geometry read per scheduled pointer frame, before any style writes.
      const bounds = point.surface.getBoundingClientRect();
      if (!bounds.width || !bounds.height) {
        resetPointer();
        return;
      }
      const x = Math.min(1, Math.max(0, (point.x - bounds.left) / bounds.width));
      const y = Math.min(1, Math.max(0, (point.y - bounds.top) / bounds.height));
      if (activeSurface !== point.surface) clearSurface(activeSurface);
      activeSurface = point.surface;
      activeSurface.style.setProperty("--pointer-x", `${(x * 100).toFixed(2)}%`);
      activeSurface.style.setProperty("--pointer-y", `${(y * 100).toFixed(2)}%`);
      activeSurface.style.setProperty("--pointer-dx", `${((x - 0.5) * 8).toFixed(2)}px`);
      activeSurface.style.setProperty("--pointer-dy", `${((y - 0.5) * 8).toFixed(2)}px`);
      activeSurface.classList.add("is-pointer-active");
    };

    surfaces.forEach((surface) => {
      const queuePointer = (event) => {
        if (!pointerEnabled() || event.pointerType === "touch") return;
        pendingPoint = { surface, x: event.clientX, y: event.clientY };
        if (!frameId) frameId = window.requestAnimationFrame(updatePointer);
      };
      const leaveSurface = () => {
        if (activeSurface === surface || (pendingPoint && pendingPoint.surface === surface)) resetPointer();
      };
      surface.addEventListener("pointerenter", queuePointer, { passive: true });
      surface.addEventListener("pointermove", queuePointer, { passive: true });
      surface.addEventListener("pointerleave", leaveSurface);
      surface.addEventListener("pointercancel", leaveSurface);
    });

    window.addEventListener("scroll", resetPointer, { passive: true });
    document.addEventListener("visibilitychange", resetPointer);
    pointerMedia.addEventListener("change", resetPointer);
    reducedMotion.addEventListener("change", resetPointer);

  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
