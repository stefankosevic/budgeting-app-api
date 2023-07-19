const User = require("../models/user");
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

module.exports = {
  dodajUsera,
  loginUser,
};
