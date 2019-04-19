const players = require("../models/players");
const teams = require("../models/teams");

module.exports = {
  resource: async (req, res, next) => {
    teams
      .find(null)
      .then(data => {
        res.status(200).json({
          confirmation: "success",
          data
        });
      })
      .catch(error => {
        res.status(404).json({
          confirmation: "fail",
          message: error
        });
      });
  }
};
