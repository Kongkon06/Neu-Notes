import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import articleRoutes from './controller/articleController.js';
import userRoutes from './controller/userController.js';
import auth from './middleware/utils.js'

const app = express();
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for the application',
    },
    servers: [
      { url: 'http://localhost:3000' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'apiKey',       // You can also use 'http' with 'bearer' scheme
          name: 'Authorization',
          in: 'header',
          description: 'Enter your token in the format **Bearer &lt;token&gt;**',
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
  },
  apis: ['./controller/*.js'], // or wherever your route files are located
};


const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.get('/', (req, res) => {
  res.json('Hello there');
});
app.use('/article',auth.authenticateJWT, articleRoutes);
app.use('/login', userRoutes);

app.listen(3000, () => console.log("Server is online at http://localhost:3000"));

