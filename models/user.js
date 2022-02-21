const mongoose = require('mongoose');
const Joi = require('joi');

let user_schema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
    },
    email : {
        type : String,
        require : true,
        unique: true
    },
    password : {
        type : String,
        require : true,
    }
});

let validation_user = Joi.object({
    name : Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required,

    repeat_password: Joi.ref('password')
});

let validation_update_user = Joi.object({
    name : Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required,
    repeat_password: Joi.ref('password')
});

let User = mongoose.model('User',user_schema);

module.exports.User = User;
module.exports.validation_user = validation_user;
module.exports.validation_update_user = validation_update_user;