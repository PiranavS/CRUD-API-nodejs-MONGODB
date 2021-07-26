const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
require('dotenv/config');
//Routes
const postroute = require('./routes/post');

app.use(express.json());
app.use('/posts',postroute)

app.get('/', (req,res)=>{
    res.send('We are on home');
});



mongoose.connect(process.env.db_connection,{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true, },()=>console.log("Connected to Database!"));

app.listen(3000);
