registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (password.value !== passwordConfirmation.value) {
    registerError.innerHTML = "Passwords must match";
    return;
  }

  if (password.value.length < 6) {
    registerError.innerHTML = "Passwords must have at least 6 characters";
    return;
  }

  const { error } = await register(email.value, password.value).catch(
    (err) => ({ error: err })
  );

  // If Pass Create a user on database
  if (!error) {
    await createUser(username.value, email.value);
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        name: username.value,
        email: email.value,
      })
    );
  } else {
    registerError.innerHTML = error.message;
  }
});
