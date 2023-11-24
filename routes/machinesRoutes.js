const express = require('express');
const router = express.Router();
const machinesController = require('../controllers/machinesController');
const { validateMachineCreation  } = require('../middlewares/validationMiddleware');

// Route for creating a machine
router.post('/machines',validateMachineCreation, machinesController.createMachine);
// Define other machine routes here

// get all machines of a single cluster
router.get('/machines/:clusterId/', machinesController.getMachines);
// get a particular machine whole data with tags
// router.get('/machines/tag/:machineId/', machinesController.getMachineWithTag);

// delete a machine
router.delete('/machines/delete/:machineId', machinesController.deleteMachine);

// start one or more machine with one or more tags
router.put('/machine/start', machinesController.startMachine);
// stop one or more machine with one or more tags
router.put('/machine/stop', machinesController.stopMachine);

//reboot one or more machine with one or more tags
router.put('/machine/reboot', machinesController.rebootMachine);

module.exports = router;
