// Setup header
document.querySelector("header").style.display = "none";

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Submit");
  if (password.value !== passwordConfirmation.value) {
    registerError.innerHTML = "Passwords must match";
    return;
  }

  if (password.value.length < 6) {
    registerError.innerHTML = "Passwords must have at least 6 characters";
    return;
  }

  // If Pass Create a user on database
  if (res) {
    await createUser(username.value, email.value);
    localStorage.setItem('currentUser', JSON.stringify({
      name: username.value,
      email: email.value,
    }));
  }

  const res = await register(email.value, password.value);

  
});
