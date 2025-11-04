import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbcT28xU-4v11FqaifCJeZYhAWXfONyUo",
  authDomain: "apptixs7.firebaseapp.com",
  projectId: "apptixs7",
  storageBucket: "apptixs7.firebasestorage.app",
  messagingSenderId: "442304228739",
  appId: "1:442304228739:web:d0bd40a0b01b3e0516dab6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
