import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { Neo4jGraphQL } from '@neo4j/graphql';
import * as neo4j from 'neo4j-driver';
import { print } from 'graphql';
import cors from 'cors';
import http from 'http';
import * as winston from 'winston';
import fs from 'fs';
import { expressMiddleware } from '@as-integrations/express5';
import express from 'express';
import * as path from 'path';

const logger = winston.createLogger({
  level: 'info',
  // Use timestamp and printf to create a standard log format
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' }),
  ],
});

// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

const driver = neo4j.driver(
  process.env.MEMGRAPH_HOST + ':' + process.env.MEMGRAPH_PORT,
  neo4j.auth.basic(process.env.MEMGRAPH_USERNAME, process.env.MEMGRAPH_KEY),
);

function startSchema(instance) {
console.log(typeDefs)
  const driver = neo4j.driver(
    environment.MEMGRAPH_HOST + ':' + environment.MEMGRAPH_PORT,
    neo4j.auth.basic(environment.MEMGRAPH_USERNAME, environment.MEMGRAPH_KEY),
  );

/*  fs.readFile(environment.MEMGRAPH_SCHEMA, 'utf8', async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const typeDefs = data;
    console.log(typeDefs)
    const neoSchema: Neo4jGraphQL = new Neo4jGraphQL({
      typeDefs,
      driver,
      debug: true,
    });*/
//schema: await neoSchema.getSchema(),
const neoSchema: Neo4jGraphQL = new Neo4jGraphQL({
  typeDefs,
  driver,
  debug: true,
});

    await apolloServer.start();

    app.use(
      `/`,
      cors<cors.CorsRequest>(),
      express.json(),
      expressMiddleware(apolloServer, {
        context: async ({ req }) => ({
          req,
          sessionConfig: { database: 'memgraph' },
          cypherQueryOptions: { addVersionPrefix: false },
        }),
      }),
      (req, res, next) => {
        logger.info(`Received a ${req.method} request for ${req.url}`);
        next();
      },
    );
  } catch (e) {
    console.log(e);
    logger.error(e);
  }

  try {
    const port = 4000;
    const server = app.listen(port, () => {
      logger.info(
        `RDAS API listening to port ${port} at ${process.env.MEMGRAPH_HOST}`,
      );
    });
  } catch (e) {
    logger.error(e);
  }
});
