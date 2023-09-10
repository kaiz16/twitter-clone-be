const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config.js");

const Reply = sequelize.define(
  "Reply",
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
    tweetId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "tweets",
        key: "id",
      },
      field: "tweet_id",
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
    tableName: "replies",
    timestamps: false,
  }
);

module.exports = Reply;
