import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createClient } from '@supabase/supabase-js'

// const supabase = createClient('https://ijvgmevvtgieeszdhlza.supabase.co',
// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqdmdtZXZ2dGdpZWVzemRobHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4MTE4NDUsImV4cCI6MjA0MDM4Nzg0NX0.K3Syq6a1dNzR3i8kOEkzyTMBbja220mUt26iJegZL5U')

export const environment = {
  production: false,
  local: 'http://localhost:8000/',
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

const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);
