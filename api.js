const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cursoreact',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
//const UserModel  = require('./src/models/user');
//const ProductModel  = require('./src/models/user');

app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send(getHello());
});

const userRouter = require('./src/routes/user-route');
app.use('/user', userRouter);

const productRouter = require('./src/routes/product-route');
app.use('/product', productRouter);


app.listen(4000, function(){
    console.log('Hello Express Listen on Port 4000');
});