const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getRegion = async (req, res, next) => {
  const regionName = req.params.regionName;
  region.find({ regionName: themeName })
    .then((data) => {
      if (!data) res.status(404).send({ message: 'Not found region with name: ' + regionName });
      else res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving region with regionName=' + regionName,
        error: err
      });
    });
  
  /*const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('regions')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });*/
};

module.exports = { getRegion };