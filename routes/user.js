const express = require("express");
const router = express.Router();

const {
  dodajUsera,
  loginUser,
  dodajBalance,
  getBalance,
} = require("../controllers/user");

router.route("/").post(dodajUsera);
router.route("/login").post(loginUser);
router.route("/balance").post(dodajBalance).get(getBalance);

module.exports = router;
