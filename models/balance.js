const mongoose = require("mongoose");

const BalanceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title je obevezan"],
  },
  amount: {
    type: String,
    required: [true, "Amount je obavezan"],
  },
  date: {
    type: String,
    required: [true, "Date je obavezan"],
  },
  userId: {
    type: String,
    required: [true, "userId je obavezan"],
  },
  type: {
    type: String,
    required: [true, "Type je obavezan"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("balance", BalanceSchema);
