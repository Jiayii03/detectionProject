const express = require("express");
const { detectPlate, apiTest } = require("../controllers/plate");

const router = express.Router();

router.post('/detect', detectPlate);

router.get("/", apiTest);

module.exports = router;
