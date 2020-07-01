const express = require('express');
// to get post request body
const bodyParser = require('body-parser')


const app = express();

app.use(bodyParser.urlencoded({
    extended:true
}));

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
let idCount = 3
let data = [{id:1, Subject: "aaa", Description: "bbb"},{id: 2, Subject: "ccc", Description: "ddd"} ]
// Routes
app.get('/getAll', (req, res)=>{
    res.status(200).send(data)
});

app.get('/delete', (req, res)=>{
    data = data.filter(item => item.id !== parseInt(req.query.id))
    res.status(200)
})

app.post('/add', (req, res)=>{
    data.unshift({id: idCount, Subject: req.body.Subject, Description: req.body.Description})
    idCount++
    res.status(200)
})

app.post('/editDescription', (req, res)=>{
    console.log(req.body)
    data = data.map(item => {
        if(item.id === parseInt(req.body.id))
            item.Description = req.body.Description
        return item
        })
})

// Listen on port
app.listen(9000);