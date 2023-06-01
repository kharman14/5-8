const validator = require('../helpers/validate');

const saveContact = (req, res, next) => {
  const validationRule = {
    username: 'required|string',
    password: 'required|string',
    displayName: 'required|string',
    email: 'required|email',
    region: 'string',
    pokemon: 'required|string',
    type: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveRegion = (req, res, next) => {
  const validationRule = {
    regionName: 'required|string',
    description: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveContact, saveRegion
};