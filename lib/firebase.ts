// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZB6tIHLi-7jpARvMmDR-iF7sPrr1wq3I",
  authDomain: "spring-2025-rush.firebaseapp.com",
  databaseURL: "https://spring-2025-rush-default-rtdb.firebaseio.com",
  projectId: "spring-2025-rush",
  storageBucket: "spring-2025-rush.firebasestorage.app",
  messagingSenderId: "1068163791827",
  appId: "1:1068163791827:web:d1611aaed60abb885f8d26",
  measurementId: "G-KE2PXW76EQ"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyB0mkJ86kq8EAdih5YbiPh7hzegbm5GCGA",
//   authDomain: "fall-2024-rush.firebaseapp.com",
//   databaseURL: "https://fall-2024-rush-default-rtdb.firebaseio.com",
//   projectId: "fall-2024-rush",
//   storageBucket: "fall-2024-rush.appspot.com",
//   messagingSenderId: "89834741583",
//   appId: "1:89834741583:web:419ac462f7a22bd908ef3a",
//   measurementId: "G-NG0W0Z2SVJ"
// };


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);

export const initFirebase = () => {
  return app;
};