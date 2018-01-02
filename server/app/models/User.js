/**
 * User Model Class
 */
!(function() {
    'use strict'

    var mongoose = require('mongoose')
        , timestamps = require('mongoose-timestamp')
        , mongoosePaginate = require('mongoose-paginate')
        , bcrypt = require('bcrypt-nodejs')
        , userSchema, Schema = mongoose.Schema;


    /*
     * Define User Schema
     */
    userSchema = new Schema({
        access_token: { type: String },
        user_type: { type: String, enum: ['admin', 'user'] },
        name: {type:String},
        first_name: { type: String},
        last_name: { type: String},
        username: { type: String},
        email: { type: String },
        password: { type: String },
        status: { type: String, default: 'active', enum: ['active', 'inactive', 'deleted'] },
        phone_no: { type: Number },
        address: { type: String }           
    });

     /**
     * Add timestamp plugin
     */
    userSchema.plugin(timestamps, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    
    /*
     * Generate hash password
     */
    userSchema.statics.hashPassword = function(password, callback) {
        bcrypt.hash(password, null, null, callback);
    };
    /*
     * compare hash password
     */
    userSchema.statics.checkPassword = function(password, passwordHash, callback) {
        bcrypt.compare(password, passwordHash, callback);
    };
    
     
    /*
     * Get  user by id
     */
    userSchema.statics.getUser = function(id, callback) {
        User.findById(id).exec(callback);
    };

    /*
     * Get  users by attr
     */
    userSchema.statics.getUsersByAttr = function(data, callback) {
        User.find(data).select("-password").exec(callback);
    };
    /*
     * Get  user by attr
     */
    userSchema.statics.getUserByAttr = function(data, callback) {
        User.findOne(data).select("-password").exec(callback);
    };
   
     /*
     * Create User
     */
    userSchema.statics.createUser = function (req, callback) {
    var where = {'email': req.body.email, status: {$ne: 'deleted'}}, data,
            uniqueId = Math.floor(Math.random() * 1000000000);
            console.log(req.body);
    User.findOne(where, function (err, user) {
      if (err) {
        callback(err);
      } else if (!user) {
        var where = {status: {$ne: 'deleted'},user_type: 'user'};
        User.findOne(where, function (err, user) {
          if (err) {
            callback(err);
          } else if (user) {
            data = req.body;
            data.user_type = 'user';
            data.status = 'active';
            //data.created_by = req.user._id;
            User.hashPassword(uniqueId, function (err, userPassword) {
              if (err) {
                return done(err);
              } else {
                data.password = userPassword;
                User.create(data, function (err, model) {
                  if (model) {
                    callback(null, false);
                  } else {
                    callback('User not created !', false);
                  }
                });
              }
            });
          } else {
            callback('User already exist !', false);
          }
        });
      } else {
        callback('Email already exist !', false);
      }
    });
  };

    /*
     * Get  forum list
     */
    userSchema.statics.getUsersList = function(req, callback) {
         var where = {},
            data = req.body,
            page = data.page || 1,
            sortBy = {},
            first_name,
            last_name,
            email;
        if (data.search) {
            first_name = data.search;
            last_name = data.search;
            email = data.search;
            where = {$or: [{'first_name': {"$regex": first_name, "$options": "i"}}, {'last_name': {"$regex": last_name, "$options": "i"}}, {'email': {"$regex": email, "$options": "i"}}]};
        }
       
        where.user_type = 'user';
        where.status = {$ne: 'deleted'};
        sortBy.created_at = -1;

        return User.paginate(where, {
            page: page,
            limit: 10,
            sortBy: sortBy,
            columns: '-password'
        }, callback);
    };


    /*
     * Update user
     */
    userSchema.statics.updateUser = function(req, callback) {
        var data = req.body;
        User.findOne({ '_id': data._id }, function(err, user) {
            if (err) {
                return callback(err, null);
            } else {

                Object.keys(data).forEach(function(item, index) {
                    user[item] = data[item];
                });
                user.updated_at = new Date();
                user.save(function(err) {
                    if (err) {
                        return callback(err);
                    } else {
                        return callback(null, true);
                    }
                });
            }
        });
    };

     /*
     * Delete user
     */
    userSchema.statics.deleteUser = function(req, callback) {
            //0 for soft delete and 1 for hard delete
            if (req.params.delete_type === 0) {
                User.update({ _id: req.params.id }, { status: 'deleted' }).exec(callback);
            } else {
                User.find({ _id: req.params.id }).remove(function(err, success) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, true);
                    }
                });
            }
    };

    userSchema.plugin(mongoosePaginate);

    var User = mongoose.model('User', userSchema);
     
    module.exports = User;
})();