const Machine = require('../models/machineModel');
const Cluster = require('../models/clusterModel');
const Tag = require('../models/tagsModel');

const createMachine = async (req, res) => {
    try {
      const { name, ipAddress, instanceType, clusterId, tags } = req.body;
      const cluster = await Cluster.findByPk(clusterId);
      if (!cluster) {
        return res.status(404).json({ error: 'Cluster not found' });
      }
  
      const newMachine = await Machine.create({ name, ipAddress, instanceType, clusterId });
  
      for (let tagName of tags) {

        const [tag] = await Tag.findOrCreate({ where: { name: tagName } });

        await newMachine.addTag(tag);
      }
  
      return res.status(201).json(newMachine);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create machine' });
    }
  };


const getMachines = async (req, res) => {
  try {
    const { clusterId } = req.params;
    const cluster = await Cluster.findByPk(clusterId);
    if (!cluster) {
      return res.status(404).json({ error: 'Cluster not found' });
    }
    const machines = await cluster.getMachines();
    return res.status(200).json(machines);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to get machines' });
  }
};

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

    for (let machine of machines) {
      machine.status = 'running';
      await machine.save();
    }
    return res.status(200).json(machines);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to start machines' });
  }
};

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
    for (let machine of machines) {
      machine.status = 'stopped';
      await machine.save();
    }
    return res.status(200).json(machines);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to stop machines' });
  }
};

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
};