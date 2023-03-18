var DataTypes = require("sequelize").DataTypes;
var _beehive = require("./beehive");
var _beehive_img = require("./beehive_img");
var _beekeeper = require("./beekeeper");

function initModels(sequelize) {
  var beehive = _beehive(sequelize, DataTypes);
  var beehive_img = _beehive_img(sequelize, DataTypes);
  var beekeeper = _beekeeper(sequelize, DataTypes);


  return {
    beehive,
    beehive_img,
    beekeeper,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
