const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/footballdb', {useNewUrlParser: true})

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/api",require("./routes/status"));

const port = process.env.PORT || 5000;
app.listen(port);
console.log("Server listening: " + port);
console.log("===================================");
