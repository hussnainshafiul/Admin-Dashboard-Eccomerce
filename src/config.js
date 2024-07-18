// firebase config key setup

import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/storage' //to access firebase storage

// firebase configuration

const firebaseConfig = {

 
}

if (!firebase.apps.length)
{
    firebase.initializeApp(firebaseConfig);
}

export {firebase};
