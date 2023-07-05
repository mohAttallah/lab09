'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const clothesModel = require('./clothes/model.js');
const foodModel = require('./food/model.js');
const userModel = require('./user/model.js');
const booksModel = require("./books/model");
const electronicsModel = require('./electronics/model');

const Collection = require('./data-collection.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

const sequelize = new Sequelize(DATABASE_URL);

const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);
const users = userModel(sequelize, DataTypes);
const books = booksModel(sequelize, DataTypes);
const electronics = electronicsModel(sequelize, DataTypes);


module.exports = {
  db: sequelize,
  food: new Collection(food),
  clothes: new Collection(clothes),
  users: new Collection(users),
  userModel: userModel(sequelize, DataTypes),

  books: new Collection(books),
  electronics: new Collection(electronics),
};
