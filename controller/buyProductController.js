const buyProductModel = require("../models/buyProductModel");



exports.buy_product = async(req,res)=>{

    try {

        const buyProduct= new buyProductModel({
           
            product_id:req.body.product_id,
            transection_id:req.body.transection_id,
            vendor_id:req.body.vendor_id,
            store_id:req.body.store_id,
            customer_id:req.body.customer_id

    
        });

        const buy_product_data =await buyProduct.save();
        res.status(200).send({success:true,msg:"Buy Product Detail",data:buy_product_data});

        
    } 
    catch (error) {

        res.status(400).send({success:false,msg:error.message});

    }

}
