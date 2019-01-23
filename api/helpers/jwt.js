var jwt = require('jsonwebtoken');
var config = require('../../config');

module.exports = {
    sign: function (userEmail,_id) {
        var token = jwt.sign({ email: userEmail,id:_id }, config.secret, { expiresIn: '2h' });
        return token;
    },
    verify:function(token){
        var decodedToken = {};
        jwt.verify(token,config.secret,function(err,decoded){
            if(err){
                decodedToken = false;
            }else{
                decodedToken = decoded;
            }
        });
        return decodedToken;
    }
}