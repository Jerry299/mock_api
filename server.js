const express = require("express");
const app = express();
const personRoute = require("./routes/personRoute");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

//use routes
app.use("/", personRoute);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

module.exports = app;
