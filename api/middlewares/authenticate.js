var jwt = require('../helpers/jwt');

module.exports = function(req,res,next){
    var token = req.body.token || req.body.query || req.headers['x-access-token'];
    if(token){
        var verifiedToken = jwt.verify(token);
        if(verifiedToken){
            req.decoded = verifiedToken;
            next();
        }else{
            res.json({success:false,message:'Invalid token',expired:true});
        }  
    }else{
        res.json({success:false,message:'No token provided.'});
    }
}