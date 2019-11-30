'use strict';

var controllerHelper = require('../helpers/controller.helper');
const {hostPedas} = require('../models');

// Module Name
const MODULE_NAME = '[hostPedas Controller]';
// Error Messages
const HP_CT_ERR_HOSTPEDAS_NOT_FOUND = 'hostPedas not found';
// Success Messages
const HP_CT_DELETED_SUCCESSFULLY = 'hostPedas deleted successfully';

function getHostpedas(req, res) {
    try {

        hostPedas.findAll()
            .then(hostpedasList => res.status(200).send(hostpedasList))
            .catch(error => res.status(500).send(error));

    } catch (error) {
        console.log("Was an error");
        console.log(error);
        controllerHelper.handleErrorResponse(MODULE_NAME, getHostpedas.name, error, res);
    }
}

function createHostpedas(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {

        var parameters = req.body;

        return hostPedas.create({
            host: parameters.host,
            peda: parameters.peda,
            calificacion: parameters.calificacion
        }).then(hostpedas => res.status(201).send(hostpedas))
            .catch(error => res.status(400).send(error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, createHostpedas.name, error, res);
    }

}

function getHostpedasById(req, res) {
    try {

        var id = req.swagger.params.id.value;

        hostPedas.findByPk(id)
            .then(hostpedas => res.status(200).send(hostpedas));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, getHostpedasById.name, error, res);
    }
}

function deleteHostpedas(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    var id = req.swagger.params.id.value;

    hostPedas.findByPk(id).then(hostpedas => {
        if (!hostpedas) {
            res.status(200).send({"success": 0, "description": "not found !"});
        } else {
            return hostpedas.destroy()
                .then(() => res.status(200).send({"success": 1, "description": "deleted!"}))
                .catch(() => res.status(403).send({"success": 0, "description": "error !"}));
        }
    }).catch(error => console.log("There was an error: " + error));
}

function updateHostpedas(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {

        var id = req.swagger.params.id.value;
        var parameters = req.body;

        hostPedas.findByPk(id).then(hostpedas => {
            if (!hostpedas) {
                res.status(401).send(({}));
            }
            return hostpedas.update({
                host: parameters.host,
                peda: parameters.peda,
                calificacion: parameters.calificacion
            }).then(() => res.status(200).send(hostpedas))
                .catch(error => res.status(403).send(hostpedas));
        }).catch(error => console.log("There was an error: " + error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, updateHostpedas.name, error, res);
    }
}

module.exports =
{
        getHostpedas,
        getHostpedasById,
        createHostpedas,
        updateHostpedas,
        deleteHostpedas,
        HP_CT_ERR_HOSTPEDAS_NOT_FOUND,
        HP_CT_DELETED_SUCCESSFULLY,
        MODULE_NAME
};
