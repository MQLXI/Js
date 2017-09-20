window.onload = function(){

	banner(4000);
}
function banner(speed=4000){
	let btns = document.getElementsByClassName('banner_point')[0];
	let lis = btns.getElementsByTagName('li');
	let img_box = document.getElementsByClassName('banner_imgbox')[0];
	let img_lis = img_box.getElementsByTagName('li');
	let now = 0;
	for(let j = 0; j < img_lis.length; j++){
		btns.innerHTML += '<li></li>';
		img_lis[j].style.transition = 'all 0.5s';
	}
	lis[now].className = 'on';
	let timer = setInterval(fn,speed);
	for(let i = 0; i < lis.length; i++){
		lis[i].onmouseover = function(){
			img_lis[now].style.display = 'none';
			lis[now].className = '';
			img_lis[i].style.display = 'block';
			this.className = 'on';
			now = i;
		}
		img_lis[i].onmouseover = function(){
			clearInterval(timer);
		}
		img_lis[i].onmouseout = function(){
			timer = setInterval(fn,speed);
		}
	}
	function fn(){
		
		img_lis[now].style.display = 'none';
		lis[now].className = '';
		if(now >=img_lis.length-1)
			now = -1;
		img_lis[++now].style.display = 'block';
		lis[now].className = 'on';
	}
}