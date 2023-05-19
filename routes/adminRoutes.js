import express from 'express';
const router = express.Router();
import { addUser, addBlog, addCategory, fetchUsers, updateUser } from '../controllers/admin_controller.js';
import checkAdmin from '../middleware/checkAdmin.js';
import auth from '../middleware/auth.js';

router.post('/add-user', auth, checkAdmin, addUser);
router.post('/add-blog',auth, checkAdmin, addBlog);
router.post('/add-category',auth, checkAdmin, addCategory);
router.get('/fetch-users', auth, checkAdmin, fetchUsers);
router.put('/update-user/:id', auth, checkAdmin, updateUser);

export default router;