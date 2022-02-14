const router = require('express').Router();
const {Course} = require('../models/course');

// add course to DB 
router.post('',async (req,res)=>{
    try {
        let course = new Course(req.body);
        course = await course.save();
        res.send(course);
    } catch (error) {
        console.log('Error saving course :',error.message);
    }
    
});


module.exports=router;