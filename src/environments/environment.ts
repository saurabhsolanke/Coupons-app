import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyAbDnqKtJc0bhu69ZCMHzjKLNJIXN_tPCs",
    authDomain: "coupons-d3538.firebaseapp.com",
    projectId: "coupons-d3538",
    storageBucket: "coupons-d3538.appspot.com",
    messagingSenderId: "417026396222",
    appId: "1:417026396222:web:2b25745fc0ced43b70c16f",
    measurementId: "G-N3R75LG2EG"
  }
};

// const firebaseConfig = {
//   apiKey: "AIzaSyAbDnqKtJc0bhu69ZCMHzjKLNJIXN_tPCs",
//   authDomain: "coupons-d3538.firebaseapp.com",
//   projectId: "coupons-d3538",
//   storageBucket: "coupons-d3538.appspot.com",
//   messagingSenderId: "417026396222",
//   appId: "1:417026396222:web:2b25745fc0ced43b70c16f",
//   measurementId: "G-N3R75LG2EG"
// };

const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);