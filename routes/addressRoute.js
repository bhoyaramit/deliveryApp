const exppress = require("express");
const router = exppress.Router();

const addressController = require("../controller/addressController");
const auth = require("../middlware/auth");




router.post("/add-address",auth,addressController.add_address);





module.exports = router;