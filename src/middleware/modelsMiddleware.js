'use strict';

const dataModules = require('../models');

module.exports = (req, res, next) => {
  console.log("-----------------------------------");
  const modelName = req.params.model;
  console.log(modelName);
  req.model = dataModules[modelName];
  if (dataModules[modelName]) {
    next();
  } else {
    next('Invalid Model');
  }
}