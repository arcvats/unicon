var mongoose = require('mongoose');
var StudentSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    department:{
        type: String
    },
    college:{
        type: String
    },
    student_id:{
        type:String
    },
    course:{
        type:String
    },
    tags:[String],
    requested_collaboration:[String],
    collaborating_on:[String],
    collaboration_count:Number
});

module.exports = mongoose.model('Student',StudentSchema);