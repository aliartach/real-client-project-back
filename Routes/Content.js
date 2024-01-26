import { uploadContentImages } from '../Middlewares/Multer.js';
import express from 'express'
import {
    getContentById,
    getAllContent,
    updateContent,
    createContent
} from '../Controllers/Content.js'
import Upload from '../Middlewares/Multer.js';
const router = express.Router();

router.put('/:id', uploadContentImages, updateContent)
router.get('/', getAllContent)
router.get('/:id', getContentById)
router.post('/create', uploadContentImages, createContent)

export default router;
