import express from 'express';
import { createTag, deleteTag, getAllTags, getTagById, updateTag } from '../Controllers/Tag.js';
const router = express.Router();

router.get('/', getAllTags);


router.get('/:id', getTagById);


router.post('/', createTag);

router.patch('/:id', updateTag);


router.delete('/:id', deleteTag);

export default router;