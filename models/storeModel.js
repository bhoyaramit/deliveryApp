const mongoose = require("mongoose");


const StoreSchema = mongoose.Schema({

    vendor_id:{
        type:String
    },
    logo:{
        type:String
    },
    bussiness_email:{
        type:String
    },
    address:{
        type:String
    },
    pin:{
        type:String
    },
    location:{
        type:{type:String,required:true},
        coordinates:[]

    },


});

StoreSchema.index({location:"2dsphere"});
module.exports = mongoose.model("store",StoreSchema);