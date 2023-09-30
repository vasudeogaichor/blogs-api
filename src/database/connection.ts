import { Sequelize, DataTypes } from 'sequelize';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Access environment variables
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

// Database connection with environment variables
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  dialect: 'postgres'
});

// Checking if the connection is done
sequelize.authenticate()
  .then(() => {
    console.log('Database connected to discover');
  })
  .catch((err) => {
    console.error(err);
  });

const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Connecting to model
// db.users = require('./userModel')(sequelize, DataTypes);

// Exporting the module
export = db;
