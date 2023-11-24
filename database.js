const { Sequelize } = require("sequelize");
require("dotenv").config();

// Create a Sequelize instance and establish a connection to MySQL
const sequelize = new Sequelize(
  "cloud_machine",
  "root",
  process.env.dbPassword,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to MySQL database has been established successfully."
    );
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = sequelize;
