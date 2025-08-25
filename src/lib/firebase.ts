
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA82Z7lmstyUPEeW216ZdortovvkH4TSjI",
  authDomain: "nithyanruthyaaradana-6sb2b.firebaseapp.com",
  projectId: "nithyanruthyaaradana-6sb2b",
  storageBucket: "nithyanruthyaaradana-6sb2b.appspot.com",
  messagingSenderId: "1041425996698",
  appId: "1:1041425996698:web:c6cc9cac82edf0464e3823"
};


// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
