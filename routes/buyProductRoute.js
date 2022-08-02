const exppress = require("express");
const router = exppress.Router();

const buyProductController = require("../controller/buyProductController");
const auth = require("../middlware/auth");



router.post("/buy-product",auth,buyProductController.buy_product);




module.exports = router;