module.exports = function(app, fs, player) 
{
	var files_ = []
	var img_files_ = []
	var lists = getFiles(__dirname + '/../musics/', files_);
	var img_lists = getFiles(__dirname + '/../public/music_img/', img_files_);
	// var beom = nodeID3.read(lists[0]);
	// var fs = require('fs');

// fs.writeFile('result.jpg', data.image.imageBuffer, 'binary', function(err) {
//   //...
// });
	app.get('/', function(req, res) {
		res.render('pages/test_index', {
			lists: lists
		});
	});

	app.post('/change', function(req, res) {
		var msg = req.body.musicname;
		var tmp = 0;
		console.log('POST 방식으로 서버 호출됨'+ "/change..."+msg);
		for (i in player.list) {
			if (player.list[i] == "musics/"+msg) {
				tmp = i;
				break;
			}
		}
		player.stop()
		player.play(Number(tmp), function(err, player){
			console.log('playend!');
		});
	});

	app.post('/change2', function(req, res) {
		var msg = req.body.controller;
		console.log('POST 방식으로 서버 호출됨'+ "/change2..."+msg);
		if(msg == "back") {
			console.log("sibal")
			player.stop()
		} else if(msg == "play") {
			console.log("sibal")
			player.stop()
		} else if (msg == "next") {
			console.log("sibal")
			player.next()
		}
	});

	app.get('/buy', function(req, res) {
		console.log(lists);
		res.render('pages/test_buy', {
			lists: lists,
			img_lists: img_lists
			// data: beom
		})
	})

	app.get('/sell', function(req, res) {
		res.render('pages/test_sell', {
			
		})
	})

	function getFiles (dir, files_) {
		files_ = files_ || [];
		var files = fs.readdirSync(dir);
		for (var i in files){
			var name = dir + '/' + files[i];
			if (!fs.statSync(name).isDirectory()){
				files_.push(files[i]);
			}
		}
		return files_;
	}
}
