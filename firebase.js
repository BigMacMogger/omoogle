alert("SCRIPT STARTED");

const provider = new firebase.auth.GoogleAuthProvider();

document.getElementById("googleLoginBtn").addEventListener("click", () => {
  alert("BUTTON CLICKED");

  auth.signInWithPopup(provider)
    .then((result) => {
      alert("LOGGED IN: " + result.user.email);
    })
    .catch((error) => {
      alert("ERROR: " + error.message);
      console.error(error);
    });
});
