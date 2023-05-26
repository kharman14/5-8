const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const passwordUtil = require('../util/passwordComplexityCheck');

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('trainers').find();
  result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
  })
  .catch((err) => {
    res.status(400).json({ message: err });
  });
};

const getSingle = async (req, res, next) => {
  const username = new ObjectId(req.params.username);
  const result = await mongodb
    .getDb()
    .db()
    .collection('trainers')
    .find({ _id: username });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  })
  .catch((err) => {
    res.status(400).json({ message: err });
  });
};

const createTrainer = async (req, res) => {
  if (!ObjectId.isValid(req.params.username)) {
    res.status(400).json('Must use a valid username to update a trainer.');
  }
  const trainer = {
    username: req.body.username,
    password: req.body.password,
    displayName: req.body.displayName,
    email: req.body.email,
    region: req.body.region,
    pokemon: req.body.pokemon,
    type: req.body.type
  };
  const response = await mongodb.getDb().db().collection('trainers').insertOne(trainer);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the trainer.');
  }
};

const updateTrainer = async (req, res) => {
  if (!ObjectId.isValid(req.params.username)) {
    res.status(400).json('Must use a valid username to update a trainer.');
  }
  const username = new ObjectId(req.params.username);
  const trainer = {
    username: req.body.username,
    password: req.body.password,
    displayName: req.body.displayName,
    email: req.body.email,
    region: req.body.region,
    pokemon: req.body.pokemon,
    type: req.body.type
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('trainers')
    .replaceOne({ username: username }, trainer);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the trainer.');
  }
};

const deleteTrainer = async (req, res) => {
  if (!ObjectId.isValid(req.params.username)) {
    res.status(400).json('Must use a valid username to delete a trainer.');
  }
  const userId = new ObjectId(req.params.username);
  const response = await mongodb.getDb().db().collection('trainers').deleteOne({ username: userId}, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the trainer.');
  }
};

module.exports = { getAll, getSingle, createTrainer, updateTrainer, deleteTrainer };