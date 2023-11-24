const Cluster = require('../models/clusterModel');

const createCluster = async (req, res) => {
  try {
    const { name, cloudRegion } = req.body;
    const newCluster = await Cluster.create({ name, cloudRegion });
    return res.status(201).json(newCluster);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create cluster' });
  }
};

const deleteCluster = async (req, res) => {
  try {
    const { clusterId } = req.params;
    const cluster = await Cluster.findByPk(clusterId);
    if (!cluster) {
      return res.status(404).json({ error: 'Cluster not found' });
    }

    const machines = await cluster.getMachines();
    for (let machine of machines) {
      await machine.destroy();
    }

    await cluster.destroy();

    return res.status(200).json({ message: 'Cluster deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete cluster' });
  }
};

module.exports = {
  createCluster,
  deleteCluster,
};