import express from 'express';
import userRoutes from '../model/userModel.js';

const router = express.Router();

/**
 * @swagger
 * /login/login:
 *   post:
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tokens generated
 *       401:
 *         description: Invalid credentials
 */
router.use('/login', userRoutes.login);

/**
 * @swagger
 * /login/admin:
 *   post:
 *     summary: Create admin user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin created
 *       400:
 *         description: Missing or duplicate user
 */
router.use('/admin', userRoutes.adminCr);

/**
 * @swagger
 * /login/refresh:
 *   post:
 *     summary: Refresh access token using refresh token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: New access and refresh token returned
 *       401:
 *         description: Invalid or expired refresh token
 */
router.post('/refresh', userRoutes.refershToken);

export default router;

