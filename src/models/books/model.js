'use strict';

const booksModel = (sequelize, DataTypes) => sequelize.define('books', {
    title: { type: DataTypes.STRING, required: true },
    author: { type: DataTypes.STRING, required: true },
    type: { type: DataTypes.STRING, required: true }
});

module.exports = booksModel;
