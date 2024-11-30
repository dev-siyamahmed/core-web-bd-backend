import express from 'express';
import { UsersRoutes } from './modules/user/user.routes.js';

const router = express.Router();

// Dynamically apply routers
router.use('/api/v1', UsersRoutes); // Make sure routes are registered here

export default router;
