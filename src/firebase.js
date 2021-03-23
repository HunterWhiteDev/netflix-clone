import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCD0ziK3Q2qk0yal_0XeGYTAbuS2czHYtM",
  authDomain: "netflix-51bda.firebaseapp.com",
  projectId: "netflix-51bda",
  storageBucket: "netflix-51bda.appspot.com",
  messagingSenderId: "459237175411",
  appId: "1:459237175411:web:566a4efd81c8dd70207a06",
  measurementId: "G-YJX9VRB2L4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
