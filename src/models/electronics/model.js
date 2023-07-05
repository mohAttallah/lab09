'use strict';

const electronics = (sequelize, DataTypes) => sequelize.define('electronics', {
    name: { type: DataTypes.STRING, required: true },
    type: { type: DataTypes.STRING, required: true },
    price: { type: DataTypes.INTEGER, required: true },
    userId: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = electronics;
