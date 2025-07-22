import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, userController.getUsers);
router.post('/', userController.createUser);
router.post('/login', userController.login);
router.post('/seed/:count', userController.seedUsers);

export default router;