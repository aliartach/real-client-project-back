import express from 'express';
import {
  createOrderedProduct,
  getAllOrderedProducts,
  getOrderedProductById,
  updateOrderedProduct,
  deleteOrderedProductById
} from '../Controllers/OrderedProduct.js';

const router = express.Router();

router.post('/', createOrderedProduct);
router.get('/', getAllOrderedProducts);
router.get('/:id', getOrderedProductById);
router.patch('/:id', updateOrderedProduct);
router.delete('/:id', deleteOrderedProductById);

export default router;