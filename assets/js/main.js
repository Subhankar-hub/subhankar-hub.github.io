const root = document.documentElement;
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeModes = ["auto", "dark", "light"];
let selectedTheme = readTheme();

function readTheme() {
  try {
    const savedTheme = localStorage.getItem("portfolio-theme");
    return themeModes.includes(savedTheme) ? savedTheme : "auto";
  } catch {
    return "auto";
  }
}

function applyTheme() {
  if (selectedTheme === "auto") {
    root.removeAttribute("data-theme");
  } else {
    root.dataset.theme = selectedTheme;
  }

  if (themeToggle) {
    themeToggle.textContent = `theme: ${selectedTheme}`;
    themeToggle.setAttribute("aria-label", `Theme: ${selectedTheme}`);
  }

  document.querySelectorAll("[data-theme-color]").forEach((meta) => {
    meta.media = selectedTheme === "auto"
      ? `(prefers-color-scheme: ${meta.dataset.themeColor})`
      : (meta.dataset.themeColor === selectedTheme ? "all" : "not all");
  });
}

applyTheme();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    selectedTheme = themeModes[(themeModes.indexOf(selectedTheme) + 1) % themeModes.length];
    try {
      localStorage.setItem("portfolio-theme", selectedTheme);
    } catch {}
    applyTheme();
  });
}

const menuToggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".nav-links");
if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.querySelector(button.dataset.copy);
    if (!target) return;
    try {
      await navigator.clipboard.writeText(target.textContent);
      button.textContent = "Copied";
    } catch {
      button.textContent = "Copy failed";
    }
  });
});

document.querySelectorAll("[data-src]").forEach(async (element) => {
  try {
    const response = await fetch(element.dataset.src);
    if (!response.ok) throw new Error(`Could not load ${element.dataset.src}`);
    element.textContent = await response.text();
  } catch {
    element.textContent = "Could not load this file. Use the download link instead.";
  }
});

const sectionLinks = new Map(
  [...document.querySelectorAll("[data-section-link]")].map((link) => [link.dataset.sectionLink, link])
);
const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting);
  if (!visible.length) return;
  const currentId = visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0].target.id;
  sectionLinks.forEach((link, id) => {
    if (id === currentId) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}, { rootMargin: "-20% 0px -65% 0px" });

document.querySelectorAll("[data-section]").forEach((section) => observer.observe(section));
