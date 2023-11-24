const express = require('express');
const clustersRoutes = require('./routes/clustersRoutes');
const machinesRoutes = require('./routes/machinesRoutes');
const sequelize = require('./database');  

const app = express();


app.use(express.json());

app.use('/api', clustersRoutes);
app.use('/api', machinesRoutes);

const PORT = process.env.PORT || 8000;

require('./models/association');

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
