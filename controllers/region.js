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

module.exports = { getRegion };