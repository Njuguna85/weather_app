import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCH1MHbgYtOR9LvvrQ1ST0PzUUzzgYBeqI",
  authDomain: "weatherapk-a1b5c.firebaseapp.com",
  projectId: "weatherapk-a1b5c",
  storageBucket: "weatherapk-a1b5c.appspot.com",
  messagingSenderId: "992975417914",
  appId: "1:992975417914:web:a9462e7518ad3eb3113b03"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
