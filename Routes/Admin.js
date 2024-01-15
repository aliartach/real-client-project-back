import express from 'express';
import * as Admin from '../Controllers/Admin.js';

const router = express.Router();

router.get('/', Admin.getAdmins);
router.get('/:id', Admin.getAdmin);
router.put('/:id', Admin.updateAdmin);
router.delete('/:id', Admin.deleteAdmin);
router.post('/register', Admin.register);
router.post('/login', Admin.login);

export default router;