const fsp = require('fs').promises;

const mongoose = require('mongoose');

const DEFAULTS = require('../config/defaults.json');

const database = require('./database.js');
const { School } = require('../api/schools/schools-model.js');
const { Entity } = require('../api/entities/entities-model.js');

const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING || DEFAULTS.MONGODB_CONNECTION_STRING;

fillDatabase();

async function fillDatabase() {
  await database.createConnection(MONGODB_CONNECTION_STRING, true);
  console.log('Starting filling database with demo data...');

  await fillEntitiesData();
  await fillSchoolsData();
  // and so on ...

  console.log('Finished filling database!')
  await mongoose.disconnect();
}

async function fillSchoolsData() {
  let allSchools = JSON.parse(await fsp.readFile('./data/schools.json'));
  const allCreationJobs = [];

  for (let school of allSchools) {
    allCreationJobs.push(School.create(school));
  }

  const results = await Promise.allSettled(allCreationJobs);
  const successCnt = results.filter(job => job.status === 'fulfilled').length;
  const errorCnt = results.filter(job => job.status === 'rejected').length;
  console.log(`School data - ${successCnt} schools successfully imported, ${errorCnt} schools contain errors`);
}

async function fillEntitiesData() {
  let allEntities = JSON.parse(await fsp.readFile('./data/entities.json'));
  const allCreationJobs = [];

  for (let entity of allEntities) {
    allCreationJobs.push(Entity.create(entity));
  }

  const results = await Promise.allSettled(allCreationJobs);
  const successCnt = results.filter(job => job.status === 'fulfilled').length;
  const errorCnt = results.filter(job => job.status === 'rejected').length;
  console.log(`Entity data - ${successCnt} entities successfully imported, ${errorCnt} entities contain errors`);
}

