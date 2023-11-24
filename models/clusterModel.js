const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Cluster = sequelize.define('Cluster', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cloudRegion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Cluster;