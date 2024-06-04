import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nodegram',
      version: '1.0.0',
      description: 'A Simple API for Posts',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],

  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

export default specs;
