const walletDB = require("../models/wallet");
const bcrypt = require("bcrypt");

const validateEmail = (mail) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
};

exports.test = (req, res) => {
  console.log("test");
  return res.json({ mesg: "test working" });
};
// Get specific wallet using an email address
exports.getWallet = (req, res) => {
  const id = req.id;

  walletDB
    .findById(id, "company_name email amount")
    .exec()
    .then((user) => {
      console.log(user);
      return res.status(200).json({ status: " success", data: user });
    })
    .catch((err) => {
      console.log(err);
    });
};

//create a wallet
exports.createWallet = (req, res) => {
  //get request body
  const { name, email, password } = req.body;

  //do a basic validation
  if (!name && name.length < 1) {
    return res
      .status(400)
      .json({ status: "error", data: "name cannot be blank" });
  }
  if (!email && email.length < 1) {
    return res
      .status(400)
      .json({ status: "error", data: "email cannot be blank" });
  }
  if (!validateEmail(email)) {
    return res
      .status(400)
      .json({ status: "error", data: "incorrect email format" });
  }
  if (!password && password.length < 2) {
    return res
      .status(400)
      .json({ status: "error", data: "password cannot be blank" });
  }

  // check if user already exists
  walletDB
    .findOne({ email })

    .then((user) => {
      if (user) {
        return res
          .status(400)
          .json({ status: "error", data: "sorry, user already exists." });
      }

      //if user does not exist, hash password and create one then
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          // create a new instance of the model
          const newUser = new walletDB({
            company_name: name,
            email,
            password: hash,
          });
          newUser
            .save()
            .then(() => {
              return res
                .status(200)
                .json({
                  status: "success",
                  data: "Wallet successfully Created",
                });
            })
            .catch((err) => {
              return res
                .status(500)
                .json({ status: "error", error: `error ${err}` });
            });
        })
        .catch((err) => {
          return res
            .status(500)
            .json({ status: "error", error: `Sorry try again, ${err}` });
        });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ status: "failed", error: "Could not create, try again" });
    });
};

//update a wallet details, in this design emails can not be updated as we liken it to an account number/id/address
exports.updateWallet = async (req, res) => {
  const id = req.params.id;
  const { name, amount } = req.body;

  try {
    //do simple validation and make sure all fields are present
    if (!name || name.length < 2) {
      return res
        .status(400)
        .json({ status: "error", data: "name cannot be blank" });
    }
    // I am updating the amount because I want to test the transfer feature
    // We would not update the password as there should be a reset password function for that
    if (!amount || amount < 50) {
      return res.status(400).json({
        status: "error",
        data: "Amount should be greater than 50",
      });
    }
    // instance of the to be updated data
    const newData = {
      name,
      amount,
      updated_time,
    };
    const response = await User.findByIdAndUpdate(id, newData, {
      useFindAndModify: false,
      new: true,
    });

    return res.status(201).json({
      status: "success",
      data: "User updated successfully",
      user: response,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", data: "Could not update,Try again." });
  }
};

// transfer function
exports.transferFunds = async (req, res) => {
  // we would be using email address as account number/id/address
  // first step is to be sure the sender exists and have the money they want to send
  const { name, email, amountToBeSent } = req.body;
};
