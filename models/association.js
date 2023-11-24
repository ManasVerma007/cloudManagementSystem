// associations.js
const Machine = require('./machineModel');
const Cluster = require('./clusterModel');
const Tag = require('./tagsModel');

Cluster.hasMany(Machine, { foreignKey: 'clusterId' });
Machine.belongsTo(Cluster, { foreignKey: 'clusterId' });

Machine.belongsToMany(Tag, { through: 'MachineTag' });
Tag.belongsToMany(Machine, { through: 'MachineTag' });