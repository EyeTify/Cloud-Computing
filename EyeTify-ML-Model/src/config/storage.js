const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');
const serviceAccount = require('../key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'datastore_image' 
  });
  
  const storage = admin.storage();

  const firestore = admin.firestore();
  
  module.exports = { storage, firestore, admin };

