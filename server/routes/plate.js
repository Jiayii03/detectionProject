const express = require("express");
const multer = require("multer");
const { detectPlate } = require("../controllers/plate");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // save the image in the uploads folder
    },
    filename: (req, file, cb) => {
        const newFilename = `${Date.now()}-${file.originalname}`;
        req.filename = newFilename;
        cb(null, newFilename);
    },
});

const upload = multer({ storage: storage });

const router = express.Router();
router
  .route("/prediction")
  .post(
    upload.fields([{ name: "file"}, { name: "role" }]),
    detectPlate
  );

module.exports = router;
