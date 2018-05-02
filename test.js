var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');
var Player = require('player');

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

var player = new Player();

// var files = fs.readdirSync("musics");
// for (var i in files){
// 	var name = "musics/" + files[i];
// 	if (!fs.statSync(name).isDirectory()){
// 		player.add(name);
// 	}
// }

// event: on error
player.on('error', function(err){
	console.log("err!! " + err);
	player.stop();
});

// event: on playing
player.on('playing',function(item){
	console.log('im playing... src : ' + item.src);
});

// event: on playend
player.on('playend',function(item){
	// return a playend item
	console.log('src: ' + item.src + ' play done, switching to next one ...');
	player.stop();
});

var router = require('./router/test')(app, fs, player);