let $ = document;

let isMenuOpen = false;

const openMenu = (nav, hamburger) => {
  nav
    .classList
    .remove("hidden-xs");
  hamburger.innerHTML = `<i class="fas fa-times fa-2x"></i>`;
}

const closeMenu = (nav, hamburger) => {
  nav
    .classList
    .add("hidden-xs");
  hamburger.innerHTML = `<i class="fas fa-bars fa-2x"></i>`;
}

// Chargement de la page
$
  .addEventListener("DOMContentLoaded", () => {
    // elements
    let hamburger = $.querySelector("#hamburger");
    let nav = $.querySelector("nav");
    let items = $.querySelectorAll("nav > ul > li");
    let links = $.querySelectorAll("nav > ul > li > a");
    /* backToTop */
    let backToTop = $.querySelector("#backToTop");
    backToTop.style.display = "none";
    backToTop.addEventListener("click", () => {
      $
        .querySelector("header")
        .scrollIntoView({block: "start", behavior: "smooth"})
    });
    /* hamburger */
    hamburger.addEventListener("click", () => {
      isMenuOpen = !isMenuOpen;
      if (isMenuOpen) {
        openMenu(nav, hamburger);
      } else {
        closeMenu(nav, hamburger);
      }
    });
    // menu items
    for (let i = 0; i < items.length; i++) {
      items[i]
        .addEventListener("click", () => {
          isMenuOpen = !isMenuOpen;
          // close menu
          closeMenu(nav, hamburger);
          // get href attribute of each links
          let section = items[i]
            .querySelector("a")
            .getAttribute("href");
          // scroll to section
          $
            .querySelector(section)
            .scrollIntoView({block: "start", behavior: "smooth"});
        });
    }
    // on scroll page
    window
      .addEventListener("scroll", () => {
        let scroll = window.scrollY;
        if (scroll > 100) {
          backToTop.style.display = null;
        } else {
          backToTop.style.display = "none";
        }
      });
    // links items
    for (let i = 0; i < links.length; i++) {
      links[i]
        .addEventListener("click", (e) => {
          e.preventDefault();
        });
    }
  });