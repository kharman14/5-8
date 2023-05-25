const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('trainers').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('trainers')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createTrainer = async (req, res) => {
  const trainer = {
    // change to trainer info
    username: req.body.username,
    password: req.body.password,
    displayName: req.body.displayName,
    email: req.body.email,
    info: req.body.info
  };
  const response = await mongodb.getDb().db().collection('trainers').insertOne(trainer);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the trainer.');
  }
};

const updateTrainer = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const trainer = {
    // update to trainer info
    username: req.body.username,
    password: req.body.password,
    displayName: req.body.displayName,
    email: req.body.email,
    info: req.body.info
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('trainers')
    .replaceOne({ _id: userId }, trainer);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the trainer.');
  }
};

const deleteTrainer = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('trainers').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the trainer.');
  }
};

module.exports = { getAll, getSingle, createTrainer, updateTrainer, deleteTrainer };