const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const path = require("node:path");
const logger = require("../../../helpers/logger");

const package = require(path.join(__dirname, "..", "..", "..", "..", "package.json"));

let swaggerSpecs = {};

try {
  swaggerSpecs = swaggerJsDoc({
    definition: {
      openapi: "3.0.0",
      info: {
        title: package.name,
        version: package.version,
        description: package.description,
      },
      servers: [
        {
          url: "http://localhost/api",
          description: "Development server",
        },
        {
          url: "https://albion-killbot.com/api",
          description: "Production server",
        },
      ],
      tags: [
        { name: "Admin", description: "Admin operation" },
        { name: "Auth", description: "Authentication methods" },
        { name: "Battles", description: "Battle data" },
        { name: "Kills", description: "Kill data" },
        { name: "Rankings", description: "Ranking data" },
        { name: "Servers", description: "Servers and settings" },
        { name: "Search", description: "Search for entities in Albion Online" },
        { name: "Subscriptions", description: "View and manage server subscriptions" },
        { name: "Users", description: "Discord user information" },
      ],
    },
    apis: [path.join(__dirname, "..", "routes", "**.js")],
  });
} catch (e) {
  logger.warn(`Unable to generate swagger specification:`, e);
}

module.exports = {
  swaggerSpecs,
  swaggerUI,
};
