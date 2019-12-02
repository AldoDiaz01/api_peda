'use strict';

var controllerHelper = require('../helpers/controller.helper');
const {Hosts} = require('../models');

// Module Name
const MODULE_NAME = '[Host Controller]';
// Error Messages
const H_CT_ERR_HOST_NOT_FOUND = 'Host not found';
// Success Messages
const H_CT_DELETED_SUCCESSFULLY = 'Host deleted successfully';

function getHost(req, res) {
    try {

        Hosts.findAll()
            .then(hostList => res.status(200).send(hostList))
            .catch(error => res.status(500).send(error));

    } catch (error) {
        console.log("Was an error");
        console.log(error);
        controllerHelper.handleErrorResponse(MODULE_NAME, getHost.name, error, res);
    }
}

function createHost(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {

        var parameters = req.body;

        return Hosts.create({
                usuario: parameters.usuario,
                contasena: parameters.contrasena,
                nombre: parameters.nombre,
                edad: parameters.edad,
                telefono: parameters.telefono,
                direccion: parameters.direccion
        }).then(host => res.status(201).send(host))
            .catch(error => res.status(400).send(error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, createHost.name, error, res);
    }

}

function getHostById(req, res) {
    try {

        var id = req.swagger.params.id.value;

        Hosts.findByPk(id)
            .then(host => res.status(200).send(host));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, getHostById.name, error, res);
    }
}

function deleteHost(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    var id = req.swagger.params.id.value;

    Hosts.findByPk(id).then(host => {
        if (!host) {
            res.status(200).send({"success": 0, "description": "not found !"});
        } else {
            return host.destroy()
                .then(() => res.status(200).send({"success": 1, "description": "deleted!"}))
                .catch(() => res.status(403).send({"success": 0, "description": "error !"}));
        }
    }).catch(error => console.log("There was an error: " + error));
}

function updateHost(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {

        var id = req.swagger.params.id.value;
        var parameters = req.body;

        Hosts.findByPk(id).then(host => {
            if (!host) {
                res.status(401).send(({}));
            }
            return host.update({
                usuario: parameters.usuario,
                contasena: parameters.contrasena,
                nombre: parameters.nombre,
                edad: parameters.edad,
                telefono: parameters.telefono,
                direccion: parameters.direccion
            }).then(() => res.status(200).send(host))
                .catch(error => res.status(403).send(host));
        }).catch(error => console.log("There was an error: " + error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, updateHost.name, error, res);
    }
}

module.exports =
{
        getHost,
        getHostById,
        createHost,
        updateHost,
        deleteHost,
        H_CT_ERR_HOST_NOT_FOUND,
        H_CT_DELETED_SUCCESSFULLY,
        MODULE_NAME
};
