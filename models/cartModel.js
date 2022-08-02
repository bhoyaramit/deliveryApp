const mongoose = require("mongoose");



const cartSchema = mongoose.Schema({

product_id:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true
},
vendor_id:{
    type:String,
    required:true
},
store_id:{
    type:String,
    required:true
}

});


module.exports = mongoose.model("cart",cartSchema);