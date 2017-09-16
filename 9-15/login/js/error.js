let time = document.getElementById('time');
let t = setInterval(function(){
	if(time.innerText <= 0){
		clearInterval(t);
		location.replace('index.html');
	}
	time.innerText -= 1;
}, 1000);