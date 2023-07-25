const toggleMenuBtn = document.querySelector("#toggle-menu-btn");
const nav = document.querySelector("#nav");
const navLinks = document.querySelectorAll(".nav-item-link");
const toggleMenuIcons = document.querySelectorAll(".header-toggle-menu");

console.log(nav.offsetWidth);

toggleMenuBtn.addEventListener("click", () => {
  nav.classList.toggle("nav-active");
  navLinks.forEach((navLink) => {
    navLink.classList.toggle("hidden");
  });
  toggleMenuIcons.forEach((toggleMenuIcon) => {
    toggleMenuIcon.classList.toggle("hidden");
  });
  navToggleMenu.classList.remove("nav-item-sub-menu-active");
});

// Details
const accordionHeaders = document.querySelectorAll(".card-accordion-header");
const cardAccordion = document.querySelector("#card-accordion");
accordionHeaders.forEach((item) => {
  item.addEventListener("click", () => {
    accordionHeaders.forEach((item) => {
      item.classList.toggle("hidden");
    });
    cardAccordion.classList.toggle("hidden");
  });
});

const accordionPoolHeaders = document.querySelectorAll(
  ".card-accordion-pool-header"
);
const cardAccordionPool = document.querySelector("#card-accordion-pool");
accordionPoolHeaders.forEach((item) => {
  item.addEventListener("click", () => {
    accordionPoolHeaders.forEach((item) => {
      item.classList.toggle("hidden");
    });
    cardAccordionPool.classList.toggle("hidden");
  });
});

const navItems = document.querySelectorAll(".nav-item-wrapper");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((item) => {
      item.classList.remove("active");
    });
    item.classList.toggle("active");
  });
});

const navToggleBtn = document.querySelector("#nav-toggle");
const navToggleMenu = document.querySelector("#nav-toggle-menu");

navToggleBtn.addEventListener("click", () => {
  navToggleMenu.classList.toggle("nav-item-sub-menu-active");
  nav.classList.remove("nav-active");
  navLinks.forEach((navLink) => {
    navLink.classList.remove("hidden");
  });
  if (nav.offsetWidth != 202) {
    toggleMenuIcons.forEach((toggleMenuIcon) => {
      toggleMenuIcon.classList.toggle("hidden");
    });
  }
});

// Modal Farm 1
document.getElementById("btn-modal-1").addEventListener("click", function () {
  document.getElementById("overlay-1").classList.add("is-visible");
  document.getElementById("modal-1").classList.add("is-visible");
});

document.getElementById("close-btn-1").addEventListener("click", function () {
  document.getElementById("overlay-1").classList.remove("is-visible");
  document.getElementById("modal-1").classList.remove("is-visible");
});
document.getElementById("overlay-1").addEventListener("click", function () {
  document.getElementById("overlay-1").classList.remove("is-visible");
  document.getElementById("modal-1").classList.remove("is-visible");
});

// Modal Stake 1
document
  .getElementById("btn-modal-stake-1")
  .addEventListener("click", function () {
    document.getElementById("overlay-stake-1").classList.add("is-visible");
    document.getElementById("modal-stake-1").classList.add("is-visible");
  });

document
  .getElementById("close-btn-stake-1")
  .addEventListener("click", function () {
    document.getElementById("overlay-stake-1").classList.remove("is-visible");
    document.getElementById("modal-stake-1").classList.remove("is-visible");
  });
document
  .getElementById("overlay-stake-1")
  .addEventListener("click", function () {
    document.getElementById("overlay-stake-1").classList.remove("is-visible");
    document.getElementById("modal-stake-1").classList.remove("is-visible");
  });

// Modal Stake 2
document
  .getElementById("btn-modal-stake-2")
  .addEventListener("click", function () {
    console.log("run");
    document.getElementById("overlay-stake-2").classList.add("is-visible");
    document.getElementById("modal-stake-2").classList.add("is-visible");
  });

document
  .getElementById("close-btn-stake-2")
  .addEventListener("click", function () {
    document.getElementById("overlay-stake-2").classList.remove("is-visible");
    document.getElementById("modal-stake-2").classList.remove("is-visible");
  });
document
  .getElementById("overlay-stake-2")
  .addEventListener("click", function () {
    document.getElementById("overlay-stake-2").classList.remove("is-visible");
    document.getElementById("modal-stake-2").classList.remove("is-visible");
  });
