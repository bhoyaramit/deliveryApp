const exppress = require("express");
const router = exppress.Router();

const CategoryController = require("../controller/categoryController");
const auth = require("../middlware/auth");


router.post("/addcategory",auth,CategoryController.AddCategory);











module.exports = router;