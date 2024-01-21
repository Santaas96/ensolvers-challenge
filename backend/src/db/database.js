import { Sequelize } from "sequelize";
import {
  DB_DEPLOY,
} from "../config.js";

// Instanciamos conexion con db
const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false,
  native: false,
});

export { sequelize };
