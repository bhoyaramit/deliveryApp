const exppress = require("express");
const router = exppress.Router();

const productController = require("../controller/productController");
const auth = require("../middlware/auth");


const multer = require("multer");
const path = require("path");


const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/product_images'),function(error,success){
            if (error)throw error 


        });

    },
    filename:function(req,file,cb){

       const name= Date.now()+'-'+file.originalname;
        cb(null,name,function(error1,success1){
            if (error1)throw error1 
        })
    }
});

const upload = multer({
    storage:storage
});


router.post("/add-product",upload.array('images'),auth,productController.add_product);
router.get("/get-product",auth,productController.get_product);
router.get("/search-product",auth,productController.search_product);

router.post("/paginate",auth,productController.paginate);









module.exports = router;