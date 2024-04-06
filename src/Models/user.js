// models/user.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database.js';

class User extends Model {}
User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user'
    }
}, { sequelize, modelName: 'user' });

export default User;
