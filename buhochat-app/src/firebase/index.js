import firebase from 'firebase';
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AAAA_f89Rn0:APA91bGCNXc4Atskk-2VgCsCTDjflaTicwqe0J6CpDJKaoCHfbouESs1rQtOXNPP26kO9ac5TdIKmLEO271iK_A9gUIlWyxxQ5kYu__naDrola8mMTl7aJLh-eI5boqx_jpRcT7C-nQM",
  authDomain: "buhochat-eefbd.appspot.com",
  projectId: "buhochat-eefbd",
  storageBucket: "https://buhochat-eefbd.firebaseapp.com/",
  messagingSenderId: "97721431269",
  appId: "1:1090908931709:web:8afa183c839eb262015314",
  
 });

export const auth = app.auth();