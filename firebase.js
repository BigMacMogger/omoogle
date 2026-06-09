const firebaseConfig = {
  apiKey: "AIzaSyDgJSJYCqQXzDhs7_VOWz13sobzoYNL7ao",
  authDomain: "omoogle-d0faa.firebaseapp.com",
  databaseURL: "https://omoogle-d0faa-default-rtdb.firebaseio.com",
  projectId: "omoogle-d0faa",
  storageBucket: "omoogle-d0faa.firebasestorage.app",
  messagingSenderId: "291641969937",
  appId: "1:291641969937:web:8d8626af2021ceebda90b0"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

console.log("Firebase Loaded");
alert("Firebase Loaded");
