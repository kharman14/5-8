const express = require('express');
const router = express.Router();

const regionsController = require('../controllers/region');
const validation = require('../middleware/validate');


router.get('/:regionName', regionsController.getRegion);

router.post(':/regionName', validation.saveRegion, regionsController.createRegion);

router.put('/:regionName', validation.saveRegion, regionsController.updateRegion); 

router.delete('/:regionName', regionsController.deleteRegion);


module.exports = router;