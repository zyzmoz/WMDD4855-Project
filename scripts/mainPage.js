document.querySelector("header").style.display = "flex";

output.innerHTML = JSON.parse(localStorage.getItem("currentUser")).name;
