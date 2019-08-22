const express = require('express');
const multer = require('multer');
const fs = require('fs');

const uploadRouter = express.Router();
const upload = multer({
  dest: 'public/',
});

uploadRouter.post('/image', upload.single('image'), (req, res) => {
  fs.rename(`public/${req.file.filename}`, `public/${req.file.originalname}`, (err) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      })
    } else {
      res.status(201).json({
        success: true,
        data: {
          imageUrl: `http://localhost:3001/${req.file.originalname}`,
        },
      });
    }
  });
});

module.exports = uploadRouter;