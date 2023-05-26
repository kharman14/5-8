const express = require('express');
const router = express.Router();

const trainersController = require('../controllers/trainers');

router.get('/', trainersController.getAll);

router.get('/:username', trainersController.getSingle);

router.post('/', trainersController.createTrainer);

router.put('/:username', trainersController.updateTrainer);

router.delete('/:username', trainersController.deleteTrainer);

module.exports = router;