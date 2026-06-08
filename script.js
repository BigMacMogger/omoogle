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

googleLoginBtn.addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithRedirect(provider);
});

// =========================
// AUTH STATE
// =========================

auth.onAuthStateChanged(async (user) => {

  if (!user) {
    return;
  }

  currentUser = user;

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

  // Validation
  const valid =
    /^[A-Za-z0-9_]{3,13}$/.test(username);

  if (!valid) {

    usernameStatus.innerText =
      "Username must be 3–13 letters, numbers, or _";

    return;
  }

  usernameStatus.innerText = "Checking...";

  const nameRef =
    db.ref("usernames/" + username);

  const existing =
    await nameRef.once("value");

  if (existing.exists()) {

    usernameStatus.innerText =
      "Username already taken";

    return;
  }

  // Save username
  await db.ref("users/" + currentUser.uid).set({

    username: username,

    elo: 1000,

    wins: 0,

    losses: 0,

    rank: "Fed",

    createdAt: Date.now(),

    lastUsernameChange: Date.now()

  });

  await db.ref("usernames/" + username)
    .set(currentUser.uid);

  usernameStatus.innerText =
    "Account created!";

  const profile = {
    username,
    elo: 1000,
    rank: "Fed"
  };

  loadProfile(profile);

  showMainMenu();

  setupOnlinePresence();

});

// =========================
// PROFILE
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
// ONLINE COUNTER
// =========================

function setupOnlinePresence() {

  const uid = currentUser.uid;

  db.ref("online/" + uid).set({
    lastSeen: Date.now()
  });

  db.ref("online/" + uid)
    .onDisconnect()
    .remove();

}

// Live online count
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
// PROFILE BUTTON
// =========================

document
  .getElementById("profileBtn")
  .addEventListener("click", () => {

    alert(
      "Profile system coming next."
    );

});

// =========================
// FIND MATCH BUTTON
// =========================

document
  .getElementById("findMatchBtn")
  .addEventListener("click", () => {

    alert(
      "Matchmaking system coming next."
    );

});
