import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcKHxcO3_PkFyYMtuh0B7adPsubMjmbms",
  authDomain: "buhochat-eefbd.firebaseapp.com",
  databaseURL: "https://buhochat-eefbd-default-rtdb.firebaseio.com",
  projectId: "buhochat-eefbd",
  storageBucket: "buhochat-eefbd.appspot.com",
  messagingSenderId: "1090908931709",
  appId: "1:1090908931709:web:8afa183c839eb262015314",
  measurementId: "G-PET6BYFD5V",
};
const app = firebase.initializeApp(firebaseConfig);

export const db = app.database();
export const auth = app.auth();
