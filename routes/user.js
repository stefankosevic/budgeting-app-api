const express = require("express");
const router = express.Router();

const { dodajUsera, loginUser } = require("../controllers/user");

router.route("/").post(dodajUsera);
router.route("/login").post(loginUser);

module.exports = router;
