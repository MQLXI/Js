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
	var next = 0;
	var white_ = 'rgba(255,255,255,0.8)';
	var black_ = 'rgba(0,0,0,0.6)';
	var flag = true;
	var imgs = $('li', $('#banner_img'));
	var imgPanel = $('.banner')[0];
	var len = imgs.length;
	var imgWidth = parseInt(getComputedStyle($('#banner_img'), null).width);
	var btnLeft = $('#banner_img_left');
	var btnRight = $('#banner_img_right');
	for(var j = 0; j < len; j++){
		$("#banner_point_list").innerHTML += '<li></li>';
	}
	var points = $('li', $('#banner_point_list'));
	points[index].style.background = white_;
	imgs[0].style.zIndex = 2;
	
	var timer = setInterval(move, speed);
	function move(direction, pos){
		direction = direction || 'right';
		next = direction == 'right' ? (next == len-1 ? 0 : ++next) : (next == 0 ? len-1 : --next);
		next = pos != undefined ? pos : next;
		direction == 'right' ? imgs[next].style.left = imgWidth+'px' : imgs[next].style.left = -imgWidth+'px';
		
		if(direction == 'right'){
			animate(imgs[index], {left:-imgWidth}, function(){flag = true;});
			animate(imgs[next], {left:0}, function(){flag = true;});
		}else{
			animate(imgs[index], {left:imgWidth}, function(){flag = true;});
			animate(imgs[next], {left:0}, function(){flag = true;});
		}
		points[index].style.background = black_;
		points[next].style.background = white_;
		index = next;
	}
	function moveTo(pos){
		if(pos == index)
			return;
		// points[index].style.background = black_;
		/*if(pos > next){
			animate(imgs[index], {left:-imgWidth}, function(){flag = true;});
			index = next = pos > 0 ? pos - 1 : len -1;
			move('right');
		}else if(pos < next){
			animate(imgs[index], {left:imgWidth}, function(){flag = true;});
			index = next = pos < len-1 ? pos + 1 : 0;
			move('left');
		}*/

		/*pos > index ? imgs[pos].style.left = imgWidth+'px' : imgs[pos].style.left = -imgWidth+'px';
		if(pos > index){
			animate(imgs[index], {left:-imgWidth}, function(){flag = true;});
			animate(imgs[pos], {left:0}, function(){flag = true;});
		}else{
			animate(imgs[index], {left:imgWidth}, function(){flag = true;});
			animate(imgs[pos], {left:0}, function(){flag = true;});
		}
		points[index].style.background = black_;
		points[pos].style.background = white_;
		index = next = pos;*/
		pos > index ? move('right', pos) : move('left', pos);
	}

	imgPanel.onmouseover = function(){
		clearInterval(timer);
	}
	imgPanel.onmouseout = function(){
		timer = setInterval(move, speed);
	}
	btnLeft.onclick = function(){
		if(flag){
			move('left');
			flag = false;
		}
	}
	btnRight.onclick = function(){
		if(flag){
			 move('right');
			 flag = false;
		}
	}

	for(let i = 0; i < len; i++){
		points[i].onclick = function(){
			moveTo(i);
		};
	}
}
////////////////////////////////////////////////////////////////////