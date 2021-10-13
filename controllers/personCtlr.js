const person = require("../models/person");

// const person = [
//   {
//     id: 1,
//     name: "Sean Grey",
//     pass: "myPass",
//   },
// ];

const getPerson = (req, res) => {
  const { name, pass } = person[0];

  // return a 404 for missing fields
  if (!req.body.name) {
    return res
      .status(404)
      .json({ status: "error", data: "name cannot be blank" });
  }
  if (!req.body.pass) {
    return res
      .status(404)
      .json({ status: "error", data: "password cannot be blank" });
  }

  // return a 404 for no matches
  if (req.body.name !== name || req.body.pass !== pass) {
    return res
      .status(404)
      .json({ status: "error", data: "User does not exist" });
  }

  //return a 200 for successful requests
  if (req.body.name.trim() === name && req.body.pass === pass) {
    return res.status(200).json({
      status: "success",
      data: {
        user: { username: req.body.name, myPass: req.body.pass },
      },
    });
  }
};

module.exports = getPerson;
