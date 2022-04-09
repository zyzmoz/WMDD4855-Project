loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { error } = await login(email.value, password.value).catch((error) => ({
    error,
  }));

  if (error) {
    registerError.innerHTML = error.message;
  }
});
