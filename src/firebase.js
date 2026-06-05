import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEK_JAi_rQ3aaCDamnFuDzWqy-fxD127A",
  authDomain: "wep-proje.firebaseapp.com",
  projectId: "wep-proje",
  storageBucket: "wep-proje.firebasestorage.app",
  messagingSenderId: "166296957143",
  appId: "1:166296957143:web:2102f9d6eb3d9dd6aec092",
  measurementId: "G-7X7WG0HDRT",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
