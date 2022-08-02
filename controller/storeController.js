const storeModel = require("../models/storeModel");
const UserModel = require("../models/userModel");

exports.create_store = async(req,res)=>{

    try {
    const UserData = await  UserModel.findOne({_id:req.body.vendor_id});

    if (UserData) {
        if (!req.body.latitude || !req.body.longitude) {

            res.status(200).send({success:true,msg:"Location (Lat and Long) Is not found"});

            
        }
        else{
          
            const Vendordata = await storeModel.findOne({vendor_id:req.body.vendor_id});
            if (Vendordata) {
                
                res.status(200).send({success:false,msg:"This Vendor is already created in store"});

            } else {
              const store = new storeModel({

                vendor_id:req.body.vendor_id,
                logo:req.file.filename,
                bussiness_email:req.body.bussiness_email,
                address:req.body.address,
                pin:req.body.pin,
                location:{

                    type:"Point",
         coordinates:[parseFloat(req.body.longitude),parseFloat(req.body.latitude)],

                },


                });
            
                const storeData = await store.save();
                res.status(200).send({success:true,msg:"store Data ",data:storeData});

                
            }
        }
        
    } else {
        res.status(400).send({success:false,msg:"Vendor ID does not exits....."});

        
    }
        
    } catch (error) {
    
        res.status(400).send({success:false,msg:error.message})

    }

}


exports.get_store = async(id)=>{

    try {
            return storeModel.findOne({_id:id});
            
    } catch (error) {
        res.status(400).send({success:false,msg:error.message});

    }
}



// Find nearest store

exports.find_store =  async(req,res)=>{
try {
    
    const latitude = req.body.latitude;
    const longitude = req.body.longitude

  const store_data = await storeModel.aggregate([
        {
         $geoNear:{
                
            near:{type:"Point",coordinates:[parseFloat(longitude),parseFloat(latitude)]},
            key:"location",
            maxDistance:parseFloat(1000)*1609,
            distanceField:"dist.calculated",
            spherical:true
        }
        }
    ]);

    res.status(200).send({success:true,msg:"Store Details",data:store_data});




} catch (error) {

    res.status(400).send({success:false,msg:error.message});

    
}
}

// Find nearest store
