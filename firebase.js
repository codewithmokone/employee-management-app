const admin = require('firebase-admin');

const serviceAccount = require('./key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "employee-management-app-b4343.appspot.com",
  databaseURL: 'https://employee-management-app-b4343.firebaseio.com',
});

const db = admin.firestore();
const storage = admin.storage();

module.exports = { db, storage };
