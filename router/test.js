module.exports = function(app, fs, player) 
{
	console.log(player.list);
	var files_ = [];
	var lists = getFiles(__dirname + '/../musics/', files_);
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
		player.add(__dirname + "/../musics/"+msg);
		player.play(function(err, player){
			console.log('playend!');
		});
	});

	app.get('/buy', function(req, res) {
		console.log(lists);
		res.render('pages/test_buy', {
			lists: lists
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
