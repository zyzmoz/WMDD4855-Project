const routes = [
  new Route("#login", "pages/login.html", `scripts/loginPage.js`),
  new Route("#register", "pages/register.html", `scripts/registerPage.js`),
  new Route("#main", "pages/main.html", `scripts/mainPage.js`),
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
