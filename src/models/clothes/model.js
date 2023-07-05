'use strict';

const clothesModel = (sequelize, DataTypes) => sequelize.define('clothes', {
  name: { type: DataTypes.STRING, required: true },
  color: { type: DataTypes.STRING, required: true },
  size: { type: DataTypes.STRING, required: true },
  userId: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = clothesModel;
