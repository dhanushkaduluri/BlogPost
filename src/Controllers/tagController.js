// controllers/tagController.js
import Tag from '../Models/tag.js';

class TagController {
    async createTag(name) {
        return await Tag.create({ name });
    }

    async editTag(id, newName) {
        const tag = await Tag.findByPk(id);
        tag.name = newName;
        return await tag.save();
    }

    async deleteTag(id) {
        return await Tag.destroy({ where: { id } });
    }
}

export default new TagController();
