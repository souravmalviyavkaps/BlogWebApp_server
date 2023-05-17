import express from 'express';
const router = express.Router();
import {getBlogDetails, getBlogsList, postBlog, fetchCategories, fetchCategory} from '../controllers/blog_controller.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

router.get('/', getBlogsList);
router.get('/details/:id', getBlogDetails);
router.get('/fetch-categories', fetchCategories);
router.get('/fetch-category/:catid', fetchCategory);

// requires authentication
router.post('/post-blog',auth, upload.single('img'),  postBlog);

export default router;