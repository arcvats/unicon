var mongoose = require('mongoose');
var IdeasSchema = new mongoose.Schema({
    student_id:{
        type: String
    },
    title:{
        type: String
    },
    description:{
        type:String
    },
    tags:[String],
    collaborators:[String]
});

module.exports = mongoose.model('Ideas',IdeasSchema);