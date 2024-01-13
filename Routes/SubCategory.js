import express from 'express';
import { createSubCategory, deleteSubCategory, getAllSubCategories, getSubCategoryById, updateSubCategory } from '../Controllers/SubCategory.js';
import Upload from '../Middlewares/Multer.js';
const router = express.Router();

router.get('/', getAllSubCategories);


router.get('/:id', getSubCategoryById);


router.post('/', Upload.single('icon'), createSubCategory);

router.patch('/:id', Upload.single('icon'),updateSubCategory);


router.delete('/:id',Upload.single('icon'), deleteSubCategory);

export default router;