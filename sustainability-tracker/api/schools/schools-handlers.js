const mongoose = require('mongoose');

const { School } = require('./schools-model');
const { logger } = require('../../logging/log');

const getAll = async (req, resp) => {
    try {
        logger.debug(`Schools - Fetching schools with filter`, req.query);
        // blindly accept filter from client - never do this in production
        let resultSet = await School.find(req.query);
        resp.status(200);
        resp.json(resultSet);
    }
    catch (err) {
        logger.warn(err);
        resp.status(500).send();
    }
};

const create = async (req, resp) => {
    try {
        logger.debug(`Schools - Adding new school`);
        let newSchool = await School.create(req.body);
        resp.status(201);
        resp.location('/api/schools/' + newSchool.id);
        resp.json(newSchool);
    }
    catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            logger.debug(err);
            resp.status(400).type('text/plain').send('Invalid school object');
        }
        else {
            logger.warn(err);
            resp.status(500).send();
        }
    }
};

const getById = async (req, resp) => {
    try {
        let schoolId = req.params.id;
        logger.debug(`Schools - Fetch school with id=${schoolId}`);

        let school = await School.findById(schoolId);
        if (school) {
            resp.status(200).json(school);
        }
        else {
            resp.status(404).type('text/plain').send(`School with id ${req.params.id} not found`);
        }
    }
    catch (err) {
        logger.warn(err);
        resp.status(500).send();
    }
};

const deleteById = async (req, resp) => {
    try {
        let schoolId = req.params.id;
        logger.debug(`Schools - Delete school with id=${schoolId}`);
        let opResult = await School.deleteOne({ _id: schoolId });
        if (opResult.deletedCount == 1) {
            resp.status(204).send();
        }
        else {
            resp.status(404).type('text/plain').send(`School with id ${req.params.id} not found`);
        }
    }
    catch (err) {
        logger.warn(err);
        resp.status(500).send();
    }
};

module.exports = {
    create,
    getAll,
    getById,
    deleteById
}