const exppress = require("express");
const router = exppress.Router();

const cartController = require("../controller/cartController");
const auth = require("../middlware/auth");




router.post("/add-to-cart",auth,cartController.add_to_cart);





module.exports = router;