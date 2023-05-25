const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/trainers', require('./trainers'));
router.use('/regions', require('./region'));

module.exports = router;