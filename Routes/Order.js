import express from 'express';
import {
  createOrder,
  updateOrder,
  getAllOrders,
  getSingleOrder,
  deleteOrder
  
} from '../Controllers/Order.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:id', getSingleOrder);
router.patch('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;