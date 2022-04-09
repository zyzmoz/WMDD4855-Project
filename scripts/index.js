const routes = [
  new Route("#login", "pages/login.html", `scripts/loginPage.js`),
  new Route("#register", "pages/register.html", `scripts/registerPage.js`),
  new Route("#libraries", "pages/libraries.html", `scripts/librariesPage.js`),
  new Route("#main", "pages/main.html", `scripts/mainPage.js`),
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

libraryButton.addEventListener('click', () => {
  location.replace("#library")
  menu.style.display = "none";
})

librariesButton.addEventListener('click', () => {
  location.replace("#libraries")
  menu.style.display = "none";
})

