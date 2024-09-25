const mongoose = require('mongoose');
const { logger } = require('../logging/log');

const dbConnectTimeout = 5000;

async function createConnection(connectionString, recreateDatabase) {

  try {
    logger.info(`DB - Setting up connection using ${connectionString}`);

    if (recreateDatabase) {
      logger.info(`DB - Start dropping current database`);
      await dropCurrentDB(connectionString);
      logger.info('DB - Current database dropped !!');
    }

    await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: dbConnectTimeout,
    });

    logger.info(`DB - Connection to ${connectionString} established.`);
  }
  catch (err) {
    logger.error('DB - Unable to setup connection... ', err);
    process.exit(1);
  }
}

async function dropCurrentDB(connectionString) {
  let connection = await mongoose.createConnection(connectionString, {
    serverSelectionTimeoutMS: dbConnectTimeout
  }).asPromise();
  await connection.dropDatabase();
}

module.exports = { createConnection, dropCurrentDB };
