const express = require("express");
const router = express.Router();

const { postLogin, postLogout } = require("../controllers/login");

router.route("/").post(postLogin);
router.route("/destroy").post(postLogout);

module.exports = router;
