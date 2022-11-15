// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider} from 'firebase/auth'

import {getFirestore, doc ,getDoc ,setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcX-hWHpig8LJ12RKXnLMAJe3ZqJOzNIg",
  authDomain: "crwn-db-63769.firebaseapp.com",
  projectId: "crwn-db-63769",
  storageBucket: "crwn-db-63769.appspot.com",
  messagingSenderId: "60064550440",
  appId: "1:60064550440:web:a615d6577b0b394867af1d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt:'select_account'
})
 

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) =>{
    const userDocRef = doc(db, 'users', userAuth.uid );


    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

}