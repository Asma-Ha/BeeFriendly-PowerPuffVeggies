const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('beekeeper', {
    id_beekeeper: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "username"
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    adress: {
      type: DataTypes.STRING(250),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'beekeeper',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_beekeeper" },
        ]
      },
      {
        name: "username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
};
