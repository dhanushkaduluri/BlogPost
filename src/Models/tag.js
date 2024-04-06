// models/tag.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database.js';

class Tag extends Model {}
Tag.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize, modelName: 'tag' });

// Define the many-to-many association with Post model
// Import Post within the function scope
import Post from './post.js';
Tag.belongsToMany(Post, { through: 'PostTag' });

export default Tag;
