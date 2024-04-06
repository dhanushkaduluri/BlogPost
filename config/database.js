// config/database.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('blogposts', 'root', 'root', {
  dialect: 'mysql', // Change this to your database dialect
  host: 'localhost', // Change this to your database host
});

export default sequelize;
