

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
export const getFirebaseApp = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC9OtF7OuO9k0SP7L3Tqwas06Yei6JeTmc",
    authDomain: "cop-fiverr.firebaseapp.com",
    projectId: "cop-fiverr",
    storageBucket: "cop-fiverr.appspot.com",
    messagingSenderId: "565132636797",
    appId: "1:565132636797:web:f6360b108098d59eceb714"

    
  };

  // Initialize Firebase
  return initializeApp(firebaseConfig);
}