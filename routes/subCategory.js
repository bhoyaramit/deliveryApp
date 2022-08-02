const exppress = require("express");
const router = exppress.Router();

const subCategoryController = require("../controller/subCategoryController");
const auth = require("../middlware/auth");


router.post("/addsubCategory",auth,subCategoryController.create_subCategory);











module.exports = router;