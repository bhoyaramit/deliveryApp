const { FILE } = require("dns");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");


const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/user_Images'),function(error,success){
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

const UserController = require("../controller/userController");


const auth = require("../middlware/auth");

router.post("/",upload.single('image'),UserController.registerUser);
router.post("/login",UserController.user_login);

router.get("/test",auth,function(req,res){
    
    res.status(200).send({success:true,msg:"Authentication"})
});

router.post("/update_password",auth,UserController.update_password);

router.post("/forget_password",auth,UserController.forget_password);

router.post("/reset_password",auth,UserController.reset_password);

router.post("/refresh_token",auth,UserController.refresh_token);

module.exports =router;