let provider = new firebase.auth.GoogleAuthProvider();

const loginWithGoogle = () => {
  console.log("login");
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      //   showUserDetails(res.user);
      console.log(res);
    })
    .catch((err) => console.log(err));
};
// const logout = () => {
//   console.log("logout");
//   firebase
//     .auth()
//     .signOut()
//     .then((res) => console.log("user logged out"));
// };

// const showUserDetails = (user) => {
//   const show = document.getElementById("show");
//   show.textContent = user.email + " " + user.displayName;
// };
document.getElementById("login").addEventListener("click", loginWithGoogle);
