'use strict';
require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');
const clothesModel = require('./clothes/model.js');
const foodModel = require('./food/model.js');
const userModel = require('./user/model.js');
const booksModel = require("./books/model");
const electronicsModel = require('./electronics/model');

const Collection = require('./data-collection.js');


const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URI;
const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);


const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);
const users = userModel(sequelize, DataTypes);
const books = booksModel(sequelize, DataTypes);
const electronics = electronicsModel(sequelize, DataTypes);



//relationship


users.hasMany(books, { foreignKey: 'userId', sourceKey: 'id' })
books.belongsTo(users, { foreignKey: 'userId', targetKey: 'id' })

users.hasMany(clothes, { foreignKey: 'userId', sourceKey: 'id' })
clothes.belongsTo(users, { foreignKey: 'userId', targetKey: 'id' })

users.hasMany(food, { foreignKey: 'userId', sourceKey: 'id' })
food.belongsTo(users, { foreignKey: 'userId', targetKey: 'id' })

users.hasMany(electronics, { foreignKey: 'userId', sourceKey: 'id' })
electronics.belongsTo(users, { foreignKey: 'userId', targetKey: 'id' })

module.exports = {
  db: sequelize,
  food: new Collection(food),
  clothes: new Collection(clothes),
  users: new Collection(users),
  userModel: userModel(sequelize, DataTypes),
  books: new Collection(books),
  electronics: new Collection(electronics),
};
