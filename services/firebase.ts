
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC78ZnAO5pzgtAq_vGAhvwCQADe6tiz3gg",
  authDomain: "payload-login-data.firebaseapp.com",
  projectId: "payload-login-data",
  storageBucket: "payload-login-data.firebasestorage.app",
  messagingSenderId: "557089218410",
  appId: "1:557089218410:web:eb7ee94dc0b0d3544f0f13",
  measurementId: "G-WMKTF2E295"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
