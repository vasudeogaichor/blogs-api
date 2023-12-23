import { Sequelize, DataTypes } from "sequelize";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create connection string
const connectionUrl = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// Database connection with environment variables
const sequelize = new Sequelize(connectionUrl, {
  dialect: "postgres",
  define: {
    freezeTableName: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  },
});

// Checking if the connection is done
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected to discover");
  })
  .catch((err) => {
    console.error(err);
  });

const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Connecting to model
db.blogs = require("./models/blogs")(sequelize, DataTypes);
db.users = require("./models/users")(sequelize, DataTypes);

// Exporting the module
export = db;
