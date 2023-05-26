const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.theme = require('./region.js')(mongoose);
db.user = require('./trainer.js')(mongoose);

module.exports = db;