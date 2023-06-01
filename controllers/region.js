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

const updateRegion = async (req, res) => {
  try {
    const regionName = req.params.regionName;
      if (!regionName) {
        res.status(400).send({ message: 'Invalid regionName Supplied' });
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

module.exports = { getRegion, updateRegion, deleteRegion };