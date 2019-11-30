'use strict';

var controllerHelper = require('../helpers/controller.helper');
const {Pedas} = require('../models');

// Module Name
const MODULE_NAME = '[Peda Controller]';
// Error Messages
const P_CT_ERR_PEDA_NOT_FOUND = 'Peda not found';
// Success Messages
const P_CT_DELETED_SUCCESSFULLY = 'Peda deleted successfully';

function getPeda(req, res) {
    try {

        Pedas.findAll()
            .then(pedaList => res.status(200).send(pedaList))
            .catch(error => res.status(500).send(error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, getPedas.name, error, res);
    }
}

function createPeda(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type'); // If needed
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {
        var parameters = req.body;

        return Pedas.create({
                horario: parameters.horario,
                cantidad: parameters.cantidad,
                presupuesto: parameters.presupuesto,
                host: parameters.host
        }).then((peda) => res.status(201).send(peda))
            .catch(error => res.status(400).send(error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, createPeda.name, error, res);
    }

}

function getPedaById(req, res) {
    try {

        var id = req.swagger.params.id.value;

        Pedas.findByPk(id)
            .then(peda => res.status(200).send(peda));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, getPedaById.name, error, res);
    }
}

function deletePeda(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type'); // If needed
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    var id = req.swagger.params.id.value;

    Pedas.findByPk(id).then(peda => {
        if (!peda) {
            res.status(200).send({"success": 0, "description": "not found !"});
        } else {
            return peda.destroy()
                .then(() => res.status(200).send({"success": 1, "description": "deleted!"}))
                .catch(() => res.status(403).send({"success": 0, "description": "error !"}));
        }
    }).catch(error => console.log("There was an error: " + error));
}

function updatePeda(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type'); // If needed
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {

        var id = req.swagger.params.id.value;
        var parameters = req.body;

        Pedas.findByPk(id).then(peda => {
                if (!peda) {
                    res.status(401).send(({}));
                }
                return peda.update({
                    horario: parameters.horario,
                    cantidad: parameters.cantidad,
                    presupuesto: parameters.presupuesto,
                    host: parameters.host
                    }).then(() => res.status(200).send(peda))
                    .catch(error => res.status(403).send(peda));
            }).catch(error => console.log("There was an error: " + error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, updatePeda.name, error, res);
    }
}

module.exports =
{
    getPeda,
    getPedaById,
    createPeda,
    updatePeda,
    deletePeda,
    P_CT_ERR_PEDA_NOT_FOUND,
    P_CT_DELETED_SUCCESSFULLY,
    MODULE_NAME
};
