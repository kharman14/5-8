const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getRegion = async (req, res, next) => {
  const regionName = req.params.region;
  const result = await mongodb
    .getDb()
    .db()
    .collection('regions')
    .find({ regionName: regionName });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  })
  .catch((err) => {
    res.status(400).json({ message: err });
  });
};

module.exports = { getRegion };