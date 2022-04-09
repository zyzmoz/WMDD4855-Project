firebase.auth().onAuthStateChanged(async (user) => {
  //The callback is passed user parameter from event
  if (user) {

    localStorage.setItem("authenticated", true);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      const { user: userData } = await fetchUser(user.email);

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          name: userData?.name,
          email: user.email,
        })
      );
    }

    const pageHash = window.location.hash;
    if (pageHash === "#register" || pageHash === "#login")
      window.location.replace("#main");

    menu.style.display = "none";
    document.querySelector("header").style.display = "flex";

    // if there is a user object it means user logged in
    // show welcome message , redirect to home page etc.
  } else {

    localStorage.setItem("authenticated", false);
    const pageHash = window.location.hash;
    if (pageHash !== "#register" || pageHash !== "#login")
      window.location.replace("#login");
    localStorage.removeItem("currentUser");
    document.querySelector("header").style.display = "none";

    // if user object is null or undefined it means no user is logged in
    // redirect browser to login page. e.g. window.location.href="login.html"
  }
});

const login = (email, password) => 
  firebase.auth().signInWithEmailAndPassword(email, password);
;

const logout = () => firebase.auth().signOut();

const register = async (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);
