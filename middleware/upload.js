// middleware/upload.js
const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

// File filter (optional)
const fileFilter = (req, file, cb) => {
  // Accept any file type; restrict as needed
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
