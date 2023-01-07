const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    onSale: {
        type: Boolean,
        required: true
    }, 
    price: {
        type:String,
        required: true,
        min: 0
    },
    image: {
        type:String
    },
    tags: {
        type: [String],
        required: true
    }

})

productSchema.statics.list = function(filter, skip, limit, fields, sort) {
    const query = Ads.find(fields); 
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort);
    return query.exec() 
  }
  
const Product = mongoose.model("Product", productSchema);

module.exports = Product;