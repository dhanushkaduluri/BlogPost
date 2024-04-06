// models/postTag.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database.js';
import Post from './post.js';
import Tag from './tag.js';

class PostTag extends Model {}
PostTag.init({
    // Additional attributes can be added here if needed
}, { sequelize, modelName: 'postTag'});

// Define associations here to avoid circular dependency
Post.belongsToMany(Tag, { through: PostTag });
Tag.belongsToMany(Post, { through: PostTag });

export default PostTag;
