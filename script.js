alert("Script Loaded");

const provider = new firebase.auth.GoogleAuthProvider();

document.getElementById("googleLoginBtn")
.addEventListener("click", async () => {

  try {

    const result = await auth.signInWithPopup(provider);

    const user = result.user;

    alert("SUCCESS: " + user.email);

    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("mainMenu").classList.remove("hidden");

    document.getElementById("profileUsername").innerText =
      user.displayName || user.email;

  } catch (error) {

    alert("ERROR: " + error.message);
    console.error(error);

  }

});
