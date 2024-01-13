import express from 'express';
import Upload from '../Middlewares/Multer.js';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from '../Controllers/Product.js';

const router = express.Router();

router.post('/', Upload.single("image"), createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.patch('/:id', Upload.single("image"), updateProductById);
router.delete('/:id', deleteProductById);

export default router;