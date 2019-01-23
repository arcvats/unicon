var request = require('request');
var User = require('../models/user');
var config = require('../../config');
/**
 * /searchMyBookedRide
 * /searchMyOfferedRide
 * /rideshares/bookRide
 */
module.exports = {
    all: function (req, res) {
        request(config.rideshare_api + '/rideshares/searchAvailableRide', function (err, response, body) {
            res.send(body);
        });
    },
    create:function(req,res){
        request.post({url: config.rideshare_api + '/rideshares',form:req.body},function(err,responseCode,body){
            res.send(body);
        });
    },
    book:function(req,res){
        request.post({url: config.rideshare_api + '/rideshares/bookRide',form:req.body},function(err,responseCode,body){
            res.send(body);
        });
    },
    getOfferedRides:function(req,res){
        var student_id = req.decoded.id;
        User.findOne({_id:student_id},function(err,data){
            if(err){
                res.send({success:false,message:'No user present'});
            }else{
                if(data){
                    request(config.rideshare_api + '/rideshares/searchMyOfferedRide?userId=' + data.email, function (err, response, body) {
                        res.send(body);
                    });
                }else{
                    res.send({success:false,message:'No user present'});
                }
            }
        });
        
    },
    getBookedRides:function(req,res){
        var student_id = req.decoded.id;
        User.findOne({_id:student_id},function(err,data){
            if(err){
                res.send({success:false,message:'No user present'});
            }else{
                if(data){
                    request(config.rideshare_api + '/rideshares/searchMyBookedRide?userId=' + data.email, function (err, response, body) {
                        res.send(body);
                    });
                }else{
                    res.send({success:false,message:'No user present'});
                }
            }
        });
        
    }
}