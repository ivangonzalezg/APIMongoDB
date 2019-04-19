const mongoose = require("mongoose");

const teams = new mongoose.Schema({
  name: { type: String, default: "" },
  city: { type: String, default: "" },
  conference: { type: String, default: "" }
});

module.exports = mongoose.model("teams", teams);
