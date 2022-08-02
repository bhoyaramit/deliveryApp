const exppress = require("express");

const router = exppress.Router();
const multer = require("multer");
const path = require("path");



const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/storeImages'),function(error,success){
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

const auth = require("../middlware/auth");
const storeController = require("../controller/storeController");

router.post("/create-store",auth,upload.single('logo'),storeController.create_store);
router.post("/find-nearest-store",auth,storeController.find_store);




module.exports = router;