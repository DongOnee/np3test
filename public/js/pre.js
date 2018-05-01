function get_playlist() {
	var files_ = [];
	var files = fs.readdirSync("/musics");
	for (var i in files){
		var name = "/musics/" + files[i];
		if (!fs.statSync(name).isDirectory()){
			files_.push(files[i]);
		}
	}
	return files_;
}

var test = 4;
