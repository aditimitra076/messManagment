import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mess Management API",
      version: "1.0.0",
      description: "API documentation for Mess Management System",
    },

    servers: [
      {
        url: "http://localhost:5000",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    //  global auth (applies to all APIs unless overridden)
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  //  IMPORTANT CHANGE (for your new structure)
  apis: [
    "./routes/*.js",   // keep route-level docs
    "./docs/*.js"      //  ADD THIS (your new modular docs)
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;