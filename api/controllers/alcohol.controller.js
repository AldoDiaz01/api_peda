'use strict';

var controllerHelper = require('../helpers/controller.helper');
const {Alcoholes} = require('../models');

// Module Name
const MODULE_NAME = '[Alcohol Controller]';
// Error Messages
const A_CT_ERR_ALCOHOL_NOT_FOUND = 'Alcohol not found';
// Success Messages
const A_CT_DELETED_SUCCESSFULLY = 'Alcohol deleted successfully';

function getAlcohol(req, res) {
    try {

        Alcoholes.findAll()
            .then(alcoholList => res.status(200).send(alcoholList))
            .catch(error => res.status(500).send(error));

    } catch (error) {
        console.log("Was an error");
        console.log(error);
        controllerHelper.handleErrorResponse(MODULE_NAME, getAlcohol.name, error, res);
    }
}

function createAlcohol(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {

        var parameters = req.body;

        return Alcoholes.create({
            nombre: parameters.nombre,
            tipo: parameters.tipo
        }).then(alcohol => res.status(201).send(alcohol))
            .catch(error => res.status(400).send(error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, createAlcohol.name, error, res);
    }

}

function getAlcoholById(req, res) {
    try {

        var id = req.swagger.params.id.value;

        Alcoholes.findByPk(id)
            .then(alcohol => res.status(200).send(alcohol));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, getAlcoholById.name, error, res);
    }
}

function deleteAlcohol(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    var id = req.swagger.params.id.value;

    Alcoholes.findByPk(id).then(alcohol => {
        if (!alcohol) {
            res.status(200).send({"success": 0, "description": "not found !"});
        } else {
            return alcohol.destroy()
                .then(() => res.status(200).send({"success": 1, "description": "deleted!"}))
                .catch(() => res.status(403).send({"success": 0, "description": "error !"}));
        }
    }).catch(error => console.log("There was an error: " + error));
}

function updateAlcohol(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {

        var id = req.swagger.params.id.value;
        var parameters = req.body;

        Alcoholes.findByPk(id).then(alcohol => {
            if (!alcohol) {
                res.status(401).send(({}));
            }
            return alcohol.update({
                nombre: parameters.nombre,
                tipo: parameters.tipo
            }).then(() => res.status(200).send(alcohol))
                .catch(error => res.status(403).send(alcohol));
        }).catch(error => console.log("There was an error: " + error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, updateAlcohol.name, error, res);
    }
}

module.exports =
{
        getAlcohol,
        getAlcoholById,
        createAlcohol,
        updateAlcohol,
        deleteAlcohol,
        A_CT_ERR_ALCOHOL_NOT_FOUND,
        A_CT_DELETED_SUCCESSFULLY,
        MODULE_NAME
};
