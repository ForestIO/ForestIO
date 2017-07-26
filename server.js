//initialize
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//controllers
const branchController = require('./../data/branchController');
const treeController = require('./../data/treeController');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

console.log('is this working?')
app.get('/trees',(req, res) =>{
    console.log('got request')
    res.send('HELLOO')
})

app.listen(3030);
