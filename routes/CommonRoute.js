const exppress = require("express");
const router = exppress.Router();

const CommonController = require("../controller/CommonController");
const auth = require("../middlware/auth");




router.get("/data-count",auth,CommonController.data_count);





module.exports = router;