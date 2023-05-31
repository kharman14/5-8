const express = require('express');
const router = express.Router();

const regionsController = require('../controllers/region');

router.get('/:regionName', regionsController.getRegion);

module.exports = router;