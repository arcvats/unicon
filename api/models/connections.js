var mongoose = require('mongoose');
var ConnectionsSchema = new mongoose.Schema({
    student_id:{
        type: String
    },
    friend_id:{
        type: String
    },
    status:{
        type:String,
        default:'F'
    }
});

module.exports = mongoose.model('Community',CommunitySchema);