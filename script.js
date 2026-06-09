// OMOOGLE ACCOUNT SYSTEM

const loginScreen = document.getElementById("loginScreen");
const usernameScreen = document.getElementById("usernameScreen");
const mainMenu = document.getElementById("mainMenu");

const googleLoginBtn = document.getElementById("googleLoginBtn");
const createUsernameBtn = document.getElementById("createUsernameBtn");

const usernameInput = document.getElementById("usernameInput");
const usernameStatus = document.getElementById("usernameStatus");

const profileUsername = document.getElementById("profileUsername");
const profileRank = document.getElementById("profileRank");
const profileElo = document.getElementById("profileElo");

let currentUser = null;

// Google Login
googleLoginBtn.addEventListener("click", async () => {

  try {

    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    currentUser = result.user;

    loadUser();

  } catch (error) {

    alert(error.message);
    console.error(error);

  }

});

// Load User
async function loadUser() {

  const snapshot = await db
    .ref("users/" + currentUser.uid)
    .once("value");

  if (snapshot.exists()) {

    const data = snapshot.val();

    profileUsername.innerText = data.username;
    profileRank.innerText = data.rank;
    profileElo.innerText = data.elo + " ELO";

    loginScreen.classList.add("hidden");
    usernameScreen.classList.add("hidden");
    mainMenu.classList.remove("hidden");

  } else {

    loginScreen.classList.add("hidden");
    usernameScreen.classList.remove("hidden");

  }

}

// Username Creation
createUsernameBtn.addEventListener("click", async () => {

  const username = usernameInput.value.trim();

  if (!/^[A-Za-z0-9_]{3,13}$/.test(username)) {

    usernameStatus.innerText =
      "Username must be 3-13 characters";

    return;

  }

  const existing = await db
    .ref("usernames/" + username)
    .once("value");

  if (existing.exists()) {

    usernameStatus.innerText =
      "Username already taken";

    return;

  }

  const profile = {

    username: username,
    elo: 1000,
    wins: 0,
    losses: 0,
    rank: "Fed"

  };

  await db
    .ref("users/" + currentUser.uid)
    .set(profile);

  await db
    .ref("usernames/" + username)
    .set(currentUser.uid);

  profileUsername.innerText = username;
  profileRank.innerText = "Fed";
  profileElo.innerText = "1000 ELO";

  usernameScreen.classList.add("hidden");
  mainMenu.classList.remove("hidden");

});

// SIGN OUT

signOutBtn.addEventListener("click", async () => {

  const confirmed = confirm(
    "Are you sure you want to sign out?"
  );

  if (!confirmed) {
    return;
  }

  try {

    await auth.signOut();

    location.reload();

  } catch (error) {

    alert(error.message);

  }

});
