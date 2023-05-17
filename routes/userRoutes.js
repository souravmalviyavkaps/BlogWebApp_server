import express from 'express';
const router = express.Router();
import {create, createSession, updateProfile, readProfile, deleteProfile} from '../controllers/users_controller.js'; 
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';


router.get('/profile', readProfile);
router.patch('/profile',auth, upload.single('avatar'), updateProfile);
router.delete('/profile', deleteProfile);
router.post('/create', create);
router.post('/create-session', createSession);

export default router;