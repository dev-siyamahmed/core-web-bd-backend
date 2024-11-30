import express from 'express';
import { UsersRoutes } from '../modules/user/user.routes.js';


const router = express.Router();

// Dynamically apply routers
const routers = [UsersRoutes];

routers.forEach(route => router.use(route));

export default router;
