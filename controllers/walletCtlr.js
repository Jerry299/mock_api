const walletDB = require("../models/wallet");
const bcrypt = require("bcrypt");

const validateEmail = (mail) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
};

// Get specific wallet using an email address
exports.getWallet = (req, res) => {
  const _id = req.params.id;

  walletDB
    .findById(_id, "company_name email amount creation_time")
    .exec()
    .then((user) => {
      return res.status(200).json({ status: " success", data: user });
    })
    .catch((err) => {
      return res.status(500).json({ status: "error", data: `Invalid ID` });
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
            .then((user) => {
              return res.status(200).json({
                status: "success",
                data: "Wallet successfully Created",
                user,
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
      company_name: name,
      amount,
    };
    const response = await walletDB.findByIdAndUpdate(id, newData, {
      useFindAndModify: false,
      new: true,
    });

    if (response) {
      return res.status(201).json({
        status: "success",
        data: "User updated successfully",
        //pick out what should return, passwords should not be returned
        user: {
          name: response.company_name,
          email: response.email,
          amount: response.amount,
        },
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", data: `Could not update,Try again. ${error}` });
  }
};

// transfer function
exports.transferFunds = async (req, res) => {
  // we would be using email address as account number/id/address
  // first step is to be sure the sender exists and have the money they want to send
  const { email, amountToBeSent, recipientEmail } = req.body;
  try {
    if (!email || !amountToBeSent || !recipientEmail) {
      return res
        .status(400)
        .json({ status: "error", data: "Fields cannot be blank" });
    }
    const senderInfo = await walletDB.findOne({ email }).exec();
    const recipientInfo = await walletDB
      .findOne({ email: recipientEmail })
      .exec();

    if (senderInfo.email === email) {
      if (recipientInfo.email === recipientEmail) {
        //check if the sender has more than 50 in amount
        if (senderInfo.amount < 50) {
          return res
            .status(403)
            .json({ status: "error", data: "Insufficient funds" });
        }
        //check if the amount to be sent is above available balance
        if (amountToBeSent > senderInfo.amount) {
          return res
            .status(400)
            .json({ status: "error", data: "Insufficient funds, try again" });
        }

        // do some basic math to get balance
        let balanceForSender =
          Number(senderInfo.amount) - Number(amountToBeSent);
        let recieverBalance =
          parseInt(recipientInfo.amount) + parseInt(amountToBeSent);

        //if the user has up to the amount he wants to send, update his remaining amount
        let updatedSenderInfo = await walletDB.findOneAndUpdate(
          { email: email },
          { amount: balanceForSender },
          {
            new: true,
          }
        );

        //update the recipient amount
        let updatedRecipientInfo = await walletDB.findOneAndUpdate(
          { email: recipientEmail },
          { amount: recieverBalance },
          {
            new: true,
          }
        );

        // send back the relevant info
        return res.status(200).json({
          status: "success",
          data: {
            name: updatedSenderInfo.company_name,
            balance: updatedSenderInfo.amount,
            amount_sent: amountToBeSent,
            receiver_name: updatedRecipientInfo.company_name,
            receiver_email: updatedRecipientInfo.email,
          },
        });
      } else {
        // if the flow gets to this block,it means the recipient does not have an account here
        return res.status(404).json({
          status: "error",
          data: "Receiver does not exist,Invalid recipient",
        });
      }
    } else {
      return res.status(400).json({ status: "error", data: "Try again" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", data: `Server error , Try again` });
  }
};
