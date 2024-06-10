const { storage, firestore, admin } = require('../config/storage');
const { storeData } = require('../config/storeData');
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

const uploadAndAnalyzeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const bucket = storage.bucket();
    const filename = Date.now() + '-' + req.file.originalname;
    const blob = bucket.file(filename);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on('error', (err) => {
      res.status(500).send({ error: err.message });
    });

    blobStream.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      
      const tempFilePath = path.join('/tmp', filename);
      await blob.download({ destination: tempFilePath });

      const model = await tf.loadLayersModel('https://storage.googleapis.com/model-storage-eyetify/model-in-prod/model.json');

      const imageBuffer = fs.readFileSync(tempFilePath);

      let imageTensor = tf.node.decodeImage(imageBuffer, 3); 
      const resizedImage = tf.image.resizeBilinear(imageTensor, [160, 160]); 
      const normalizedImage = resizedImage.div(tf.scalar(255)).expandDims(); 

      const predictions = model.predict(normalizedImage);
      const predictionArray = predictions.dataSync();

      const labels = ['Bulging', 'Cataract', 'Conjunctivitis', 'Crossed', 'Glaucoma', 'Hordeolum', 'Normal', 'Uveitis'];
      const maxPredictionIndex = predictionArray.indexOf(Math.max(...predictionArray));
      const result = labels[maxPredictionIndex];

      let suggestion;
      if (result === 'Normal') {
        suggestion = 'Mata anda sehat!';
      } else {
        suggestion = 'Segera periksa ke dokter!';
      }

      const id = uuidv4();

      const responseData = {
        id,
        result,
        suggestion,
        createdAt: new Date().toISOString(),
      };

      await storeData(id, responseData);

      res.status(200).send({
        status: 'success',
        message: 'Model is predicted successfully',
        data: responseData,
      });

      fs.unlinkSync(tempFilePath);
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error('Error uploading or analyzing image:', error);
    res.status(500).send({ message: 'Error uploading or analyzing image.', error: error.message });
  }
};

module.exports = { upload, uploadAndAnalyzeImage };
