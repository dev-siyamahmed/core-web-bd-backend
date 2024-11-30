import express from 'express';
import { UserController } from './user.controller.js';

const router = express.Router();

router.post('/create-user', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.patch('/users/:userId/balance', UserController.updateUser);


export default UsersRoutes;