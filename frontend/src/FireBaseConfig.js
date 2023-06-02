import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyAIfUX_sQQUwqZOibprFjCJuvyUN0QE-jc",
    authDomain: "boomerang-online-examination.firebaseapp.com",
    databaseURL: "http://boomerang-online-examination.firebaseio.com",
    projectId: "boomerang-online-examination",
    storageBucket: "boomerang-online-examination.appspot.com",
    messagingSenderId: "728863812081",
    appId: "1:728863812081:web:3675c2bf5611340228fc50",
    measurementId: "G-1NMYN9SBLR"
  };

initializeApp(firebaseConfig);

const firestore = getFirestore();

export default firestore;
