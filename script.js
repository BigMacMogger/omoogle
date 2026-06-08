// =========================
// OMOOGLE ACCOUNT SYSTEM
// =========================

let currentUser = null;

// Elements
const loginScreen = document.getElementById("loginScreen");
const usernameScreen = document.getElementById("usernameScreen");
const mainMenu = document.getElementById("mainMenu");

const googleLoginBtn = document.getElementById("googleLoginBtn");

const usernameInput = document.getElementById("usernameInput");
const usernameStatus = document.getElementById("usernameStatus");
const createUsernameBtn = document.getElementById("createUsernameBtn");

const profileUsername = document.getElementById("profileUsername");
const profileRank = document.getElementById("profileRank");
const profileElo = document.getElementById("profileElo");

const onlineCount = document.getElementById("onlineCount");

// =========================
// GOOGLE LOGIN
// =========================

googleLoginBtn.addEventListener("click", async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  await auth.signInWithRedirect(provider);
});

// =========================
// HANDLE REDIRECT
// =========================

auth.getRedirectResult()
  .then((result) => {
    if (result.user) {
      console.log("Google login successful");
    }
  })
  .catch((error) => {
    console.error("Login Error:", error);
    alert("Login failed: " + error.message);
  });

// =========================
// AUTH STATE
// =========================

auth.onAuthStateChanged(async (user) => {

  if (!user) {
    return;
  }

  currentUser = user;

  console.log("Logged in:", user.email);

  const userRef = db.ref("users/" + user.uid);
  const snapshot = await userRef.once("value");

  // Existing account
  if (snapshot.exists()) {

    loadProfile(snapshot.val());

    showMainMenu();

    setupOnlinePresence();

  } else {

    showUsernameScreen();

  }

});

// =========================
// SCREENS
// =========================

function showUsernameScreen() {
  loginScreen.classList.add("hidden");
  usernameScreen.classList.remove("hidden");
}

function showMainMenu() {
  loginScreen.classList.add("hidden");
  usernameScreen.classList.add("hidden");
  mainMenu.classList.remove("hidden");
}

// =========================
// USERNAME CREATION
// =========================

createUsernameBtn.addEventListener("click", async () => {

  let username = usernameInput.value.trim();

  const valid =
    /^[A-Za-z0-9_]{3,13}$/.test(username);

  if (!valid) {

    usernameStatus.innerText =
      "Username must be 3-13 letters, numbers, or _";

    return;
  }

  usernameStatus.innerText = "Checking username...";

  const usernameRef =
    db.ref("usernames/" + username);

  const existing =
    await usernameRef.once("value");

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
    rank: "Fed",
    createdAt: Date.now(),
    lastUsernameChange: Date.now()
  };

  await db.ref("users/" + currentUser.uid)
    .set(profile);

  await db.ref("usernames/" + username)
    .set(currentUser.uid);

  loadProfile(profile);

  showMainMenu();

  setupOnlinePresence();

});

// =========================
// PROFILE DISPLAY
// =========================

function loadProfile(data) {

  profileUsername.innerText =
    data.username || "Unknown";

  profileRank.innerText =
    data.rank || "Fed";

  profileElo.innerText =
    (data.elo || 1000) + " ELO";

}

// =========================
// ONLINE SYSTEM
// =========================

function setupOnlinePresence() {

  if (!currentUser) return;

  const uid = currentUser.uid;

  db.ref("online/" + uid)
    .set({
      online: true,
      timestamp: Date.now()
    });

  db.ref("online/" + uid)
    .onDisconnect()
    .remove();

}

db.ref("online").on("value", (snapshot) => {

  const data = snapshot.val();

  if (!data) {
    onlineCount.innerText = "0";
    return;
  }

  onlineCount.innerText =
    Object.keys(data).length;

});

// =========================
// BUTTONS
// =========================

document
  .getElementById("profileBtn")
  .addEventListener("click", () => {

    alert(
      "Username changes and profile page coming soon."
    );

});

document
  .getElementById("findMatchBtn")
  .addEventListener("click", () => {

    alert(
      "Matchmaking coming next."
    );

});
