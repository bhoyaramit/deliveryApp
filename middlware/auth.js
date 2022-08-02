const jwt =require("jsonwebtoken");
const config = require("../config/config");


const verifyToken = async(req,res,next)=>{


    const token = req.body.token || req.query.token || req.headers["authorization"];

    if (!token) {
        
        res.status(400).send({success:false,msg:"Token Required for authotication"})
    } 
    try {
        
     const descode = jwt.verify(token,config.secret_jwt);
    // return descode;
        res.user = descode;
    } catch (error) {
        res.status(400).send("Token is  Required");

    }
    return next();

}

module.exports = verifyToken;