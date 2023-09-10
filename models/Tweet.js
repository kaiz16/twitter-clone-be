const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config.js");

const Tweet = sequelize.define(
  "Tweet",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "content",
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      field: "created_by",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "updated_at",
    },
  },
  {
    tableName: "tweets",
    timestamps: false,
  }
);

module.exports = Tweet;
