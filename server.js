const express = require("express");
const app =express();
const bodyParser = require("body-parser");
const path = require("path");

require("./db");
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


app.use("/user_register", require("./routes/userRoute"));
app.use("/store",require("./routes/storeRoute"));
app.use("/category",require("./routes/categoryRoute"));
app.use("/subcategory",require("./routes/subCategory"));
app.use("/product",require("./routes/productRoute"));
app.use("/cart",require("./routes/cartRoute"));
app.use("/address",require("./routes/addressRoute"));
app.use("/buyproduct",require("./routes/buyProductRoute"));

// common Route // 
app.use("/common-route",require("./routes/CommonRoute"));

//common Route //



















app.listen(port ,()=>{
    console.log(`connection is successful`);
});