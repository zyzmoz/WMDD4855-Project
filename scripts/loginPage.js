// Setup header
document.querySelector("header").style.display = "none";

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  login(email.value, password.value)
})
