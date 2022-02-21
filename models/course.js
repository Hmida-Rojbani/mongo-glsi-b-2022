const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)


let course_schema = new mongoose.Schema({
    title : {
        type : String,
        unique : true,
        minlength : 5,
        required : true
    },
    author : {
        name : String,
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Author'
        }
    },
    tags : {
        type :[String],
        validate : {
            validator : function (v) {
                return v && v.length > 2;
            },
            message : 'A course must have at least two tags'
        }
    },
    date: {
        type: Date,
        default: Date.now()
    },
    isPublished: Boolean,
    price: {
        type : Number,
        min : 10,
        max : 2500,
        required: function () {
            return this.isPublished
        }
    }
});

let validation_course = Joi.object({
    title : Joi.string().alphanum().min(5).required(),
    author: Joi.objectId().required(),
    tags : Joi.array().items(Joi.string()).required(),
    date : Joi.date(),
    isPublished : Joi.boolean(),
    price : Joi.number().positive()
});

let validation_update_course = Joi.object({
    title : Joi.string().alphanum().min(5),
    author: Joi.objectId(),
    tags : Joi.array().items(Joi.string()),
    date : Joi.date(),
    isPublished : Joi.boolean(),
    price : Joi.number().positive()
});

let Course = mongoose.model('Course',course_schema);

module.exports.Course = Course;
module.exports.validation_course = validation_course;
module.exports.validation_update_course = validation_update_course;