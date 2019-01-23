var mongoose = require('mongoose');
var ResourcesSchema = new mongoose.Schema({
    name:{
        type: String
    },
    url:String,
    video_link:String
});

module.exports = mongoose.model('Resources',ResourcesSchema);