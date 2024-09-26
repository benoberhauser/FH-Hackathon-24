const mongoose = require('mongoose');

const { Person } = require('./persons-model');
const { logger } = require('../../logging/log');
const { BadRequest, NotFound, PreConditionFailed, UnsupportedMediaType,
    InternalServerError } = require('../../middlewares/error-handling');

const getAll = async (req, resp, next) => {
    try {
        let resultSet = await Person.find(req.query);
        resp.status(200);
        resp.json(resultSet);
    }
    catch (err) {
        next(new InternalServerError(err));
    }
};

const getFullCO2Savings = async (req, resp, next) => {
    try{
        let persons = await Person.find();
        let fullCO2Savings = persons.reduce((accumulator, currentValue) => {
            return accumulator+currentValue.co2;
        }, 0)
        resp.status(200);
        resp.json(fullCO2Savings)
    }
    catch (err) {
        next(new InternalServerError(err));
    }
}

module.exports = {
    getAll,
    getFullCO2Savings
}