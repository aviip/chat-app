import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDi_IgvB79LxbDA-avLooStlrD4u5VilG0",
  authDomain: "chat-app-4722c.firebaseapp.com",
  projectId: "chat-app-4722c",
  storageBucket: "chat-app-4722c.firebasestorage.app",
  messagingSenderId: "839612895935",
  appId: "1:839612895935:web:312a122bd79666e45fec0a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
