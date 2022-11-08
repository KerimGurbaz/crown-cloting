import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'

import {
getFirestore,
doc,
getDoc,
setDoc

} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyACqFefkYdmRnWhNfkc_PSC3HQN_RbknYQ",
    authDomain: "crwn-clothing-db-62f4e.firebaseapp.com",
    projectId: "crwn-clothing-db-62f4e",
    storageBucket: "crwn-clothing-db-62f4e.appspot.com",
    messagingSenderId: "623281830541",
    appId: "1:623281830541:web:7030dd8fc1f777ed0ac0c4"
  };
  
  // Initialize Firebase
  const firebassApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt :'select_account'
  })

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithGooglePopup(auth,googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth =async (userAuth)=>{
  const userDocRef = doc(db, 'users', userAuth.uid )

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth
    const createAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt
      
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }
  return userDocRef;
}