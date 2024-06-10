const express = require('express');
const { upload, uploadAndAnalyzeImage } = require('../controllers/analyzeControllers');

const router = express.Router();

router.post('/upload-analyze', upload.single('image'), uploadAndAnalyzeImage);

module.exports = router;
