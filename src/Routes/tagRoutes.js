// routes/tagRoutes.js
import express from 'express';
import tagController from '../Controllers/tagController.js';
import { authenticateUser, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/tags',authenticateUser, async (req, res) => {
    const { name } = req.body;
    try {
        const tag = await tagController.createTag(name);
        res.status(201).json(tag);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create tag' });
    }
});

router.put('/tags/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const tag = await tagController.editTag(id, name);
        res.json(tag);
    } catch (error) {
        res.status(500).json({ error: 'Failed to edit tag' });
    }
});

router.delete('/tags/:id',authenticateUser , authorizeAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        await tagController.deleteTag(id);
        res.json({ message: 'Tag deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete tag' });
    }
});

export default router;
