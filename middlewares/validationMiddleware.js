const validateClusterCreation = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  next();
};

const validateMachineCreation = (req, res, next) => {
  const { name, ipAddress, instanceType, clusterId, tags } = req.body;

  if (!name || !ipAddress || !instanceType || !clusterId || !tags) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  next();
};



module.exports = { validateClusterCreation, validateMachineCreation };