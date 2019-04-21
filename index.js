#!/usr/bin/env node

const fs = require('fs');
const firebase = require('firebase');
const serviceAccount = require("./firebase-credentials.json");

// Get this info from other Firebase projects you have RTDB established.
firebase.initializeApp({
  projectId: serviceAccount.project_id,
  apiKey: serviceAccount.private_key_id
});
const db = firebase.firestore();

// Location of JSON backup.
const rawdata = fs.readFileSync('./other/rtdb.json');
const usersObj = JSON.parse(rawdata);
const users = usersObj.users;

console.log('please wait while the users are imported...');
for(var idx in users){
  // db.collection('users').add(users[idx]);
  db.collection("users").doc(idx).set(users[idx]);

  // take 
}