import express from 'express';
import articleRoutes from '../controller/articleController.js'
import auth from '../middleware/utils.js'

const router = express.Router();

router.use('/article',auth.authenticateJWT,articleRoutes);

export default router;


