const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,

    migrationStorage: 'sequelize',
    migrationStorageTableName: '__migrations',

    seederStorage: 'sequelize',
    seederStorageTableName: '__seeds',
  },
  // add configs for other envs
  test: {
  },
  production: {
  }
}
