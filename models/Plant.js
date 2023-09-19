const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Plant extends Model {}

Plant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    plant_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    soilType: {
      type: DataTypes.STRING, // Corresponds to the "soilType" field in plantData.json
    },
    wateringInches: {
      type: DataTypes.FLOAT, // Corresponds to the "wateringInches" field in plantData.json
    },
    toxicToPets: {
      type: DataTypes.BOOLEAN, // Corresponds to the "toxicToPets" field in plantData.json
    },
    sunlight: {
      type: DataTypes.STRING, // Corresponds to the "sunlight" field in plantData.json
    },
    wateringFrequency: {
      type: DataTypes.STRING, // Corresponds to the "wateringFrequency" field in plantData.json
    },
    // Foreign key to User table.
    // Will be used to either represent a user's favorite plant,
    // or a new plant page the user created, or for some other method/purpose.
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'plant',
  }
);

module.exports = Plant;
