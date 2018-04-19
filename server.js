var Web3 = require('web3');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs");

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


var server = app.listen(8081, function(){
	console.log("Express server has started on port 8081")
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(function (req, res, next) { //1
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'content-type');
	next();
});
app.use(session({
	secret: 'sign',
	resave: false,
	saveUninitialized: true
}));

if (typeof web3 !== 'undefined') {
	console.log("success");
	web3 = new Web3(web3.currentProvider);
} else {
	// set the provider you want from Web3.providers
	console.log("fail");
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
web3.eth.defaultAccount = web3.eth.accounts[0];
var version = web3.version.api;
console.log(version);
var router = require('./router/main')(app, fs);
