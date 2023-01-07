const mongoose = require("mongoose");
const Product = require("./models/product")

const products = [{
    name: "Nintendo Switch OLED",
    onSale: true,
    price: 280.50,
    image: "",
    tags: ["lifestyle"]
}, {
    name: "Iphone 14 Pro Max",
    onSale: true,
    price: 980.55,
    image: "",
    tags: ["lifestyle","mobile","work"]
},{
    name: "Apple Magic Keyboard",
    onSale: false,
    price: 76.80,
    image: "",
    tags: ["lifestyle","work"]
},{
    name: "Electronic Bike",
    onSale: false,
    price: 340.99,
    image: "",
    tags: ["lifestyle","motor"]
},
]
Product.insertMany(products)
.then(res => {console.log(res)})
.catch(err => {console.log(err)})