const mongoose = require("mongoose");
const Product = require("./models/product");
const readline = require('readline');

function askingForConfirmation(text){
    return new Promise((resolve, reject) => {
        const interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        interface.question(text, answer => {  
            interface.close();
            if(answer.toLowerCase() === "yes"){
                resolve(true);
                return;
            }
            resolve(false);
        });
    });
};

async function initProducts(){
    const result = await Product.deleteMany();

    const inserted = await Product.insertMany([{
        name: "Nintendo Switch OLED",
        onSale: true,
        price: 280.50,
        image: "nintendo-switch.jpg",
        tags: ["lifestyle"]
    }, {
        name: "Iphone 14 Pro Max",
        onSale: true,
        price: 980.55,
        image: "iphone-14-pro-max.jpg",
        tags: ["lifestyle","mobile","work"]
    },{
        name: "Apple Magic Keyboard",
        onSale: false,
        price: 76.80,
        image: "keyboard-apple.jpg",
        tags: ["lifestyle","work"]
    },{
        name: "Electric Bike",
        onSale: false,
        price: 340.99,
        image: "electric-bike.jpg",
        tags: ["lifestyle","motor"]
    },
    ])
}

async function main(){
    const confirmed = await askingForConfirmation("Are you sure you want to DELETE all the content from your database? [no] (Type 'yes' to confirm)")
    if(!confirmed){
        process.exit();
    }
    const connection = require("./lib/connectMongoose");
    await initProducts();
    connection.close();
}

