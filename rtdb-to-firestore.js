#!/usr/bin/env node

const admin = require("firebase-admin");
// const firebase = require('firebase');
const fs = require('fs');
const serviceAccount = require("./firebase-credentials.json");


/* ====================================================================
  Local File or RTDB?
==================================================================== */
const isRTDB = true; // Set if local or RTDB.
let users; // Stores all RTDB users.


/* ====================================================================
  Firebase Initialization
==================================================================== */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://iahsp-31959.firebaseio.com"
});
// const db = firebase.firestore();


/* ====================================================================
  Local File
==================================================================== */
if (isRTDB === false) {
  // Location of JSON backup.
  const rawdata = fs.readFileSync('./other/rtdb.json');
  const usersObj = JSON.parse(rawdata);
  users = usersObj.users;
} // if


/* ====================================================================
    Read from Real Time Database
==================================================================== */
// TODO: Read from RTDB.
if (isRTDB === true) {
  admin.database().ref("users").on("value", (snapshot) => {
    users = JSON.parse(snapshot.val());
  }, (errorObject) => {
    // Do something about the error.
    console.log("The read failed: " + errorObject.code);
  })
}

console.log(users);

// TODO: Delete data that was already read.


/* ====================================================================
    Add to Firestore
==================================================================== */
// console.log('please wait while the users are imported...');
// for(var idx in users) {
//   // db.collection('users').add(users[idx]);
//   db.collection("users").doc(idx).set(users[idx]);
// } // for(var idx in users)