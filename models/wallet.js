const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const walletDB = new Schema({
  company_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  amount: { type: Number, default: 0 },
  creation_date: { type: Date, default: new Date() },
  update_time: { type: String },
});

module.exports = mongoose.model("walletDB", walletDB);
