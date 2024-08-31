const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Swagger Nolatech Express API',
            version: '1.0.0',
            description: 'Detailed API documentation, for the Nolatech',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    in: 'header',
                    name: 'Authorization',
                    description: 'Bearer token to access these api endpoints',
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
        servers: [
            {
                url: process.env.URI_SERVER,
                description: 'Local server',
            },
        ],
    },
    apis: ['src/routes/*.js']
};

const specs = swaggerJsdoc(swaggerOptions);

    module.exports = {
        specs,
        swaggerUi,
    };
