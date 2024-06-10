const { firestore } = require('./storage');

const storeData = async (id, data) => {
  try {
    const docRef = firestore.collection('predictions').doc(id);
    await docRef.set(data);
    console.log(`Document written with ID: ${id}`);
  } catch (error) {
    console.error('Error adding document: ', error);
    throw new Error('Error adding document');
  }
};

module.exports = { storeData };
