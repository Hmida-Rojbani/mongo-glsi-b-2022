const router = require('express').Router();
const {Course, validation_course,validation_update_course} = require('../models/course');

// add course to DB 
router.post('',async (req,res)=>{
    try {
        let results= validation_course.validate(req.body);
        if(results.error)
            return res.status(400).send(results.error.details[0].message);
        let course = new Course(req.body);
        course = await course.save();
        res.send(course);
    } catch (error) {
        res.status(400).send('Error saving course :',error.message);
    }
    
});

// get All courses
router.get('',async (req,res)=>{
    try {
        let courses = await Course.find();
        res.send(courses)
    } catch (error) {
        res.status(400).send('Error saving course :',error.message);
    }
    
});
// get all course with only title and author
router.get('/title/:t',async (req,res)=>{
    try {
        let courses = await Course.find({title : req.params.t},'title author -_id')
                                    .sort({title : -1, price : 1})
                                    //.limit(1)


        res.send(courses)
    } catch (error) {
        res.status(400).send('Error saving course :',error.message);
    }
    
})

router.get('/price/over/:p',async (req,res)=>{
    try {
        let courses = await Course.find({price : { $gte : req.params.p}})


        res.send(courses)
    } catch (error) {
        res.status(400).send('Error saving course :',error.message);
    }
    
})


router.get('/price/under/:p',async (req,res)=>{
    try {
        let courses = await Course.find({price : { $lte : req.params.p}})


        res.send(courses)
    } catch (error) {
        res.status(400).send('Error saving course :',error.message);
    }
    
})

router.get('/title/in',async (req,res)=>{
    try {
        let courses = await Course.find({isPublished : { $in : [true]}})

        res.send(courses)
    } catch (error) {
        res.status(400).send('Error saving course :',error.message);
    }
    
})

router.get('/title/starts/:prefixe',async (req,res)=>{
    try {
        let courses = await Course.find({title : new RegExp('^'+req.params.prefixe,'i')})

        res.send(courses)
    } catch (error) {
        res.status(400).send('Error saving course :',error.message);
    }
    
})
//update
router.put('/:id',async (req,res)=>{
    try {
        let results= validation_update_course.validate(req.body);
        if(results.error)
            return res.status(400).send(results.error.details[0].message);
        
        await Course.updateOne({_id : req.params.id}, req.body);
        res.send(await Course.findById(req.params.id));
    } catch (error) {
        res.status(400).send('Error updating course :',error.message);
    }
    
});

router.delete('/:id',async (req,res)=>{
    try {
        let course = await Course.findByIdAndRemove(req.params.id);
        if(!course)
            return res.status(404).send('Course with id is not found');
        res.send(course);
    } catch (error) {
        res.status(400).send('Error Deleting course :',error.message);
    }
    
});

module.exports=router;