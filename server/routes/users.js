!(function() {
    'use strict';

    var express = require('express')
        , router = express.Router()
        , UserController = require('../app/controllers/UserController');
       
    var route = function(app) {
        router.post('/user', UserController.createUser);
        router.get('/users_list', UserController.getUsersList);
        router.get('/user/:id', UserController.getUserDetail);
        router.put('/user', UserController.updateUser);
        router.delete('/user/:delete_type/:id', UserController.deleteUser);

       
        app.use('/api/users', router);
    }
    module.exports = route;
})();
