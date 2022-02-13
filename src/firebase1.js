
import firebase from 'firebase/app';
import "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDQ9SwCqA3gag0BRm9B9elVWIasXlEp77s",
  authDomain: "facebook-clone-963ae.firebaseapp.com",
  projectId: "facebook-clone-963ae",
  storageBucket: "facebook-clone-963ae.appspot.com",
  messagingSenderId: "742221213235",
  appId: "1:742221213235:web:5b813a8aa30eecd44fbd46",
  measurementId: "G-8XW405X394"
};

firebase.initializeApp(firebaseConfig);

export default  firebase;