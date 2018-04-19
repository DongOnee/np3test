var contractAddress = '0xc5244053ecA508a11951400fc7Af28738Fd0ce77';
var abi = [{"constant":false,"inputs":[{"name":"x","type":"uint256"}],"name":"set","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"}];
var simpleStorageContract;
var simpleStorage;

window.addEventListener('load', function() {
	// Checking if Web3 has been injected by the browser (Mist/MetaMask)
	if (typeof web3 !== 'undefined') {
		// Use Mist/MetaMask's provider
		window.web3 = new Web3(web3.currentProvider);
	} else {
		console.log('No web3? You should consider trying MetaMask!')
		// fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
		window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	}
	// Now you can start your app & access web3 freely:
	// startApp();
});

function startApp() {
	simpleStorageContract = web3.eth.contract(abi);
	simpleStorage = simpleStorageContract.at(contractAddress);
	document.getElementById('contractAddr').innerHTML = getLink(contractAddress);
	web3.eth.getAccounts(function(e,r){
		document.getElementById('accountAddr').innerHTML = getLink(r[0]);
	});

	getValue();
}

function getLink(addr) {
	return '<a target="_blank" href=https://testnet.etherscan.io/address/' + addr + '>' + addr +'</a>';
}

function getValue() {
	simpleStorage.get(function(e,r){
		document.getElementById('storedData').innerHTML=r.toNumber();
	});
	web3.eth.getBlockNumber(function(e,r){
		document.getElementById('lastBlock').innerHTML = r;
	});
}

function setValue() {
	var newValue = document.getElementById('newValue').value;
	var txid
	simpleStorage.set(newValue, function(e,r){
		document.getElementById('result').innerHTML = 'Transaction id: ' + r + '<span id="pending" style="color:red;">(Pending)</span>';
		txid = r;
	});
	var filter = web3.eth.filter('latest');
	filter.watch(function(e, r) {
		getValue();
		web3.eth.getTransaction(txid, function(e,r){
			if (r != null && r.blockNumber > 0) {
				document.getElementById('pending').innerHTML = '(기록된 블록: ' + r.blockNumber + ')';
				document.getElementById('pending').style.cssText ='color:green;';
				document.getElementById('storedData').style.cssText ='color:green; font-size:300%;';
				filter.stopWatching();
			}
		});
	});
}

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