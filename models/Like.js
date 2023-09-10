const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config.js");

const Like = sequelize.define(
  "Like",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
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
    likedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      field: "liked_by",
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
    tableName: "likes",
    timestamps: false,
  }
);

module.exports = Like;
