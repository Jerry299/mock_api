const express = require("express");
const app = express();
const mongoose = require("mongoose");
const walletRoute = require("./routes/walletRoute");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

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
    console.log("Mongo Db is connected .......");
  })
  .catch((err) => {
    console.log(err);
  });

// swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mock Wallet API",
      version: "1.0.0",
      description: "A mock wallet API",
    },
    servers: [
      {
        url: "",
      },
    ],
  },
  apis: ["routes/*.js"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

//use routes
app.use("/", walletRoute);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

module.exports = app;
