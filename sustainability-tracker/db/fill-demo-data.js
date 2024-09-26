const fsp = require('fs').promises;

const mongoose = require('mongoose');

const DEFAULTS = require('../config/defaults.json');

const database = require('./database.js');
const { Person } = require('../api/persons/persons-model.js');

const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING || DEFAULTS.MONGODB_CONNECTION_STRING;

fillDatabase();

async function fillDatabase() {
  await database.createConnection(MONGODB_CONNECTION_STRING, true);
  console.log('Starting filling database with demo data...');

  await fillPersonsData();
  // and so on ...

  console.log('Finished filling database!')
  await mongoose.disconnect();
}

async function fillPersonsData() {
  let allEntities = JSON.parse(await fsp.readFile('./data/persons.json'));
  const allCreationJobs = [];

  for (let entity of allEntities) {
    allCreationJobs.push(Person.create(entity));
  }

  const results = await Promise.allSettled(allCreationJobs);
  const successCnt = results.filter(job => job.status === 'fulfilled').length;
  const errorCnt = results.filter(job => job.status === 'rejected').length;
  console.log(`Person data - ${successCnt} persons successfully imported, ${errorCnt} persons contain errors`);
}

