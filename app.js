const express = require('express');
// to get post request body
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv/config')
const todoRouter = require('./routes/todo')
const app = express();

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use('/todo', todoRouter)

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


// connect to mongoDB
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true,  useUnifiedTopology: true } ,
    ()=> console.log('Connected to db'))

// Listen on port
app.listen(9000);