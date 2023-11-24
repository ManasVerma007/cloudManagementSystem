const express = require('express');
const clustersRoutes = require('./routes/clustersRoutes');
const machinesRoutes = require('./routes/machinesRoutes');
const sequelize = require('./database'); // Import the Sequelize instance

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', clustersRoutes);
app.use('/api', machinesRoutes);

const PORT = process.env.PORT || 8000;

require('./models/association');

// Sync models with the database and start the server
sequelize.sync({force: false})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to sync models with the database:', error);
  });

  module.exports = app;
