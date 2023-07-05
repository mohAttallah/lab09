'use strict';

const express = require('express');
const dataModules = require('../models');
const modelsMiddleware = require('../middleware/modelsMiddleware');
const { users } = require('../models/index');
const { books } = require('../models/index');

const router = express.Router();

router.param('model', modelsMiddleware);


router.get('/:model', handleGetAll);
router.get('/:model/:id', handleGetOne);
router.get('/:model/userOrder/:id', handleUserOrde);
router.post('/:model', handleCreate);
router.put('/:model/:id', handleUpdate);
router.delete('/:model/:id', handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id)
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj)
  res.status(203).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(204).json(deletedRecord);
}
async function handleUserOrde(req, res) {
  const model = req.params.model;
  console.log("-------------------------------");
  console.log(model.model);
  const id = req.params.id;
  const user = await users.readUserOrder(id, model);
  res.status(200).json(user)
}

module.exports = router;
