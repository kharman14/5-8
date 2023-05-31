const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const passwordUtil = require('../util/passwordComplexityCheck');

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection('trainers').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    })
  } catch(err){
    res.status(400).json({ message: err });
  };
};

const getSingle = async (req, res, next) => {
  try {
    const username = req.params.username;
  const result = await mongodb
    .getDb()
    .db()
    .collection('trainers')
    .find({ username: username });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  })
} catch(err) {
    res.status(400).json({ message: err });
  };
};

const createTrainer = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
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
  } catch(err) {
    res.status(400).json({ message: err });
  }
};

const updateTrainer = async (req, res) => {
  try {
    const username = req.params.username;
      if (!username) {
        res.status(400).send({ message: 'Invalid Username Supplied' });
        return;
      }
      const password = req.body.password;
      const passwordCheck = passwordUtil.passwordPass(password);
      if (passwordCheck.error) {
        res.status(400).send({ message: passwordCheck.error });
        return;
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
  } catch(err) {
    res.status(400).json({ message: err });
  }
};

const deleteTrainer = async (req, res) => {
  try {
    const username = req.params.username;
    if (!username) {
      res.status(400).send({ message: 'Invalid Username Supplied' });
      return;
    }
    const response = await mongodb.getDb().db().collection('trainers').deleteOne({ username: username}, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the trainer.');
    }
  } catch(err) {
    res.status(400).json({ message: err });
  }
};

module.exports = { getAll, getSingle, createTrainer, updateTrainer, deleteTrainer };