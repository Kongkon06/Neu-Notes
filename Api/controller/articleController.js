import express from 'express';
import { createAticle, deleteArticle, getArticle, updateArticle } from '../model/articleModel.js';

const router = express.Router();

/**
 * @swagger
 * /article/create:
 *   post:
 *     summary: Create a new article
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               htmlContent:
 *                 type: string
 *     responses:
 *       201:
 *         description: Article created
 */
router.post('/create', createAticle);

/**
 * @swagger
 * /article/update/{id}:
 *   put:
 *     summary: Update an article by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               htmlContent:
 *                 type: string
 *     responses:
 *       200:
 *         description: Article updated
 */
router.put('/update/:id', updateArticle);

/**
 * @swagger
 * /article/{id}:
 *   get:
 *     summary: Get an article by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Article data
 */
router.get('/:id', getArticle);

/**
 * @swagger
 * /article/delete:
 *   delete:
 *     summary: Delete an article
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Article deleted
 */
router.delete('/delete', deleteArticle);

export default router;