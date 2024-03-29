// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,onAuthStateChanged} from 'firebase/auth'

import {getFirestore, doc ,getDoc ,setDoc, collection, writeBatch , query, getDocs, DocumentSnapshot} from 'firebase/firestore'

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
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt:'select_account'
})
 



export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const bathc = writeBatch(db);

    objectsToAdd.forEach((object)=>{
      const docRef = doc(collectionRef, object.title.toLowerCase());
      bathc.set(docRef, object)
    })

    await bathc.commit();
    console.log('done');
}

export const getCategoriesAndDocuments = async ()=>{
  const collectionRef = collection(db, 'categories') ; 
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
  


  // return categoryMap;
 }


export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) =>{
  if(!userAuth) return ;
    const userDocRef = doc(db, 'users', userAuth.uid );
    console.log(userDocRef);


    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
      const{displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation
        })
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password)=>{
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
};

export const signInAuthUserWithEmailAndPassword = async (email, password)=>{
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password)
};

export const signOutUser = async ()=> await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);