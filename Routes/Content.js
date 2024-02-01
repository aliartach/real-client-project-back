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

router.patch('/:id', Upload.fields([{ name: 'imageCat', maxCount: 1 }, { name: 'imageDog', maxCount: 1 }]), updateContent);
router.get('/', getAllContent)
router.get('/:id', getContentById)
router.post('/', Upload.fields([{ name: 'imageCat', maxCount: 1 }, { name: 'imageDog', maxCount: 1 }]), createContent);

export default router;
