const productModel = require("../models/productModel");
const UserModel = require("../models/userModel");
const categoryModel = require("../models/categoryModel");
const subCategoryModel = require("../models/subCategoryModel");
const storeModel = require("../models/storeModel");



exports.data_count = async(req,res)=>{

try {


    const count_data = [];
    const product_data = await productModel.find().count();
    const vendor_data = await UserModel.find().count();
    const category_data = await categoryModel.find().count();
    const sub_cat_data = await subCategoryModel.find().count();
    const store_data = await storeModel.find().count();

console.log(product_data);
console.log(vendor_data);
console.log(category_data);
console.log(sub_cat_data);

count_data.push({
    product:product_data,
    vendor:vendor_data,
    category:category_data,
    sub_cat:sub_cat_data,
    store:store_data,

});

    res.status(200).send({success:true,msg:"Counting Data Details",data:count_data});

    
} catch (error) {

    res.status(400).send({success:false,msg:error.message});

    
}


}