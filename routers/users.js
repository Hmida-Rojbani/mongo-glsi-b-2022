const router = require('express').Router();
const {User, validation_user,validation_login } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req,res) => {
    let results = validation_user.validate(req.body);
    if(results.error)
        return res.status(400).send(results.error.details[0].message);
    let user = new User(req.body);
    //hash password
    let salt = await bcrypt.genSalt(10);
    console.log('Salt : ',salt);
    user.password = await bcrypt.hash(user.password, salt);
    console.log('password : ', user.password);
    await user.save();
    res.send('User registed successfully!!!');
});

router.post('/signin', async (req,res) => {
    let results = validation_login.validate(req.body);
    if(results.error)
        return res.status(400).send(results.error.details[0].message);
    let user = await User.findOne({username : req.body.username});
    if(!user)
        return res.status(400).send('Username or password is incorrect');
    let bool = await bcrypt.compare(req.body.password,user.password);
    if(!bool)
        return res.status(400).send('Username or password is incorrect');
    // creation of JWT
    let token = jwt.sign({username : user.username, role: user.role, id : user._id},'jwtSecret',{ expiresIn: '1h' })
    res.header('x-access-token','Bearer '+token).send('User logged in !!!');
   
});

module.exports=router;