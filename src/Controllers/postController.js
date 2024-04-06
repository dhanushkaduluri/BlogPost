import Post from '../Models/post.js';
import Tag from '../Models/tag.js';
import PostTag from '../Models/postTag.js';
import { Op } from 'sequelize';


export const searchPosts = async (req, res) => {
    try {
        const { tags, startDate, endDate, author } = req.query;

        // Construct the base query to find posts
        const query = {
            where: {}
        };

        // Apply filtering conditions based on received parameters
        if (tags) {
            query.where.hashTags = {
                [Op.like]: `%${tags}%`// Assuming tags is an array of strings
            };
        }
        if (startDate && endDate) {
            query.where.createdAt = {
                [Op.between]: [startDate, endDate]
            };
        }
        if (author) {
            query.where.author = author;
        }

        // Execute the query to find posts
        const posts = await Post.findAll(query);

        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Controller functions for CRUD operations
export const createPost = async (req, res) => {
    try {
        const { title, content, tags } = req.body;

        // Create the post
        const post = await Post.create({ title, content, hashTags:tags });

        // If tags are provided, find or create them and update the PostTag table
        console.log("type of :",typeof(tags));
        if (tags.length > 0) {
            for (const tagName of tags) {
                // Find or create the tag
                let [tag] = await Tag.findOrCreate({ where: { name: tagName } });

                // Create the association in the PostTag table
                const posttag=await PostTag.create({ postId: post.id, tagId: tag.id });
                console.log(posttag);
            }
        }

        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        await post.update({ title, content });
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        await post.destroy();
        res.status(204).json({msg:'post deleted'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
