// Setup header
document.querySelector("header").style.display = "none";

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("Submit")
  window.location.replace('#main')
})
