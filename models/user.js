const mongoose = require("mongoose");
const Balance = require("./balance");

const UserSchema = new mongoose.Schema({
  ime: {
    type: String,
    required: [true, "Ime je obavezno"],
  },
  email: {
    type: String,
    required: [true, "Email je obavezan"],
  },
  password: {
    type: String,
    required: [true, "Sifra je obavezna"],
  },
  balances: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "balance",
    },
  ],
});

module.exports = mongoose.model("user", UserSchema);
