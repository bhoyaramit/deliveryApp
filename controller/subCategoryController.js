const subCategoryModel = require("../models/subCategoryModel");


exports.create_subCategory =  async(req,res)=>{

    try {
        
        const check_sub = await subCategoryModel.find({category_id:req.body.category_id});
if (check_sub.length > 0) {

    let checking = false;


    for (let i = 0; i < check_sub.length; i++) {

        if (check_sub[i]['sub_category'].toLowerCase() === req.body.sub_category.toLowerCase()) {

            checking = true;
            break;
        }

    }
    console.log(checking);
    if (checking == false) {

        const subCategory = new subCategoryModel({
            category_id:req.body.category_id,
            sub_category:req.body.sub_category,     
        
        });
        const sub_cat_data = await subCategory.save();
        res.status(200).send({ success:true, msg:"Category Added Successfully", data: sub_cat_data })

    }
    else {
        res.status(200).send({ success:true, msg:"This SubCategory (" + req.body.sub_category + ") Alredy Exists" });

    }

}

 else {
    const sub_category = new subCategoryModel({

        category_id:req.body.category_id,
        sub_category:req.body.sub_category,
    });

    const sub_cat_data = await sub_category.save();
    res.status(200).send({success:true,msg:"SubCategory Added Successfully",data:sub_cat_data});
    
    
}


       
    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
        
    }

}


exports.get_subcategories = async(req,res)=>{

    try {
            return subCategoryModel.find();
            
    } catch (error) {
        res.status(400).send({success:false,msg:error.message});

    }
}