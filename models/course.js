const mongoose = require('mongoose');
const Joi = require('joi');

let course_schema = new mongoose.Schema({
    title : String,
    author : String,
    tags : [String],
    date: {
        type: Date,
        default: Date.now()
    },
    isPublished: Boolean,
    price: Number,
});

let validation_course = Joi.object({
    title : Joi.string().alphanum().required(),
    author: Joi.string().min(3).required(),
    tags : Joi.array().items(Joi.string()).required(),
    date : Joi.date(),
    isPublished : Joi.boolean(),
    price : Joi.number().positive()
});

let validation_update_course = Joi.object({
    title : Joi.string().alphanum(),
    author: Joi.string().min(3),
    tags : Joi.array().items(Joi.string()),
    date : Joi.date(),
    isPublished : Joi.boolean(),
    price : Joi.number().positive()
});

let Course = mongoose.model('Course',course_schema);

module.exports.Course = Course;
module.exports.validation_course = validation_course;
module.exports.validation_update_course = validation_update_course;