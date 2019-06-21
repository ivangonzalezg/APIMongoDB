const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/footballdb", { useNewUrlParser: true })
  .then(() => {
    console.log("Database connected");
  });

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api", require("./routes"));

const port = process.env.PORT || 5000;
app.listen(port);
console.log("Server listening: " + port);
console.log("===================================");
