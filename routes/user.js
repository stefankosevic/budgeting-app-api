const express = require("express");
const router = express.Router();

const {
  dodajUsera,
  loginUser,
  dodajBalance,
  getBalance,
  deleteBalance,
  getAllBalances,
  getRecentBalances,
  scanCode,
} = require("../controllers/user");

router.route("/").post(dodajUsera);
router.route("/login").post(loginUser);
router.route("/balance").post(dodajBalance).get(getBalance);
router.route("/balance/delete").post(deleteBalance);
router.route("/balance/all").get(getAllBalances);
router.route("/balance/recent").get(getRecentBalances);
router.route("/scan").get(scanCode);

module.exports = router;
