var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');
var Player = require('player');
var nodeID3 = require('node-id3');

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

var files = fs.readdirSync("musics");
// console.log("files : " + files);

// var name = "musics/" + files[2];
// 	var data = nodeID3.read(name);

// 	console.log(data);
for (var i in files){
	var name = "musics/" + files[i];
	// var data = nodeID3.read(name);
	
	// console.log("data : " + data);
	if(name.includes("mp3")) {
		// console.log(name + " img create!");
		
		var data = nodeID3.read(name);
		var temp = name.split("/");
		var img_name = temp[1].split(".");
		var img_name_ = img_name[0].split(" ");

		fs.writeFile("./public/music_img/"+img_name_[0]+ img_name_[1] +'.jpg', data.image.imageBuffer, 'binary', function(err) {
			//...
		});
		player.add(name);
	}
}
// event: on playing
player.on('playing',function(item){
	console.log('I\'m playing... name : ' + item._name);
});

// event: on playend
player.on('playend',function(item){
	// return a playend item
	console.log('src: ' + item.src + ' play done, switching to next one ...');
});

// event: on error
player.on('error', function(err){
	console.log("err!! " + err);
});
player.enable('stream')

var router = require('./router/test')(app, fs, player);
