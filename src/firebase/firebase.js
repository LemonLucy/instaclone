// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDsGTqF-0zTxbqBT5fekkP2vXnk2JRe1fQ",
  authDomain: "insta-clone-d2c6d.firebaseapp.com",
  projectId: "insta-clone-d2c6d",
  storageBucket: "insta-clone-d2c6d.appspot.com",
  messagingSenderId: "655426804199",
  appId: "1:655426804199:web:24084fbb11b07f644f8542",
  measurementId: "G-VGTLY2QYVT"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const firestore=getFirestore(app);
const storage=getStorage(app);

export {app,auth,firestore,storage};