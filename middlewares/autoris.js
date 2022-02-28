
function checkAdmin(req,res,next) {
    
    if(req.user.role != 'admin')
        return res.status(401).send('You don\'t have the right to be here');
    next();
}

module.exports=checkAdmin;