const players = require("../models/players");
const teams = require("../models/teams");

const controllersObject = {
  teams,
  players
};

function capitalizeFirstLetter(text) {
  text = text.split(" ");
  finalText = "";
  for (let index = 0; index < text.length; index++) {
    text[index] =
      text[index].substring(0, 1).toUpperCase() +
      text[index].substring(1).toLowerCase();
    finalText = finalText + text[index] + " ";
  }
  finalText = finalText.substring(0, finalText.length - 1);
  return finalText;
}

function capitalizeAll(text) {
  text = text.toUpperCase();
  return text;
}

module.exports = {
  resourceGet: async (req, res, next) => {
    const resource = req.params.resource;
    const resourceSchema = controllersObject[resource];
    const filter = req.query;
    if (resourceSchema == null) {
      res.status(404).json({
        confirmation: "fail",
        message: "Collection not found",
        status: 404
      });
    } else {
      resourceSchema
        .find(filter)
        .then(data => {
          if (data.length) {
            res.status(200).json({
              confirmation: "success",
              data,
              status: 200
            });
          } else {
            res.status(404).json({
              confirmation: "fail",
              message: "There not result for that value",
              value: filter,
              status: 404
            });
          }
        })
        .catch(error => {
          res.status(500).json({
            confirmation: "fail",
            message: error,
            status: 500
          });
        });
    }
  },
  resourcePost: async (req, res, next) => {
    const resource = req.params.resource;
    const resourceSchema = controllersObject[resource];
    var {
      name,
      city,
      conference,
      firstName,
      lastName,
      position,
      age,
      team
    } = req.body;
    if (resourceSchema == null) {
      res.status(406).json({
        confirmation: "fail",
        message: "First create the collection",
        status: 406
      });
    } else {
      if (resource == "teams") {
        if (name && city && conference) {
          name = capitalizeFirstLetter(name);
          city = capitalizeFirstLetter(city);
          conference = capitalizeAll(conference);
          resourceSchema
            .create({ name, city, conference })
            .then(data => {
              res.status(200).json({
                confirmation: "success",
                data,
                status: 200
              });
            })
            .catch(error => {
              res.status(501).json({
                confirmation: "fail",
                data,
                status: 501
              });
            });
        } else {
          res.status(405).json({
            confirmation: "fail",
            message: "Not enough keys for " + resource + " collection",
            status: 405
          });
        }
      } else if (resource == "players") {
        if (firstName && lastName && position && age && team) {
          firstName = capitalizeFirstLetter(firstName);
          lastName = capitalizeFirstLetter(lastName);
          position = capitalizeFirstLetter(position);
          team = capitalizeFirstLetter(team);
          resourceSchema
            .create({ firstName, lastName, position, age, team })
            .then(data => {
              res.status(200).json({
                confirmation: "success",
                data,
                status: 200
              });
            })
            .catch(error => {
              res.status(501).json({
                confirmation: "fail",
                data,
                status: 501
              });
            });
        } else {
          res.status(405).json({
            confirmation: "fail",
            message: "Not enough keys for " + resource + " collection",
            status: 405
          });
        }
      }
    }
  },
  resourceById: async (req, res, next) => {
    const resource = req.params.resource;
    const id = req.params.id;
    const resourceSchema = controllersObject[resource];
    if (resourceSchema == null) {
      res.status(404).json({
        confirmation: "fail",
        message: "Collection not found",
        status: 404
      });
    } else {
      resourceSchema
        .findById(id)
        .then(data => {
          if (data) {
            res.status(200).json({
              confirmation: "success",
              data,
              status: 200
            });
          } else {
            res.status(404).json({
              confirmation: "fail",
              message: "Id " + id + " not found in " + resource + " collection",
              status: 404
            });
          }
        })
        .catch(error => {
          res.status(500).json({
            confirmation: "fail",
            message: error.message,
            status: 500
          });
        });
    }
  }
};
