import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBzetAjv2zIW-CHl5ESQzMLOQn_5x_Y-Ds",
  authDomain: "tsailabdiary.firebaseapp.com",
  projectId: "tsailabdiary",
  storageBucket: "tsailabdiary.appspot.com",
  messagingSenderId: "767381520485",
  appId: "1:767381520485:web:ddd3c192e803d4c885868c",
  measurementId: "G-BC344P97T1"
}

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()

export { projectFirestore }