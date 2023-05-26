const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try {
    Trainer.find({})
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving trainers.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
  
  /*const result = await mongodb.getDb().db().collection('trainers').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });*/
};

const getSingle = async (req, res, next) => {
  try {
    const username = req.params.username;
    User.find({ username: username })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving trainer.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
  
  /*const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('trainers')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });*/
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
    const user = new User(req.body);
    user
      .save()
      .then((data) => {
        console.log(data);
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the trainer.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }

  /*const trainer = {
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
  }*/
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
    Trainer.findOne({ username: username }, function (err, trainer) {
      trainer.username = req.params.username;
      trainer.password = req.body.password;
      trainer.displayName = req.body.displayName;
      trainer.email = req.body.email;
      trainer.region = req.body.region;
      trainer.pokemon = req.body.pokemon;
      trainer.type = req.body.type;
      user.save(function (err) {
        if (err) {
          res.status(500).json(err || 'Some error occurred while updating the trainer.');
        } else {
          res.status(204).send();
        }
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }

  /*const userId = new ObjectId(req.params.id);
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
    .replaceOne({ _id: userId }, trainer);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the trainer.');
  }*/
};

const deleteTrainer = async (req, res) => {
  try {
    const username = req.params.username;
    if (!username) {
      res.status(400).send({ message: 'Invalid Username Supplied' });
      return;
    }
    Trainer.deleteOne({ username: username }, function (err, result) {
      if (err) {
        res.status(500).json(err || 'Some error occurred while deleting the trainer.');
      } else {
        res.status(204).send(result);
      }
    });
  } catch (err) {
    res.status(500).json(err || 'Some error occurred while deleting the trainer.');
  }
  
  /*const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('trainers').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the trainer.');
  }*/
};

module.exports = { getAll, getSingle, createTrainer, updateTrainer, deleteTrainer };