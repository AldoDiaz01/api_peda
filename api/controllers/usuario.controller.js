'use strict';

var controllerHelper = require('../helpers/controller.helper');
const {Usuarios} = require('../models');

// Module Name
const MODULE_NAME = '[User Controller]';
// Error Messages
const U_CT_ERR_USER_NOT_FOUND = 'User not found';
// Success Messages
const U_CT_DELETED_SUCCESSFULLY = 'User deleted successfully';

function getUsuario(req, res) {
    try {

        Usuarios.findAll()
            .then(usuarioList => res.status(200).send(usuarioList))
            .catch(error => res.status(500).send(error));

    } catch (error) {
        console.log("Was an error");
        console.log(error);
        controllerHelper.handleErrorResponse(MODULE_NAME, getUsuario.name, error, res);
    }
}

function createUsuario(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {

        var parameters = req.body;

        return Usuarios.create({
            usuario: parameters.usuario,
            contrasena: parameters.contrasena,
            nombre: parameters.nombre,
            edad: parameters.edad,
            telefono: parameters.telefono
        }).then(usuario => res.status(201).send(usuario))
            .catch(error => res.status(400).send(error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, createUsuario.name, error, res);
    }

}

function getUsuarioById(req, res) {
    try {

        var id = req.swagger.params.id.value;

        Usuarios.findByPk(id)
            .then(usuario => res.status(200).send(usuario));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, getUsuarioById.name, error, res);
    }
}

function deleteUsuario(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    var id = req.swagger.params.id.value;

    Usuarios.findByPk(id).then(usuario => {
        if (!usuario) {
            res.status(200).send({"success": 0, "description": "not found !"});
        } else {
            return usuario.destroy()
                .then(() => res.status(200).send({"success": 1, "description": "deleted!"}))
                .catch(() => res.status(403).send({"success": 0, "description": "error !"}));
        }
    }).catch(error => console.log("There was an error: " + error));
}

function updateUsuario(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {

        var id = req.swagger.params.id.value;
        var parameters = req.body;

        Usuarios.findByPk(id).then(usuario => {
            if (!usuario) {
                res.status(401).send(({}));
            }
            return usuario.update({
                usuario: parameters.usuario,
                contrasena: parameters.contrasena,
                nombre: parameters.nombre,
                edad: parameters.edad,
                telefono: parameters.telefono
            }).then(() => res.status(200).send(usuario))
                .catch(error => res.status(403).send(usuario));
        }).catch(error => console.log("There was an error: " + error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, updateUsuario.name, error, res);
    }
}

module.exports =
{
        getUsuario,
        getUsuarioById,
        createUsuario,
        updateUsuario,
        deleteUsuario,
        U_CT_ERR_USER_NOT_FOUND,
        U_CT_DELETED_SUCCESSFULLY,
        MODULE_NAME
};
