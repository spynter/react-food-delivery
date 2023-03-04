import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD92LKik5tFxkYjoKmD2hSduR0o2qiCXiI",
    authDomain: "react-food-delivery-f58d7.firebaseapp.com",
    databaseURL: "https://react-food-delivery-f58d7-default-rtdb.firebaseio.com",
    projectId: "react-food-delivery-f58d7",
    storageBucket: "react-food-delivery-f58d7.appspot.com",
    messagingSenderId: "889814431097",
    appId: "1:889814431097:web:1b4d9ac20c25a4067a6ba8",
  };

  const app = getApps.Length > 0 ? getApp() : initializeApp(firebaseConfig);

  const firestore = getFirestore(app);
  const storage = getStorage(app);

  export { app, firestore, storage };