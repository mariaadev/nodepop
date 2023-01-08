const express = require("express");
const router = express.Router();
const Product = require("../models/product");

const { query, validationResult } = require("express-validator/check");


router.get("/", function (req, res, next) {
    res.render("index", { title: "Nodepop" });
});

// GET /api/products/ (all products)
router.get("/products", async (req, res, next) => {

    try {
        const name = req.query.name;
        const onSale = req.query.onSale;
        const price = req.query.price;
        const tags = req.query.tags;

        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const sort = req.query.sort;
        const fields = req.query.fields;


        const filter = {};

        if (typeof name !== "undefined") {
            filter.name = new RegExp("^" + name, "i");
        }

        if (typeof onSale !== "undefined") {
            filter.onSale = onSale;
        }

        if (typeof price !== "undefined") {
            filter.price = filterByPrice(price);
        }

        if (typeof tags !== "undefined") {
            filter.tags = [tags];
            filter.tags = { $in: filter.tags };
        }


        const docs = await Product.list(filter, skip, limit, sort, fields);
        res.locals.Product = docs;
        res.render("index", { title: "Nodepop"});

    } catch (err) {
        next(err);
        return;
    }
});

// GET /api/products/{id} (one product)

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);

        res.json({ result: product });

    } catch (err) {

        next(err);
    }
});

//POST /apiv1/products

router.post('/', async (req, res, next) => {
    try {

        const data = req.body;

        const product = new Product(data);

        const savedProduct = await product.save();

        res.json({ result: savedProduct });

    } catch (err) {
        next(err);
    }
});

//PUT /api/products/{id}

router.put('/:id', async (req, res, next) => {
    try {

        const id = req.params.id;
        const data = req.body;

        const updatedProduct = await Product.findOneAndUpdate({ _id: id }, data, {
            new: true
        });

        res.json({ result: updatedProduct });

    } catch (err) {
        next(err);
    }
});

//DELETE /apiv1/products/{id}

router.delete('/:id', async (req, res, next) => {
    try {

        const id = req.params.id;

        const product = await Product.findById(id);

        if (!product) {
            return next(createError(404));
        }
        await Product.deleteOne({ _id: id });
        res.json();
    } catch (err) {
        next(err);
    }
});


function filterByPrice(price) {
    // x-y ( > x && < y )
    if (/^[0-9]+\-[0-9]+$/.test(price)) {
        return {
            $gte: parseInt(price.split("-")[0]),
            $lte: parseInt(price.split("-")[1])
        };
    }

    // x- ( > x )
    if (/^[0-9]+\-$/.test(price)) {
        return { $gte: parseInt(price.match(/[0-9]+/)) };
    }

    // -y ( < y )
    if (/^-[0-9]+$/.test(price)) {
        return { $lte: parseInt(price.match(/[0-9]+/)) };
    }

    return parseInt(price);
}

module.exports = router;