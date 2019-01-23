var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var UserSchema = new mongoose.Schema({
    email:{
        type:String,
        lowercase:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required: true,
        default:'student'
    },
    is_active:{
        type: Boolean,
        required: true,
        default: true
    }
});

UserSchema.pre('save',function(next){
    var self = this;
    bcrypt.hash(self.password,10,function(err,hash){
        if(err) return next(err);
        self.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password);
};

module.exports = mongoose.model('User',UserSchema);