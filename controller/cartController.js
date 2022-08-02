const cartModel = require("../models/cartModel");



exports.add_to_cart =async(req,res)=>{
try {

    const add_cart  = new cartModel({

        product_id:req.body.product_id,
        price:req.body.price,
        vendor_id:req.body.vendor_id,
        store_id:req.body.store_id

    });
console.log(add_cart);
    const cart_data =await add_cart.save();
    console.log(cart_data);

    res.status(200).send({success:true,msg:"Cart Product Details",data:cart_data});

    
} catch (error) {
    res.status(400).send({success:false,msg:error.message});

}



}