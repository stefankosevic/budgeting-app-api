const mongoose = require("mongoose");

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
});

module.exports = mongoose.model("user", UserSchema);
