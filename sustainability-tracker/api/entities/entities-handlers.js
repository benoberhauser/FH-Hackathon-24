const mongoose = require('mongoose');

const { Entity } = require('./entities-model');
const { logger } = require('../../logging/log');
const { BadRequest, NotFound, PreConditionFailed, UnsupportedMediaType,
    InternalServerError } = require('../../middlewares/error-handling');

const getAll = async (req, resp, next) => {
    try {
        logger.debug(`Entities - Fetching all with filter`, req.query);
        // blindly accept filter from client - never do this in production
        let resultSet = await Entity.find(req.query);
        resp.status(200);
        resp.json(resultSet);
    }
    catch (err) {
        next(new InternalServerError(err));
    }
};

const create = async (req, resp, next) => {
    setTimeout(async () => {
        try {
            logger.debug(`Entities - Adding new entity`);
            let newEntity = await Entity.create(req.body);
            resp.status(201);
            resp.location('/api/entities/' + newEntity.id);
            resp.json(newEntity);
        }
        catch (err) {
            if (err instanceof mongoose.Error.ValidationError)
                next(new BadRequest('Invalid entity object', err));
            else
                next(new InternalServerError(err));
        }
    }, 2000);
};

const getById = async (req, resp, next) => {
    try {
        let objId = req.params.id;
        logger.debug(`Entities - Fetch entity with id=${objId}`);

        let entity = await Entity.findById(objId);
        if (entity)
            resp.status(200).header('etag', entity.__v).json(entity);
        else
            next(new NotFound(`Entity with id ${objId} not found`));
    }
    catch (err) {
        next(new InternalServerError(err));
    }
};

const deleteById = async (req, resp, next) => {
    try {
        let objId = req.params.id;
        logger.debug(`Entities - Delete entity with id=${objId}`);
        let opResult = await Entity.deleteOne({ _id: objId });
        if (opResult.deletedCount == 1)
            resp.status(204).send();
        else
            next(new NotFound(`Entity with id ${objId} not found`));
    }
    catch (err) {
        next(new InternalServerError(err));
    }
};

const updateById = async (req, resp, next) => {
    const objId = req.params.id;
    const ifMatchHdr = req.headers['if-match'];

    if (!ifMatchHdr) {
        next(new BadRequest(`if-match header not provided`, err));
        return;
    }

    setTimeout(async () => {
        try {
            logger.debug(`Entities - Update entity with id=${objId}`);
            let entity = await Entity.findById(objId);

            if (entity === null) {
                next(new NotFound(`Entity with id ${objId} not found`));
                return;
            }

            // check if resource was modified in the meantime
            if (ifMatchHdr != entity.__v) {
                next(new PreConditionFailed('Resource was modified in the meantime. Cannot update'));
                return;
            }

            // copy over properties to existing object
            for (let k in req.body) {
                entity[k] = req.body[k];
            }

            // save back object to database        
            await entity.save();
            resp.status(200).json(entity);
        }
        catch (err) {
            if (err instanceof mongoose.Error.ValidationError)
                next(new BadRequest('Invalid entity object', err));
            else
                next(new InternalServerError(err));
        }
    }, 1500);
};

const patchById = async (req, resp, next) => {

    if (req.headers['content-type'] != 'application/merge-patch+json') {
        next(new UnsupportedMediaType('only application/merge-patch+json supported'));
        return;
    }

    const objId = req.params.id;

    try {
        logger.debug(`Entities - Patch entity with id=${objId}`);
        let entity = await Entity.findById(objId);

        if (entity === null) {
            next(new NotFound(`Entity with id ${objId} not found`));
            return;
        }

        // merge provided properties into object
        for (let k in req.body) {
            if (req.body[k] === null) {
                delete entity[k];
            }
            else {
                entity[k] = req.body[k];
            }
        }

        // save back object to database
        await entity.save();
        resp.status(200).json(entity);
    }
    catch (err) {
        if (err instanceof mongoose.Error.ValidationError)
            next(new BadRequest('Invalid entity object', err));
        else
            next(new InternalServerError(err));
    }
};


module.exports = {
    create,
    getAll,
    getById,
    updateById,
    patchById,
    deleteById
}