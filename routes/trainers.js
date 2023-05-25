const express = require('express');
const router = express.Router();

const trainersController = require('../controllers/trainers');

router.get('/', trainersController.getAll);

router.get('/:id', trainersController.getSingle);

router.post('/', trainersController.createTrainer);

router.put('/:id', trainersController.updateTrainer);

router.delete('/:id', trainersController.deleteTrainer);

module.exports = router;