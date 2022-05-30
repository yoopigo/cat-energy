const navMain = document.querySelector(".main-nav");
const navToggle = document.querySelector(".page-header__toggle");

navToggle.addEventListener("click", function (evt) {
  evt.preventDefault();
  if (navMain.classList.contains("main-nav--close")) {
    navMain.classList.remove("main-nav--close");
    navToggle.classList.remove("page-header__toggle--open");
    navToggle.classList.add("page-header__toggle--close");
  } else {
    navMain.classList.add("main-nav--close");
    navToggle.classList.add("page-header__toggle--open");
    navToggle.classList.remove("page-header__toggle--close");
  }
});
