const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('beehive', {
    id_hive: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    desc_hive: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    date_listed: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'beehive',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_hive" },
        ]
      },
    ]
  });
};
