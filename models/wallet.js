const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const walletDB = new Schema({
  company_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  amount: { type: Number, default: 0 },
  creation_date: { type: Date, default: new Date() },
  updated_time: { type: Date, default: new Date() },
  transaction_time: { type: Date, default: new Date() },
});

module.exports = mongoose.model("walletDB", walletDB);
