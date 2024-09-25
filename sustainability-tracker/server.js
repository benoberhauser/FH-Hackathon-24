'use strict';

/* ***************** IMPORT packages *********************** */
const express = require("express");
const http = require('http');
const path = require('path');


/* ***************** IMPORT LIBS *************************** */
const { logger } = require('./logging/log');
const database = require("./db/database");
const { ROLE_ADMIN, ROLE_WORKER } = require('./auth/roles');
const DEFAULTS = require('./config/defaults.json');


/* ***************** IMPORT MIDDLEWARES ******************** */
const { errorHandler } = require('./middlewares/error-handling');


/* ***************** IMPORT REQUEST-HANDLER **************** */
const entitiesHandler = require('./api/entities/entities-handlers');
const infoHandler = require('./api/info/info-handler');
const schoolsHandler = require('./api/schools/schools-handlers');


/* ***************** CONFIG and CONSTS ********************* */
/* Take configuration from environment variables or use hardcoded default value */
const HOSTNAME = '0.0.0.0';
const PORT = process.env.PORT || DEFAULTS.PORT;

const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING || DEFAULTS.MONGODB_CONNECTION_STRING;
const MONGODB_RECREATE = process.env.MONGODB_RECREATE === 'true';

const TENANT_ID = process.env.TENANT_ID || '2b197efa-8e1b-4680-b263-8e237889b5b3';
const APP_ID = process.env.APP_ID || '6ad4a7f8-9383-461e-bf00-9155de40b24d';

// if not explicitly set to false do verification
const AUTHJWT_VERIFY = process.env.AUTHJWT_VERIFY === 'false' ? false : true;


/* ***************** START UP ******************************* */
logger.info('Backend - Starting configuration...');

const app = express();
app.use(express.json({ type: ['application/json', 'application/merge-patch+json'] }));

// use build folder of vite as static directory
app.use(express.static(path.join(__dirname, "client", "dist")));

// register all endpoints 
app.get('/api/employees', entitiesHandler.getAll);

// register catch-all route to handle client-side routing with index.html
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(errorHandler);


// create HTTP server
logger.info('Backend - Starting up ...');
const httpServer = http.createServer(app);

// establish DB connection (app crashs if connect to db fails)
database.createConnection(MONGODB_CONNECTION_STRING, MONGODB_RECREATE);

// add function(s) so that they are accessible by tests
httpServer.dropCurrentDatabase = async () => {
  await database.dropCurrentDB(MONGODB_CONNECTION_STRING);
}

// start listening to HTTP requests
httpServer.listen(PORT, HOSTNAME, () => {
  logger.info(`Backend - Running on port ${PORT}...`);
});

module.exports = httpServer;