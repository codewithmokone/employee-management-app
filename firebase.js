const admin = require('firebase-admin');

const serviceAccount = require('./key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://employee-management-app-b4343.appspot.com/images',
  databaseURL: 'https://your-project-id.firebaseio.com',
});

const db = admin.firestore();
const storage = admin.storage();

module.exports = { db, storage };
