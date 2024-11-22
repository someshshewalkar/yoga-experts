// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain:import.meta.env.VITE_AUTHDOMAIN ,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket:import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID
};

// Initialize Firebase
 export  const app = initializeApp(firebaseConfig);


//alternative code 

//  // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAabNrhJTjqMQxaSuUsDyHCy0rq7vKbZPU",
//   authDomain: "yogaexperts-69e6d.firebaseapp.com",
//   projectId: "yogaexperts-69e6d",
//   storageBucket: "yogaexperts-69e6d.firebasestorage.app",
//   messagingSenderId: "662954079337",
//   appId: "1:662954079337:web:e46cbcb6d34fd976281ef8"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);