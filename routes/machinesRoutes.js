const express = require('express');
const router = express.Router();
const machinesController = require('../controllers/machinesController');
const { validateMachineCreation  } = require('../middlewares/validationMiddleware');


router.post('/machines',validateMachineCreation, machinesController.createMachine);

router.get('/machines/:clusterId/', machinesController.getMachines);

router.delete('/machines/delete/:machineId', machinesController.deleteMachine);


router.put('/machine/start', machinesController.startMachine);

router.put('/machine/stop', machinesController.stopMachine);


router.put('/machine/reboot', machinesController.rebootMachine);

module.exports = router;
