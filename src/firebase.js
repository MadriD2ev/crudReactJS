import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBdWCJoMoCxdh_TsOJ12gZs-i5kjrcB9eE",
    authDomain: "crudreactjs-81d79.firebaseapp.com",
    projectId: "crudreactjs-81d79",
    storageBucket: "crudreactjs-81d79.appspot.com",
    messagingSenderId: "120104382781",
    appId: "1:120104382781:web:336d17a0fc621e29f71554"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export {firebase}