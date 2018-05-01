module.exports = function(app, fs, player) 
{
	console.log(player.list);
	app.get('/', function(req, res) {
		res.render('pages/test_index', {
			player: player
		});
	});

	app.post('/', function(req, res, next) {
		console.log('POST 방식으로 서버 호출됨');
		var msg = req.body.msg;
		msg = '[에코]' + msg;
		res.send({result:true, msg:msg});
	});

	app.get('/buy', function(req, res) {
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
