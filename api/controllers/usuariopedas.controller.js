'use strict';

var controllerHelper = require('../helpers/controller.helper');
const {usuarioPedas} = require('../models');

// Module Name
const MODULE_NAME = '[usuarioPedas Controller]';
// Error Messages
const UP_CT_ERR_USUARIOPEDAS_NOT_FOUND = 'usuarioPedas not found';
// Success Messages
const UP_CT_DELETED_SUCCESSFULLY = 'usuarioPedas deleted successfully';

function getUsuariopedas(req, res) {
    try {

        usuarioPedas.findAll()
            .then(usuariopedasList => res.status(200).send(usuariopedasList))
            .catch(error => res.status(500).send(error));

    } catch (error) {
        console.log("Was an error");
        console.log(error);
        controllerHelper.handleErrorResponse(MODULE_NAME, getUsuariopedas.name, error, res);
    }
}

function createUsuariopedas(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {

        var parameters = req.body;

        return usuarioPedas.create({
            usuario: parameters.usuario,
            peda: parameters.peda,
            calificacion: parameters.calificacion
        }).then(usuariopedas => res.status(201).send(usuariopedas))
            .catch(error => res.status(400).send(error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, createUsuariopedas.name, error, res);
    }

}

function getUsuariopedasById(req, res) {
    try {

        var id = req.swagger.params.id.value;

        usuarioPedas.findByPk(id)
            .then(usuariopedas => res.status(200).send(usuariopedas));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, getUsuariopedasById.name, error, res);
    }
}

function deleteUsuariopedas(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    var id = req.swagger.params.id.value;

    usuarioPedas.findByPk(id).then(usuariopedas => {
        if (!usuariopedas) {
            res.status(200).send({"success": 0, "description": "not found !"});
        } else {
            return usuariopedas.destroy()
                .then(() => res.status(200).send({"success": 1, "description": "deleted!"}))
                .catch(() => res.status(403).send({"success": 0, "description": "error !"}));
        }
    }).catch(error => console.log("There was an error: " + error));
}

function updateUsuariopedas(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {

        var id = req.swagger.params.id.value;
        var parameters = req.body;

        usuarioPedas.findByPk(id).then(usuariopedas => {
            if (!usuariopedas) {
                res.status(401).send(({}));
            }
            return usuariopedas.update({
                usuario: parameters.usuario,
                peda: parameters.peda,
                calificacion: parameters.calificacion
            }).then(() => res.status(200).send(usuariopedas))
                .catch(error => res.status(403).send(usuariopedas));
        }).catch(error => console.log("There was an error: " + error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, updateUsuariopedas.name, error, res);
    }
}

module.exports =
{
        getUsuariopedas,
        getUsuariopedasById,
        createUsuariopedas,
        updateUsuariopedas,
        deleteUsuariopedas,
        UP_CT_ERR_USUARIOPEDAS_NOT_FOUND,
        UP_CT_DELETED_SUCCESSFULLY,
        MODULE_NAME
};
