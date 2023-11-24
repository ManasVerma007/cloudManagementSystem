const express = require('express');
const router = express.Router();
const clustersController = require('../controllers/clustersController');
const {validateClusterCreation} = require('../middlewares/validationMiddleware');


router.post('/clusters', validateClusterCreation,clustersController.createCluster);

router.delete('/clusters/delete/:clusterId', clustersController.deleteCluster);


module.exports = router;
