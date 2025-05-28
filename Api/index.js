import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import articleRoutes from './controller/articleController.js';
import userRoutes from './controller/userController.js';
import auth from './middleware/utils.js'

const App = express();
App.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for the application',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./controller/*.js', './controller/userController.js'], // Add all relevant files
};


const swaggerSpec = swaggerJsdoc(swaggerOptions);
App.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
App.get('/', (req, res) => {
  res.json('Hello there');
});
App.use('/article',auth.authenticateJWT, articleRoutes);
App.use('/login', userRoutes);

App.listen(3000, () => console.log("Server is online at http://localhost:3000"));

