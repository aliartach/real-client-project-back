import express from 'express'
import {
    getContentById,
    getAllContent,
    updateContent
} from '../Controllers/Content.js'

const router = express.Router();

router.patch('/:id', updateContent)
router.get('/', getAllContent)
router.get('/:id', getContentById)

export default router;