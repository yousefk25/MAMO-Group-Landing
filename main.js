const burgerIcon = document.querySelector("#burger-icon");
const bars = document.querySelectorAll("#burger-icon span");
const nav = document.querySelector("nav");
const links = document.querySelectorAll("nav li a");
const themeBtn = document.querySelector("#theme");
const themeIcon = document.querySelector("#theme i");
const langIcon = document.querySelector("#lang");
const playIcon = document.querySelector("#play-button .fa-play");
const playButton = document.querySelector("#play-button");
const testimonialTabs = document.querySelectorAll("#testimonial-tabs button");
const faq = document.querySelectorAll("#faq ul div");
const faqPlus = document.querySelectorAll("#faq .fa-plus");
const faqtext = document.querySelectorAll("#faq p");

// Start Nav Menu
// Burger icon behaviour
function barsBehaviour() {
  bars.forEach((ele, index) => {
    // 1st & 3rd bar
    if (index === 0 || index === 2) {
      if (index === 0) {
        ele.classList.toggle("rotate-45");
      }
      if (index === 2) {
        ele.classList.toggle("-rotate-45");
      }
      ele.classList.toggle("absolute");
      ele.classList.toggle("translate-y-1/2");
    }

    // 2nd bar
    if (index === 1) {
      ele.classList.toggle("opacity-0");
    }
  });
}

function closeMenu() {
  nav.classList.add("max-h-0");
  nav.classList.remove("pbe-5");
  nav.classList.remove("max-h-85");
  bars.forEach((ele, index) => {
    // 1st & 3rd bar
    if (index === 0 || index === 2) {
      if (index === 0) {
        ele.classList.remove("rotate-45");
      }
      if (index === 2) {
        ele.classList.remove("-rotate-45");
      }
      ele.classList.remove("absolute");
      ele.classList.remove("translate-y-1/2");
    }

    // 2nd bar
    if (index === 1) {
      ele.classList.remove("opacity-0");
    }
  });
}

function openMenus() {
  nav.classList.toggle("max-h-0");
  nav.classList.toggle("pbe-5");
  nav.classList.toggle("max-h-85");
}

// Menu closing
burgerIcon.addEventListener("click", () => {
  openMenus();
  barsBehaviour();
});

// Close menu on click any links
links.forEach((ele) => {
  ele.onclick = () => {
    if (window.matchMedia("(max-width: 1024px)").matches) {
      openMenus();
      barsBehaviour();
    }
  };
});

// Close menu on any click
document.addEventListener("click", (ele) => {
  if (!nav.contains(ele.target) && !burgerIcon.contains(ele.target)) {
    closeMenu();
  }
});

// close menu during scroll
window.addEventListener("scroll", () => {
  if (
    window.matchMedia("(max-width: 1024px)").matches &&
    nav.classList.contains("max-h-85")
  ) {
    closeMenu();
  }
});
// End Nav Menu

// Start Dark Dark Theme
if (localStorage.getItem("theme") === "light") {
  themeIcon.classList.toggle("fa-sun");
  themeIcon.classList.toggle("fa-moon");
}

themeBtn.addEventListener("click", () => {
  themeIcon.classList.toggle("fa-sun");
  themeIcon.classList.toggle("fa-moon");
  document.documentElement.classList.toggle("dark");

  localStorage.getItem("theme") === "light"
    ? localStorage.setItem("theme", "dark")
    : localStorage.setItem("theme", "light");
});
// Start Dark Theme

// Language button
langIcon.addEventListener("click", () => {
  langIcon.innerText === "EN"
    ? (langIcon.innerText = "AR")
    : (langIcon.innerText = "EN");
});

// Video buton
playButton.addEventListener("click", () => {
  playIcon.classList.toggle("fa-play");
  playIcon.classList.toggle("fa-pause");
});

// Start Testimonial tabs
testimonialTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    testimonialTabs.forEach((t) => {
      t.classList.remove("testimonial-active");
    });
    tab.classList.add("testimonial-active");
  });
});
// End Testimonial tabs

// Start FAQ behaviour
faq.forEach((ele, index) => {
  ele.addEventListener("click", () => {
    if (!faqtext[index].classList.contains("faq-active")) {
      faqPlus.forEach((qu) => {
        qu.classList.remove("rotate-45");
      });

      faqtext.forEach((q) => {
        q.classList.add("max-h-0");
        q.classList.remove("faq-active");
      });
      faqPlus[index].classList.add("rotate-45");
      faqtext[index].classList.remove("max-h-0");
      faqtext[index].classList.add("faq-active");
    } else {
      faqPlus[index].classList.remove("rotate-45");
      faqtext[index].classList.add("max-h-0");
      faqtext[index].classList.remove("faq-active");
    }
  });
});
// End FAQ behaviour
