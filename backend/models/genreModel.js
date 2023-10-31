import { DataTypes } from "sequelize";
import sequelize from "./index.js";

const Genre = sequelize.define(
  "Genre",
  {
    genres: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
  },
  {
    timestamps: false,
    tableName: "genres",
  }
);

export default Genre;