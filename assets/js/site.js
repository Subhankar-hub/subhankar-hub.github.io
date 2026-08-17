document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-links");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const target = document.querySelector(btn.getAttribute("data-copy"));
      if (!target) return;
      await navigator.clipboard.writeText(target.textContent);
      const label = btn.textContent;
      btn.textContent = "Copied";
      setTimeout(() => {
        btn.textContent = label;
      }, 1500);
    });
  });

  document.querySelectorAll("[data-src]").forEach(async (el) => {
    try {
      const res = await fetch(el.getAttribute("data-src"));
      el.textContent = await res.text();
    } catch (err) {
      el.textContent = "Could not load this file. Open it from the download link instead.";
    }
  });
});
