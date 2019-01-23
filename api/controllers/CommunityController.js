var config = require('../../config');
var Community = require('../models/community');
var Student = require('../models/student');

module.exports = {
    all: function (req, res) {
        var student_id = req.decoded.id;
        Student.findOne({ student_id: student_id }, function (err, data) {
            if (err) {
                res.send({ success: false, message: 'No student profile.' });
            } else {
                if (data) {
                    Community.find({ name: { $in: data.tags } }, function (err, response) {
                        if (err) {
                            res.send({ success: false, message: 'No community.' });
                        } else {
                            if (data) {
                                res.send({ success: true, message: 'Communities found', communities: response });
                            } else {
                                res.send({ success: false, message: 'No student profile.' });
                            }
                        }
                    });
                } else {
                    res.send({ success: false, message: 'No student profile.' });
                }
            }
        });
    },
    createMeetup: function (req, res) {
        Community.updateMany({ name: req.body.tag },
            {
                $push: {
                    meetups: {
                        time: req.body.meetup.time,
                        topic: req.body.meetup.topic,
                        description: req.body.meetup.description
                    }
                }
            }, { safe: true, upsert: true, new: true }, function (err, response) {
                if (err) {
                    res.send({ success: false, message: 'Meetup not updated.' });
                } else {
                    res.send({ success: true, message: 'Meetup Created' });
                }
            });
    },
    getAllMeetups:function(req,res){
        Student.findOne({student_id:req.decoded.id},function(err,result){
            if(err){
                res.send({ success: false, message: 'No student.' });
            }else{
                if(result){
                    Community.find({name:{$in:result.tags}},function(err,data){
                        if(err){
                            res.send({ success: false, message: 'Meetup not found.' });
                        }else{
                            if(data){
                                res.send({success:true,message:'Meetups found.',allMeetups:data});
                            }else{
                                res.send({ success: false, message: 'Meetup not found.' });
                            }
                        }
                    });
                }else{
                    res.send({ success: false, message: 'No student.' });
                }
            }
        });
        
    },
    seed:function(req,res){
        if(req.param('secretCode')=='iamarchitsharma93'){
            var tags = [
                {name:'java'},
                {name:'ux'},
                {name:'python'},
                {name:'nodejs'},
                {name:'algorithms'}
            ];
            Community.create(tags,function(err,data){
                if(err){
                    res.send({success:false});
                }else{
                    res.send({success:true});
                }
            })
        }else{
            res.send({success:false});
        }
    }
}