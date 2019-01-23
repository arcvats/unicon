var mongoose = require('mongoose');
var CommunitySchema = new mongoose.Schema({
    name:{
        type: String
    },
    members:[{
        id:String,
        name:String,
        department:String,
        course:String
    }],
    meetups:[{
        time:String,
        topic:String,
        description:String
    }]
});

module.exports = mongoose.model('Community',CommunitySchema);