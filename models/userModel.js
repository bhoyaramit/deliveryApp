const mongoose = require("mongoose");



const UserSchema= mongoose.Schema({

name:{
    type:String,
    required:true
},
email:{
    type:String
},
password:{
    type:String,
    required:true
},
image:{

    type:String
},
mobile:{
    type:String
},
type:{
    type:Number
},
token:{
    type:String,
    default:""
}

});



module.exports = mongoose.model("Users",UserSchema);