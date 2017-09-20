clickTurn();
function clickTurn(){
	let moveUl = document.querySelectorAll('#moveUl');
	let moveUl_len = $('li', $('#moveUl')).length;
	let turn_left = document.querySelectorAll("#direction_left");
	let turn_right = document.querySelectorAll("#direction_right");
	let pos = [0, 0, 0, 0];
	for(let i = 0; i < turn_left.length; i++) {
		turn_left[i].onclick = function(){
			pos[i] = pos[i] < 0 ? pos[i] += 296 : pos[i];
			moveUl[i].style.transform = `translateX(${pos[i]}px)`;
		}
	}
	for(let i = 0; i < turn_right.length; i++) {
		// let moveUl_len = Math.floor(moveUl[i].childNodes.length/2);
		let moveUl_len = moveUl[i].getElementsByTagName('li').length;
		turn_right[i].onclick = function(){
			pos[i] = pos[i] > -296 * (moveUl_len - 1) ? pos[i] -= 296 : pos[i];
			moveUl[i].style.transform = `translateX(${pos[i]}px)`;
		}
	}
}
////////////////////////////////////////////////////////////////////////
banner(3000);
function banner(speed){
	var index = 0;
	var white_ = 'rgba(255,255,255,0.8)';
	var black_ = 'rgba(0,0,0,0.6)'
	var imgs = $('li', $('#banner_img'));
	var imgPanel = $('.banner')[0];
	var len = imgs.length;
	var btnLeft = $('#banner_img_left');
	var btnRight = $('#banner_img_right');
	for(var j = 0; j < len; j++){
		$("#banner_point_list").innerHTML += '<li></li>';
	}
	var points = $('li', $('#banner_point_list'));
	points[index].style.background = white_;
	imgs[0].style.zIndex = 2;
	
	var timer = setInterval(move, speed);
	function move(direction){
		direction = direction || 'right';
		imgs[index].style.zIndex = 1;
		points[index].style.background = black_;
		index = direction == 'right' ? (index == len-1 ? 0 : ++index) : (index == 0 ? len-1 : --index);
		imgs[index].style.zIndex = 2;
		points[index].style.background = white_;
	}
	function moveTo(pos){
		imgs[index].style.zIndex = 1;
		points[index].style.background = black_;
		index = pos;
		imgs[index].style.zIndex = 2;
		points[index].style.background = white_;
	}

	imgPanel.onmouseover = function(){
		clearInterval(timer);
	}
	imgPanel.onmouseout = function(){
		timer = setInterval(move, speed);
	}
	btnLeft.onclick = function(){
		move('left');
	}
	btnRight.onclick = function(){
		move('right');
	}

	for(let i = 0; i < len; i++){
		points[i].onclick = function(){
			moveTo(i);
		};
	}
}
