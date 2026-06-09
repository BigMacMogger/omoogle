const firebaseConfig = {
  apiKey: "AIzaSyDgJSJYCqQXzDhs7_VOWz13sobzoYNL7ao",
  authDomain: "omoogle-d0faa.firebaseapp.com",
  projectId: "omoogle-d0faa",
  storageBucket: "omoogle-d0faa.appspot.com",
  messagingSenderId: "291641969937",
  appId: "1:291641969937:web:b01f5c40857a3980da90b0",
  databaseURL: "https://omoogle-d0faa-default-rtdb.firebaseio.com"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();
    
