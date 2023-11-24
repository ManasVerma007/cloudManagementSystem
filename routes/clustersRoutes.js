const express = require('express');
const router = express.Router();
const clustersController = require('../controllers/clustersController');
const {validateClusterCreation} = require('../middlewares/validationMiddleware');

// Route for creating a cluster
router.post('/clusters', validateClusterCreation,clustersController.createCluster);
// Define other cluster routes here
// delete a cluster
router.delete('/clusters/delete/:clusterId', clustersController.deleteCluster);


module.exports = router;
