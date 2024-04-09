const express = require("express");
const multer = require("multer");
const { detectPlate, apiTest } = require("../controllers/plate");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // save the image in the uploads folder
    },
    filename: (req, file, cb) => {
        const newFilename = `${Date.now()}-${file.originalname}`; // generate a unique filename for each uploaded image
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

router.get("/", apiTest);

module.exports = router;
