import express from 'express';
const router = express.Router();
import blogRoutes from './blogRoutes.js';
import adminRoutes from './adminRoutes.js';
import userRoutes from './userRoutes.js';
import stripe from './stripe.js'
import { getBlogsList } from '../controllers/blog_controller.js';

router.get('/', getBlogsList);
router.use('/blogs', blogRoutes);
router.use('/admin', adminRoutes);
router.use('/users', userRoutes);

router.use('/payment', stripe);


export default router;