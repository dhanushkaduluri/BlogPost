// routes/postRoutes.js

import express from 'express';
import {searchPosts, createPost, getPost, updatePost, deletePost } from '../Controllers/postController.js';
import { authenticateUser, authorizeAdmin } from '../middleware/authMiddleware.js';


const router = express.Router();


// Define routes using controller functions
router.post('/posts',authenticateUser, createPost);
router.get('/posts/get/:id',authenticateUser, getPost);
router.put('/posts/:id',authenticateUser, updatePost);
router.delete('/posts/:id',authenticateUser,authorizeAdmin, deletePost);
router.get('/posts/search',authenticateUser, searchPosts);


export default router;
