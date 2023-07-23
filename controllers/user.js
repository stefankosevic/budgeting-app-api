const User = require("../models/user");
const Balance = require("../models/balance");
const asyncWrapper = require("../errors/asyncWrapper.js");
const customError = require("../errors/customError");
const axios = require("axios");
const DOMParser = require("dom-parser"); // Import the DOMParser from the dom-parser library

const cheerio = require("cheerio");

const dodajUsera = asyncWrapper(async (req, res, next) => {
  let user = req.body;

  await User.create(user);

  res
    .status(201) //created
    .json({ success: true, msg: "Uspesno dodat user", data: null });
});

const loginUser = asyncWrapper(async (req, res, next) => {
  let user = req.body;

  const foundUser = await User.findOne({
    email: user.email,
    password: user.password,
  });

  if (foundUser) {
    res
      .status(200)
      .json({ success: true, msg: "Uspesno dodat user", data: foundUser });
    return;
  }

  res.status(404).json({ success: false, msg: "Nema usera", data: null });
});

const dodajBalance = asyncWrapper(async (req, res, next) => {
  const balance = req.body;

  const newBalance = new Balance(balance);
  console.log(newBalance);
  newBalance.save();

  await User.findOneAndUpdate(
    { _id: balance.userId },
    { $push: { balances: newBalance } }
  );

  res
    .status(201) //created
    .json({ success: true, msg: "Uspesno updateovan user", data: null });
});

const getBalance = asyncWrapper(async (req, res, next) => {
  const params = req.query;

  const userFound = await User.findOne({ _id: params.id })
    .populate("balances")
    .exec();

  const myBalances = userFound.balances.filter(
    (balance) => balance.type === params.tabName
  );

  res
    .status(200) //created
    .json({ success: true, msg: "Uspesno", data: myBalances });
});

const deleteBalance = asyncWrapper(async (req, res, next) => {
  const bar = req.body;

  await Balance.findOneAndDelete({ _id: bar.id });

  res
    .status(200) //created
    .json({ success: true, msg: "Uspesno" });
});

const getAllBalances = asyncWrapper(async (req, res, next) => {
  const params = req.query;
  const incomes = await Balance.find({ userId: params.userId }).or([
    { type: "Monthly Income" },
    { type: "One Time Income" },
  ]);
  const expenses = await Balance.find({ userId: params.userId }).or([
    { type: "Monthly Expense" },
    { type: "One Time Expense" },
  ]);

  res
    .status(200) //created
    .json({ success: true, msg: "Uspesno", data: { expenses, incomes } });
});

const getRecentBalances = asyncWrapper(async (req, res, next) => {
  const params = req.query;
  const balances = await Balance.find({ userId: params.userId }).sort({
    timestamp: -1,
  });

  res
    .status(200) //created
    .json({ success: true, msg: "Uspesno", data: balances.slice(0, 3) });
});

const scanCode = asyncWrapper(async (req, res, next) => {
  const params = req.query;
  try {
    const response = await axios.get(params.url);
    const htmlData = response.data;

    const $ = cheerio.load(htmlData);
    const totalCashData = $("body")
      .text()
      .match(/За уплату:\s*(.*)/)[1]
      .trim();
    console.log(totalCashData);

    res
      .status(200) //created
      .json({ success: true, msg: "Uspesno", data: totalCashData });
    // const extractedData = res.json(extractedData); // extract the relevant data from the HTML using jQuery-like selectors
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

module.exports = {
  dodajUsera,
  loginUser,
  dodajBalance,
  getBalance,
  deleteBalance,
  getAllBalances,
  getRecentBalances,
  scanCode,
};
