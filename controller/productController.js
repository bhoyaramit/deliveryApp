const productModel = require("../models/productModel");
const categoryController = require("../controller/categoryController");

const storeController = require("../controller/storeController");


exports.add_product = async (req, res) => {

    try {
        var arrImages = [];
        for (let i = 0; i < req.files.length; i++) {

            arrImages[i] = req.files[i].filename;
        }

        var product = new productModel({

            vendor_id: req.body.vendor_id,
            store_id: req.body.store_id,
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            category_id: req.body.category_id,
            sub_cat_id: req.body.sub_cat_id,
            images: arrImages
        });

        const product_data = await product.save();
        res.status(200).send({ success: true, msg: "Product Details", data: product_data });





    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}






exports.get_product = async (req, res) => {

    try {

        var send_data = [];
        var cat_data = await categoryController.get_categories();
        // console.log(cat_data);


        if (cat_data.length > 0) {

            for (let i = 0; i < cat_data.length; i++) {

                var product_data = [];
                var cat_id = cat_data[i]['_id'].toString();
                var cat_pro = await productModel.find({ category_id: cat_id });

                console.log(cat_id);
                //console.log(cat_pro);


                if (cat_pro.length > 0) {

                    for (let j = 0; j < cat_pro.length; j++) {

                        var store_data = await storeController.get_store(cat_pro[j]['store_id']);
                        product_data.push({

                            "product_name": cat_pro[j]['name'],
                            "images": cat_pro[j]['images'],
                            "store_address": store_data['address'],

                        }
                        );
                    }

                }


                send_data.push({

                    "Category": cat_data[i]["category"],
                    "product": product_data

                });



            }

            res.status(200).send({ success: true, msg: "Product Details", data: send_data });
        }


        else {
            res.status(200).send({ success: false, msg: "Product Details", data: send_data });

        }

    }

    catch (error) {

        res.status(400).send({ success: false, msg: error.message });
    }



}


// Search product //

exports.search_product = async(req,res)=>{

try {
    
    var search = req.body.search;

  var product_data= await productModel.find({
    
    "name":{$regex:".*"+search+".*",$options:'i'}
    
    
    });
    console.log(product_data);

  if (product_data.length >0) {

    res.status(200).send({ success: true, msg:"Product Details",data:product_data });

    
  } else {
    res.status(200).send({ success: false, msg:"product not found !" });

  }
} catch (error) {
   
    res.status(400).send({ success: false, msg: error.message });

}

}

// Search product //


// send data with pagination and sorted form //

exports.paginate = async(req,res)=>{
    try {
        var page = req.body.page;
        var sort = req.body.sort;

        var new_product_data;
        var skip;

    if (page <= 1) {
        skip=0;
        }
    else{
    skip = (page-1)*2;
    }

       if (sort) {

        var customesort;

        if (sort == 'name') {

            customesort = {
                name:1
            }
        }
        else if (sort == '_id') {
            customesort = {
                _id:1
            }
            
        }
        

        //const  new_product_data = await productModel.find().sort({name:1}).skip(skip).limit(2);
         new_product_data = await productModel.find().sort(customesort).skip(skip).limit(2);

       } 
       else {
      
        new_product_data = await productModel.find().skip(skip).limit(2);
     
       }
        
    res.status(200).send({success:true,msg:"Product Details",data:new_product_data});
    console.log(new_product_data);

    } 
    catch (error) {
        
        res.status(400).send({ success: false, msg: error.message });

    }
}


// send data with pagination and sorted form //