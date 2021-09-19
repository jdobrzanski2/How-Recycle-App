/**
 * web app's Firebase configuration;
 * Specifies which firebase project your application is connected with.
 * This code is adapted from https://console.firebase.google.com/project/comp2800-bby-29-how-recyle/settings/general/web:MWRlNTJlZTQtMGZmMS00ZGIyLWJjNjYtMmYzY2VlY2JmNTI5
 */
var firebaseConfig = {
  apiKey: "",
  authDomain: "comp2800-bby-29-how-recyle.firebaseapp.com",
  projectId: "comp2800-bby-29-how-recyle",
  storageBucket: "comp2800-bby-29-how-recyle.appspot.com",
  messagingSenderId: "58909936981",
  appId: "1:58909936981:web:2c2642fe8ec5917ce3f3dc",
  measurementId: "G-WRB9CY1ERS",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Henceforce, any reference to the database can be made with "db"
const db = firebase.firestore();
