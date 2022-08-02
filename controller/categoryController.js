const categoryModel = require("../models/categoryModel");


exports.AddCategory = async (req, res) => {

    try {

        const category_data = await categoryModel.find();
        if (category_data.length > 0) {
            let checking = false;


            for (let i = 0; i < category_data.length; i++) {

                if (category_data[i]['category'].toLowerCase() === req.body.category.toLowerCase()) {

                    checking = true;
                    break;
                }

            }
            console.log(checking);

            if (checking == false) {

                const category = new categoryModel({
                    category: req.body.category
                });
                const cat_data = await category.save();
                res.status(200).send({ success:true, msg:"Category Added Successfully", data: cat_data })

            }
            else {
                res.status(200).send({ success:true, msg:"This Category (" + req.body.category + ") Alredy Exists" });

            }

        }

        else {
            const category = new categoryModel({
                category: req.body.category
            });
            const cat_data = await category.save();
            res.status(200).send({ success: true, msg: "Category Added Successfully", data: cat_data })
        }

    } catch (error) {
        res.status(400).send({ success:false, msg:error.message })

    }
}

exports.get_categories = async()=>{

    try {
            return categoryModel.find();

    } catch (error) {
        res.status(400).send({success:false,msg:error.message});

    }
}