module.exports = function(app, fs, Player) 
{
	app.get('/', function(req, res) {
		var lists = getFiles(__dirname+'/../musics');

		var musics = [
			{ artist: 'Bloody Mary', musicname: '3' },
			{ artist: 'Martini', musicname: '5' },
			{ artist: 'Scotch', musicname: '10' }
		];
		res.render('pages/test_index', {
			musics: musics,
			lists: lists,
			Player: Player
		});
	});

	app.get('/buy', function(req, res) {
		res.render('pages/test_buy', {
			
		})
	})

	app.get('/sell', function(req, res) {
		res.render('pages/test_sell', {
			
		})
	})

	function getFiles (dir, files_){
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
