document.querySelector("header").style.display = "flex";

const currentUser = JSON.parse(localStorage.getItem('currentUser'))
output.innerHTML = currentUser.name;

searchBookByKey('/works/OL66554W').then(res => console.log(res))
