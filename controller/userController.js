const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const res =require("express/lib/response");
const fs = require("fs");


const sendresetPassword = async(name , email, token)=>{

    try {

     const transporter =  nodemailer.createTransport({
            host :'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:config.emailUser,
                pass:config.emailPassword
            }
        });

        const mailOption = {
            from : config.emailUser,
            to:email,
            subject:"For reset Password",
            html:'<p> hii '+name+',please copy the link And <a href="http://localhost:8000/user_register/reset_password?token='+token+'"> reset your password </a>'

        }

        transporter.sendMail(mailOption,function(error,info){

            if (error) {
                console.log(error);
            }
            else{
                console.log("Mail has been send ", info.response);
            }
        })
        
    } catch (error) {
     
        res.status(400).send({success:true,msg:error.message})
    }
}


const create_token = async(id)=>{

    try {
    
    const token= await jwt.sign({_id:id},config.secret_jwt);
    return token;



    } catch (error) {

        console.log(error);
    }
}


const securePassword = async (password) => {
    try {

        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;

    } catch (error) {
        console.log(error);
    }
}

exports.registerUser = async (req, res) => {
    try {

        const spassword = await securePassword(req.body.password);

        const SaveUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: spassword,
            image: req.file.filename,
            mobile: req.body.mobile,
            type: req.body.type,
        });

        const Savebefore = await UserModel.findOne({ email: req.body.email })
        if (Savebefore) {
            res.status(400).send({ success: false, msg: "User alredy Exited" });


        } else {
            const UserData = await SaveUser.save();
            res.status(201).send({ success: true, msg: "User successfully Added", data: UserData });
            console.log(UserData);

        }



    } catch (error) {
        console.log(error);

    }


}

exports.user_login =async(req,res)=>{
    try {

        const email = req.body.email;
        const password = req.body.password;

      const User_Data = await UserModel.findOne({email:email});

      
      if (User_Data) {

        const passwordMatch = await bcrypt.compare(password,User_Data.password);
     
    if (passwordMatch) {

        const tokenData = await create_token(User_Data._id);
        const userResult = {

            _id:User_Data._id,
            name:User_Data.name,
            email:User_Data.email,
            password:User_Data.password,
            image:User_Data.image,
            mobile:User_Data.mobile,
            type:User_Data.type,
            token:tokenData
        }
        const response = {
            success:true,
            msg:"User Details",
            data:userResult
        }
    res.status(200).send(response);

        
    } else {

        res.status(400).send({success:false,msg:"Login Details Failed"})

        
    }
    
    
    
    
    }
       
      else {
        res.status(400).send({success:false,msg:"Login Details Failed"})
        
      }
        
    } catch (error) {
        console.log(error);

        
    }
}

// Update password //

exports.update_password = async(req,res)=>{
    try {
        
        const user_id = req.body.user_id;
        const password  = req.body.password;
        const data = await UserModel.findOne({_id:user_id});

        if (data) {

            const newPassword = await securePassword(password);

            UserModel.findByIdAndUpdate({_id:user_id},{$set:{
                password:newPassword
            }});
            
            res.status(200).send({success:true,msg:"Your password has Updated"});

        } else {
            
            res.status(200).send({success:false,msg:"User Id not Found"})
        }
    } catch (error) {
        
    }
}

// Update password //

// Forget password //

exports.forget_password = async(req,res)=>{

    try {

        const email = req.body.email;
        const userData=  await UserModel.findOne({email:email});

        if (userData) {
            
     const randomString = randomstring.generate();
     const data = await  UserModel.updateOne({email:email},{$set:{token:randomString } });
     sendresetPassword(userData.name,userData.email,randomString);

     res.status(200).send({success:true,msg:"please check your email"});
   
    } else {
            res.status(200).send({success:true,msg:"User Doesn't Exited"})

            
        }

        
    } 
    catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
}


// Forget password //


// Reset password //
exports.reset_password = async(req,res)=>{
    try {
        
        const token =  req.query.token;
    const tokenData = await UserModel.findOne({token:token});

    if (tokenData) {


        
        const password = req.body.password;
        const newPassword = await securePassword(password);
    const userData = await UserModel.findByIdAndUpdate({_id:tokenData._id},{$set:{password:newPassword,token:''}},{new:true})
    res.status(200).send({success:true,msg:"User Password has been Reset....",data:userData});



} else {
                res.status(200).send({success:false,msg:"This link has been expired...."})

    }


    } catch (error) {
        res.status(400).send({success:false,msg:error.message})

        
    }
}


// Reset password //


// renew Token //

exports.renew_token = async(id)=>{

    try {

const secret_jwt = config.secret_jwt;
const newSewcretJwt = randomstring.generate();
        
fs.readFile('config/config.js','utf-8',function(err,data){

    if (err)throw err;

   var  newValue = data.replace(new RegExp(secret_jwt,"g"),newSewcretJwt);
   fs.writeFile('config/config.js',newValue,'utf-8',function(err,data){
   // console.log(newValue);

    if (err)throw err;
    console.log("Done!");

   });
   
});
        //,{expiresIn:2}
        // const token= await jwt.sign({ _id:id },config.secret_jwt);
        const token= await jwt.sign({ _id:id },newSewcretJwt);

        return token;
    
    } catch (error) {
       
        res.status(400).send({success:false,msg:error.message})
        
    }
}

// renew Token //


// Refresh Token //

exports.refresh_token = async(req,res)=>{
    try {

    const user_id = req.body.user_id;
    const userData = await UserModel.findById({_id:user_id});
       //console.log(userData); 
if (userData) {
      // console.log(userData); 

    //const tokenData = await renew_token({user_id:user_id});
   //const tokenData = await renew_token(id);
   const tokenData = await this.renew_token(user_id);

   console.log(tokenData);
      
   const response = {

        user_id :user_id,
        token:tokenData
      } 
      res.status(200).send({success:true,msg:"Refresh Token Details",data:response});

    
} else {

    res.status(400).send({success:false,msg:"User Not Found"});

    
}

    } catch (error) {
     
        res.status(400).send({success:false,msg:error.message})

    }
}

// Refresh Token //
