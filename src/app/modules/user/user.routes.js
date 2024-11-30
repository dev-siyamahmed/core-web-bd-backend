import express from 'express';
import { UserController } from './user.controller.js';

const router = express.Router();

router.post('/create-user', UserController.createUser);
router.get('/users', UserController.getAllUsers);



export const UsersRoutes = router;