const routes = [
  new Route("#login", "pages/login.html", `scripts/loginPage.js`),
  new Route("#register", "pages/register.html", `scripts/registerPage.js`),
  new Route("#main", "pages/main.html", `scripts/mainPage.js`),
  new Route("#search", "pages/search.html", `scripts/searchPage.js`),
  new Route("#library", "pages/library.html", `scripts/libraryPage.js`),
];

Router.init("root", routes);

mobileMenu.addEventListener("click", () => {
  let menu = document.getElementById("menu");
  if (menu.style.display === "none") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
});

logoutButton.addEventListener('click', () => {
  logout()
})

homeButton.addEventListener('click', () => {
  location.replace("#main")
  menu.style.display = "none";
})

searchQuickAccess.addEventListener('click', () => {
  location.replace("#search")
  menu.style.display = "none";
})

searchButton.addEventListener('click', () => {
  location.replace("#search")
  menu.style.display = "none";
})

