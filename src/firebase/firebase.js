import firebase from "firebase/app";
import "firebase/firestore";
import creds from "./firebaseCred.json";

var firebaseConfig = {
  ...creds
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
