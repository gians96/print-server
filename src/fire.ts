import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "dotenv/config";
// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
import { doc, onSnapshot } from "firebase/firestore";


//cuando tenemos id
// const unsub = onSnapshot(doc(db, "domain-client-printer", "*"), (doc) => {
//   console.log("Current data: ", doc.data());
// });


import { collection, query, where } from "firebase/firestore";

const q = query(collection(db, "domain-client-printer"),
  where("active", "==", true),
  where("isConnect", "==", true));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
},
  (error) => {
    console.error('Error al escuchar cambios en Firestore:', error);
  });