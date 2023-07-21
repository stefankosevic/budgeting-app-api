const User = require("../models/user");
const Balance = require("../models/balance");
const asyncWrapper = require("../errors/asyncWrapper.js");
const customError = require("../errors/customError");

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

module.exports = {
  dodajUsera,
  loginUser,
  dodajBalance,
  getBalance,
};
