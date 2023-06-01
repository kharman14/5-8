const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getRegion = async (req, res, next) => {
  try {
    const regionName = req.params.regionName;
    const result = await mongodb
      .getDb()
      .db()
      .collection('regions')
      .find({ regionName: regionName });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    })
  } catch(err) {
    res.status(400).json({ message: err });
  };
};

const createRegion = async (req, res) => {
  try {
    const regionName = req.body.regionName;
    if (!regionName) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
    if (!req.oidc.isAuthenticated()) {
      res.status(400).send({ message: 'Login to create region' });
      return;
    }
    const region = {
      regionName: req.body.regionName,
      description: req.body.description
    };
    const response = await mongodb.getDb().db().collection('regions').insertOne(region);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the region.');
    }
  } catch(err) {
    res.status(400).json({ message: err });
  }
};

const updateRegion = async (req, res) => {
  try {
    const regionName = req.params.regionName;
      if (!regionName) {
        res.status(400).send({ message: 'Invalid regionName Supplied' });
        return;
      }
      if (!req.oidc.isAuthenticated()) {
        res.status(400).send({ message: 'Login to update region' });
        return;
      }
    const region = {
      regionName: req.body.regionName,
      description: req.body.description
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('regions')
      .replaceOne({ regionName: regionName }, region);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the region.');
    }
  } catch(err) {
    res.status(400).json({ message: err });
  }
};

const deleteRegion = async (req, res) => {
  try {
    const regionName = req.params.regionName;
    if (!regionName) {
      res.status(400).send({ message: 'Invalid RegionName Supplied' });
      return;
    }
    if (!req.oidc.isAuthenticated()) {
      res.status(400).send({ message: 'Login to delete region' });
      return;
    }
    const response = await mongodb.getDb().db().collection('regions').deleteOne({ regionName: regionName}, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the region.');
    }
  } catch(err) {
    res.status(400).json({ message: err });
  }
};

module.exports = { getRegion, createRegion, updateRegion, deleteRegion };