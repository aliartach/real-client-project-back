import express from 'express';
import * as Admin from '../Controllers/Admin.js';

const router = express.Router();

router.post('/register', Admin.register);
router.post('/login', Admin.login);

export default router;