const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./models/product");
const bodyParser = require("body-parser");

mongoose.connect('mongodb://localhost:27017/ads',{useNewUrlParser:true})
.then(() => {
    console.log("Connection done")
})
.catch(err => {
    console.log("Error connecting Mongoose to Mongo")
    console.log(err)
})

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get("/products", (req,res) => {
    console.log("All products");
})

app.listen(port, () => {
    console.log("listening on port 3000")
})

module.exports = app;