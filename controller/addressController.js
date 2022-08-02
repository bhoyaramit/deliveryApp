const addressModel = require("../models/addressModel");


exports.add_address = async(req,res)=>{


    try {

       const data=await addressModel.findOne({user_id:req.body.user_id });
       console.log(data);
       //addAddress.push(req.body.address);


       if (data) {
        
        var addAddress = [];

        for (let i = 0; i<data.address.length; i++) {
            
            addAddress.push(data.address[i]);

        }
        addAddress.push(req.body.address);
const updated_data= await addressModel.findOneAndUpdate(

            {user_id:req.body.user_id},
            {$set:{address:addAddress}},
            {returnDocument:"after"}

            );
            res.status(200).send({success:true,msg:"Address Details",data:updated_data});


        
       } 
       else {
        const address = new addressModel({
            user_id:req.body.user_id,
            address:req.body.address
        });
        const address_data =await address.save();
        res.status(200).send({success:true,msg:"Address Added Successfully",data:address_data});
        
       }



        // const address = new addressModel({
        //     user_id:req.body.user_id,
        //     address:req.body.address
        // });
        // const address_data =await address.save();
        // res.status(200).send({success:true,msg:"Address Added Successfully",data:address_data});
    }
    catch (error) {
        
        res.status(400).send({success:false,msg:error.message});

    }

}