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
slide();

function slide(){
	let slidePanel_1 = document.querySelector('.xm-plain-box .xm_star_box main ul');
	let slidePanel_2 = document.querySelector('.recommend .recommend_list ul');
	let btnLeft = document.querySelectorAll('.hg_more .more_left');
	let btnRight = document.querySelectorAll('.hg_more .more_right');
	let hg_more = document.querySelectorAll('.hg_more');
	let flag = true;
	let dir_1 = false, dir_2 = false;
	
	btnLeft[0].onclick = function(){
		dir_1 = go(slidePanel_1, 0, false);
	}
	btnRight[0].onclick = function(){
		dir_1 = go(slidePanel_1, 0, true);
	}
	btnLeft[1].onclick = function(){
		dir_2 = go(slidePanel_2, 1, true);
	}
	btnRight[1].onclick = function(){
		dir_2 = go(slidePanel_2, 1, false);
	}
	let timer_1 = setInterval(()=>{
		dir_1 = go(slidePanel_1, 0, dir_1);
	}, 8000);
	let timer_2 = setInterval(()=>{
		dir_2 = go(slidePanel_2, 1, dir_2);
	}, 8000);
	hg_more[0].onmouseover = function(){
		clearInterval(timer_1);
	}
	hg_more[0].onmouseout = function(){
		timer_1 = setInterval(()=>{
			dir_1 = go(slidePanel_1, 0, dir_1);
		}, 8000);
	}
	hg_more[1].onmouseover = function(){
		clearInterval(timer_2);
	}
	hg_more[1].onmouseout = function(){
		timer_2 = setInterval(()=>{
			dir_2 = go(slidePanel_2, 1, dir_2);
		}, 8000);
	}

	function move(slidePanel, direction, step){
		direction = direction || 'right';
		let lefts = parseInt(getComputedStyle(slidePanel, null).left);
		step = direction == 'right' ? -step : step;
		animate(slidePanel, {left: lefts + step}, ()=>{flag = true;});
	}
	function go(obj, id, dir){
		let pos = parseInt(getComputedStyle(obj, null).left);
		let widths = parseInt(getComputedStyle(obj, null).width);
		if(dir){
			if((pos + widths) <= 1240){
				btnLeft[id].style.color = '#ccc';
				btnRight[id].style.color = '#666';
				dir = false;
			}
			if(flag && pos < 0){
				move(obj, 'left', 1240);
				flag = false;
			}
		}else{
			if(pos >= 0){
				btnRight[id].style.color = '#ccc';
				btnLeft[id].style.color = '#666';
				dir = true;
			}
			if(flag && (pos + widths) > 1240){
				move(obj, 'right', 1240);
				flag = false;
			}
		}
		return dir;
	}
}
////////////////////////////////////////////////////////////////////////
