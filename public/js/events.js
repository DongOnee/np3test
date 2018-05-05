var x = document.getElementsByClassName("lists")
for(var i = 0; i < x.length; i++) {
	x[i].addEventListener('click', function(){
		console.log("click");
		// sendAjax 함수를 만들고 URL과 data를 전달
		sendAjax('http://localhost:8081/change', this.id);
	});
}
function sendAjax(url, control){
// 입력값을 변수에 담고 문자열 형태로 변환
	var msg = {'musics' : control};
	msg = JSON.stringify(msg);

	// content-type을 설정하고 데이터 송신
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url);
	xhr.setRequestHeader('Content-type', "application/json");
	xhr.send(msg);
	
	// 데이터 수신이 완료되면 표시
	xhr.addEventListener('load', function(){
		console.log(xhr.responseText);
	});
}