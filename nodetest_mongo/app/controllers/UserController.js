!(function() {
    'use strict';

    var Config = require('../../config/Configuration')
   , UserModel = require('../models/User');
    
    var UserController = {
		
        /*
         *Api for Create User
         */
        createUser: function(req, res, next) {
            UserModel.createUser(req, function(err, user) {
                if (err) {
                    res.json({success: false, data: [], message: err});
                } else {
                    res.json({
                        success: true,
                        data: [],
                        message: 'User successfully created.'
                    });
                }
            });
        },
		getUsersList: function(req, res, next) {
           UserModel.getUsersList(req, function(err, paginatedResults, pageCount, itemCount){
				if (err) {
					 res.json({success: false, data: [], message: err});
				} else{
					 res.json({
                        success: true,
                        data: {totalItems: itemCount, page: pageCount, items: paginatedResults},
                        message: 'All  users list.'
                     });
				} 
           });
        },
		getUserDetail: function(req, res, next) {
           UserModel.getUserByAttr({_id:req.params.id}, function(err, data){
				if (err) {
					res.json({success: false, data: err, message: err});
				} else{
					res.json({success:true, data:data, message:"User detail."});
				} 
           });
        },
        updateUser: function(req, res, next) {
			UserModel.getUserByAttr({email:req.body.email.toLowerCase(), _id:{$ne:req.body._id},status:{$ne:'deleted'}}, function(err, user){
				if (err) {
					res.json({success: false, data:[], message: err});
				} else if(user){
					res.json({success:false, data:[], message:"Email alreay exist."}); 
				}else{
					UserModel.updateUser(req, function(err, data){
						if (err) {
							res.json({success: false, data: err, message: err});
						} else{
							res.json({success:true, data:[], message:"User successfully updated."});
						} 
				    });
				} 
            });         
        },
        deleteUser: function(req, res, next) {
			UserModel.deleteUser(req, function(err, user){
				if (err) {
					res.json({success: false, data:[], message: err});
				} else{
					res.json({success:true, data:[], message:"User successfully deleted."}); 
				} 
            });         
        }	
    };
    module.exports = UserController;
})();
