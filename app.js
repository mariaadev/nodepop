const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

const indexRouter = require('./routes/index');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use("/", require("./routes/index"));

//API V1
app.use('/apiv1/products', require('./routes/apiv1/products'));

//Catch error
app.use(function (req, res, next) {
    next(createError(404));
});

//Handle error
app.use(function (err, req, res, next) {
    //Check validation error
    if (err.array) {
        err.status = 422;
        const errorInfo = err.array({ onlyFirstError: true })[0];
        err.message = `Error in ${errorInfo.location}, param "${errorInfo.param}" ${errorInfo.msg}`
    }

    res.status(err.status || 500);
    
    //If is api request , response error with json
    if (req.originalUrl.startsWith('/apiv1/')) {
        res.json({ error: err.message });
        return;
    }

    //set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.render('error');
});

module.exports = app;