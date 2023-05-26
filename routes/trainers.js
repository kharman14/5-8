const express = require('express');
const router = express.Router();

const trainersController = require('../controllers/trainers');
const validation = require('../middleware/validate');

router.get('/', trainersController.getAll);

router.get('/:username', trainersController.getSingle);

router.post('/', validation.saveContact, trainersController.createTrainer); 

router.put('/:username', validation.saveContact, trainersController.updateTrainer); 

router.delete('/:username', trainersController.deleteTrainer);

module.exports = router;