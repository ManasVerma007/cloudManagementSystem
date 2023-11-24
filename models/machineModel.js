const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Tag = require('./tagsModel');

const Machine = sequelize.define('Machine', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instanceType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'stopped',
  },
  clusterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

});

 


module.exports = Machine;
