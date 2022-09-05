const express = require("express");
const app = express();
const mongoose = require("mongoose");
const walletRoute = require("./routes/walletRoute");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

// the db credentials are visible here
mongoose
  .connect("mongodb://localhost:27017/wallet", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Mongo Db is connected to shhs .......");
  })
  .catch((err) => {
    console.log(err);
  });

//use routes
app.use("/", walletRoute);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

module.exports = app;
