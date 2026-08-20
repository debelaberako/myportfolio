function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const btn = document.getElementById("modeToggle");
const btn2 = document.getElementById("modeToggle2");
const themeIcons = document.querySelectorAll("[src-light][src-dark]");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  setDarkMode();
}

btn.addEventListener("click", function () {
  setTheme();
});

btn2.addEventListener("click", function () {
  setTheme();
});

function setTheme() {
  const activeTheme = document.body.getAttribute("theme");

  if (activeTheme === "dark") {
    setLightMode();
  } else {
    setDarkMode();
  }
}

function setDarkMode() {
  document.body.setAttribute("theme", "dark");
  localStorage.setItem("theme", "dark");

  themeIcons.forEach((icon) => {
    const darkSrc = icon.getAttribute("src-dark");
    if (darkSrc) {
      icon.src = darkSrc;
    }
  });
}

function setLightMode() {
  document.body.removeAttribute("theme");
  localStorage.setItem("theme", "light");

  themeIcons.forEach((icon) => {
    const lightSrc = icon.getAttribute("src-light");
    if (lightSrc) {
      icon.src = lightSrc;
    }
  });
}

document.addEventListener("click", function (event) {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  const hamburgerNav = document.getElementById("hamburger-nav");

  if (
    menu &&
    icon &&
    hamburgerNav &&
    menu.classList.contains("open") &&
    !hamburgerNav.contains(event.target)
  ) {
    menu.classList.remove("open");
    icon.classList.remove("open");
  }
});

function initScrollAnimations() {
  const revealTargets = [];

  document.querySelectorAll("section:not(#profile)").forEach((section) => {
    section.querySelectorAll(".section__text__p1, .title").forEach((el) => {
      el.classList.add("reveal");
      revealTargets.push(el);
    });

    section.querySelectorAll(".details-container, .text-container").forEach((el, index) => {
      el.classList.add("reveal-scale");
      el.style.setProperty("--reveal-delay", `${index * 0.1}s`);
      revealTargets.push(el);
    });

    section.querySelectorAll("article").forEach((el, index) => {
      el.classList.add("reveal");
      el.style.setProperty("--reveal-delay", `${(index % 6) * 0.07}s`);
      revealTargets.push(el);
    });

    const contactBlock = section.querySelector(".contact-info-upper-container");
    if (contactBlock) {
      contactBlock.classList.add("reveal-scale");
      revealTargets.push(contactBlock);
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealTargets.forEach((target) => observer.observe(target));
}

function initNavEffects() {
  const navBars = [document.getElementById("desktop-nav"), document.getElementById("hamburger-nav")];
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateNav() {
    const scrollY = window.scrollY;

    navBars.forEach((nav) => {
      if (nav) {
        nav.classList.toggle("nav-scrolled", scrollY > 24);
      }
    });

    let currentSection = "profile";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === `#${currentSection}`);
    });
  }

  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();
}

initScrollAnimations();
initNavEffects();
