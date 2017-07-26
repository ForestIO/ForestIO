//initialize
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//controllers
const treeController = require('./../data/controllers/treeController');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/trees', (req, res) => {
    treeController.getAllTrees(req, res);
})

app.listen(3030);
