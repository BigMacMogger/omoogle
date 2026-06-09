const provider = new firebase.auth.GoogleAuthProvider();

document.getElementById("googleLoginBtn").addEventListener("click", async () => {

  try {

    const result = await auth.signInWithPopup(provider);

    alert("SUCCESS: " + result.user.email);

  } catch (error) {

    alert("ERROR: " + error.message);

    console.error(error);

  }

});
