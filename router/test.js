module.exports = function(app, fs, player) 
{
	console.log(player.list);
	var files_ = [];
	var img_files_ = [];
	var lists = getFiles(__dirname + '/../musics/', files_);
	var img_lists = getFiles(__dirname + '/../img/', img_files_);
	// var beom = nodeID3.read(lists[0]);
	// var fs = require('fs');

// fs.writeFile('result.jpg', data.image.imageBuffer, 'binary', function(err) {
//   //...
// });
	app.get('/', function(req, res) {
		res.render('pages/test_index', {
			player: player,
			lists: lists
		});
	});

	app.post('/change', function(req, res) {
		console.log('POST 방식으로 서버 호출됨');
		var msg = req.body.email;
		console.log(msg);
		player.play();
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
