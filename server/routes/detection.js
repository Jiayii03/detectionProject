const express = require("express");
const { detectPlate, detectPattern, apiTest } = require("../controllers/detection");

const router = express.Router();

router.post('/detectPlate', detectPlate);

router.post('/detectPattern', detectPattern);

router.get("/", apiTest);

module.exports = router;
