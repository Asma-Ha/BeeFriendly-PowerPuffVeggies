const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('beehive_img', {
    id_hive: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_hive_img: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    hive_img_path: {
      type: DataTypes.STRING(250),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'beehive_img',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_hive_img" },
        ]
      },
      {
        name: "id_hive",
        using: "BTREE",
        fields: [
          { name: "id_hive" },
        ]
      },
    ]
  });
};
