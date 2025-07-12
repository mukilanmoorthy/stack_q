// ✅ src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAkZmMReNeu6GisiiTegc7ELE-RDIP1f6M",
  authDomain: "stackquae-auth.firebaseapp.com",
  projectId: "stackquae-auth",
  storageBucket: "stackquae-auth.appspot.com",
  messagingSenderId: "657225788592",
  appId: "1:657225788592:web:415419089902610e335f75",
  measurementId: "G-HFJ6YDCRTM"
};

const app = initializeApp(firebaseConfig);

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

const auth = getAuth(app);
const provider = new GoogleAuthProvider(); 

export { db, auth, provider };
