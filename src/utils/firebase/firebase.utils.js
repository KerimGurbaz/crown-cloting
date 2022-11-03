import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'

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

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt :'select_account'
  })

export const auth = getAuth();
export const signInGooglePopup = () => signInWithPopup(auth,provider)