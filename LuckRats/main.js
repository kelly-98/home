const header = document.querySelector("#header");
window.addEventListener("scroll", () => {
  const y = this.scrollY;
  if (y === 0) {
    header.style.backgroundColor = "rgba(14, 11, 55, 0)";
  }
  if (y > 0) {
    header.style.backgroundColor = `rgba(14, 11, 55, ${y / 100})`;
  }
});

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    center: true,
    nav: true,
    dots: false,
    navText: [
      `<img src="./img/nextslider.png" />`,
      `<img src="./img/nextslider.png" />`,
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  });
});

// Animations
// Animation
function reveal() {
  const reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

// Menu
const menuToggleBtn = document.querySelector("#menu-toggle-btn");
const menuToggle = document.querySelector("#menu-toggle");

menuToggleBtn.addEventListener("click", () => {
  menuToggle.classList.toggle("header-menu-toggle-active");
});
