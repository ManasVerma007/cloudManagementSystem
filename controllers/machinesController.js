const Machine = require('../models/machineModel');
const Cluster = require('../models/clusterModel');
const Tag = require('../models/tagsModel');

// Controller function for creating a machine
const createMachine = async (req, res) => {
    try {
      const { name, ipAddress, instanceType, clusterId, tags } = req.body;
      // Check if cluster exists
      const cluster = await Cluster.findByPk(clusterId);
      if (!cluster) {
        return res.status(404).json({ error: 'Cluster not found' });
      }
  
      const newMachine = await Machine.create({ name, ipAddress, instanceType, clusterId });
  
      // Add tags to the machine
      for (let tagName of tags) {
        // Find or create the tag
        const [tag] = await Tag.findOrCreate({ where: { name: tagName } });
        // Associate the tag with the machine
        await newMachine.addTag(tag);
      }
  
      return res.status(201).json(newMachine);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create machine' });
    }
  };

// controller function to get all the machines of a cluster
const getMachines = async (req, res) => {
  try {
    const { clusterId } = req.params;
    const cluster = await Cluster.findByPk(clusterId);
    if (!cluster) {
      return res.status(404).json({ error: 'Cluster not foundaaaaaa' });
    }
    const machines = await cluster.getMachines();
    return res.status(200).json(machines);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to get machines' });
  }
};

// controller function to get a particular machine with tags
// const getMachineWithTag = async (req, res) => {
//   try {
//     const { machineId } = req.params;
//     const machine = await Machine.findByPk(machineId, {
//       include: [{ model: Tag, attributes: ['name'] }],
//     });
//     if (!machine) {
//       return res.status(404).json({ error: 'Machine not found' });
//     }
//     return res.status(200).json(machine);
//   } catch (error) {
//     return res.status(500).json({ error: 'Failed to get machine' });
//   }
// };

// controller function to delete a machine
const deleteMachine = async (req, res) => {
  try {
    const { machineId } = req.params;
    const machine = await Machine.findByPk(machineId);
    if (!machine) {
      return res.status(404).json({ error: 'Machine not found' });
    }
    await machine.destroy();
    return res.status(200).json({ message: 'Machine successfully deleted' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete machine' });
  }
};

// start one or more machine with one or more tags
const startMachine = async (req, res) => {
  try {
    const { tags } = req.query;
    const tagNames = tags.split(',');
    const machines = await Machine.findAll({
      include: [{ model: Tag, where: { name: tagNames } }],
    });
    if (!machines.length) {
      return res.status(404).json({ error: 'Machines not found' });
    }
    // Start all the machines
    for (let machine of machines) {
      machine.status = 'running';
      await machine.save();
    }
    return res.status(200).json(machines);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to start machines' });
  }
};

// stop one or more machine with one or more tags
const stopMachine = async (req, res) => {
  try {
    const { tags } = req.query;
    const tagNames = tags.split(',');
    const machines = await Machine.findAll({
      include: [{ model: Tag, where: { name: tagNames } }],
    });
    if (!machines.length) {
      return res.status(404).json({ error: 'Machines not found' });
    }
    // Stop all the machines
    for (let machine of machines) {
      machine.status = 'stopped';
      await machine.save();
    }
    return res.status(200).json(machines);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to stop machines' });
  }
};

// reboot one or more machine with one or more tags
const rebootMachine = async (req, res) => {
  try {
    const { tags } = req.query;
    const tagNames = tags.split(',');
    const machines = await Machine.findAll({
      include: [{ model: Tag, where: { name: tagNames } }],
    });
    if (!machines.length) {
      return res.status(404).json({ error: 'Machines not found' });
    }
    // Reboot all the machines
    for (let machine of machines) {
      machine.status = 'rebooting';
      await machine.save();
    }
    return res.status(200).json(machines);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to reboot machines' });
  }
};

module.exports = {
  createMachine,
  getMachines,
  deleteMachine,
  startMachine,
  stopMachine,
  rebootMachine,
  // Other machine controller functions here
};