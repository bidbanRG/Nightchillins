import { initializeApp} from "firebase/app";
import { getFirestore} from '@firebase/firestore';
import {getStorage} from 'firebase/storage';


const nightchilins = {
  apiKey: "AIzaSyBzbDZRBeRGFGrxbPq455SRFBlMOdETa3s",
  authDomain: "nightchilins.firebaseapp.com",
  projectId: "nightchilins",
  storageBucket: "nightchilins.appspot.com",
  messagingSenderId: "90114066100",
  appId: "1:90114066100:web:20b8dd7490059d390df9e1",
  measurementId: "G-DF5X0FPG80"
};

// Initialize Firebase
export const app_storage = initializeApp(nightchilins);

//const app = initializeApp(firebaseConfig);
export const storage = getStorage(app_storage);
export const db = getFirestore(app_storage);
