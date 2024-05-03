import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  Timestamp,
  serverTimestamp,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
  where,
  query,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAqxSmcYvVtbPP7MOfQUn-3WX0otedKwiA",
  authDomain: "code-fetcher-d1e97.firebaseapp.com",
  projectId: "code-fetcher-d1e97",
  storageBucket: "code-fetcher-d1e97.appspot.com",
  messagingSenderId: "454014533602",
  appId: "1:454014533602:web:571ba6024b240d3ee7c3bb",
  measurementId: "G-ZJFPQFSNF3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {
  auth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  firestore,
  collection,
  addDoc,
  getDocs,
  Timestamp,
  serverTimestamp,
  updateDoc,
  storage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  doc,
  getDoc,
  signOut,
  deleteDoc,
  sendEmailVerification,
  signInWithEmailAndPassword,
  where,
  query,
};
