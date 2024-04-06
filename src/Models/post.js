// models/post.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database.js';

class Post extends Model {}
Post.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    hashTags: {
        type: DataTypes.STRING, // Store the array as a JSON string
        allowNull: true,
        get() {
            const tags = this.getDataValue('hashTags');
            return tags ? JSON.parse(tags) : [];
        },
        set(tags) {
            this.setDataValue('hashTags', JSON.stringify(tags));
        }
    }
}, { sequelize, modelName: 'post' });


export default Post;
