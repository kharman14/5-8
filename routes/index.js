const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/trainers', require('./trainers'))

module.exports = router;