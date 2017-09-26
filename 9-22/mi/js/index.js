banner(3000);
function banner(speed){
	let index = 0;
	let next = 0;
	let white_ = 'rgba(255,255,255,0.8)';
	let black_ = 'rgba(0,0,0,0.6)';
	let flag = true;
	let imgs = $('li', $('#banner_img'));
	let imgPanel = $('.banner')[0];
	let len = imgs.length;
	let imgWidth = parseInt(getComputedStyle($('#banner_img'), null).width);
	let btnLeft = $('#banner_img_left');
	let btnRight = $('#banner_img_right');
	for(let j = 0; j < len; j++){
		$("#banner_point_list").innerHTML += '<li></li>';
	}
	let points = $('li', $('#banner_point_list'));
	points[index].style.background = white_;
	
	let timer = setInterval(move, speed);
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
	slidePanel_1.setAttribute('i', 0);
	slidePanel_1.setAttribute('flag', true);
	let slidePanel_2 = document.querySelector('.recommend .recommend_list ul');
	slidePanel_2.setAttribute('i', 0);
	slidePanel_2.setAttribute('flag', true);
	let btnLeft = document.querySelectorAll('.hg_more .more_left');
	let btnRight = document.querySelectorAll('.hg_more .more_right');
	let hg_more = document.querySelectorAll('.hg_more');
	let dir_1 = false, dir_2 = false;

	slidePanel_1.innerHTML += slidePanel_1.innerHTML;
	slidePanel_1.style.width = slidePanel_1.offsetWidth*2+'px';
	
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
	}, 4000);
	let timer_2 = setInterval(()=>{
		dir_2 = go(slidePanel_2, 1, dir_2);
	}, 4000);
	hg_more[0].onmouseover = function(){
		clearInterval(timer_1);
	}
	hg_more[0].onmouseout = function(){
		timer_1 = setInterval(()=>{
			dir_1 = go(slidePanel_1, 0, dir_1);
		}, 4000);
	}
	hg_more[1].onmouseover = function(){
		clearInterval(timer_2);
	}
	hg_more[1].onmouseout = function(){
		timer_2 = setInterval(()=>{
			dir_2 = go(slidePanel_2, 1, dir_2);
		}, 4000);
	}

	function move(slidePanel, direction, step){
		direction = direction || 'right';
		let lefts = parseInt(getComputedStyle(slidePanel, null).left);
		step = direction == 'right' ? -step : step;
		animate(slidePanel, {left: lefts + step}, ()=>{slidePanel.setAttribute('flag', true);});
	}
	function go(obj, id, dir){
		let pos = parseInt(getComputedStyle(obj, null).left);
		let w = obj.getElementsByTagName('li').length * (234 + 14);
		let i = obj.getAttribute('i');
		let flag = obj.getAttribute('flag');console.log(dir,w,pos, obj.offsetLeft, flag);
		if(dir){
			if(i == 1){
				btnLeft[id].style.color = '#ccc';
				btnRight[id].style.color = '#666';
				dir = false;
			}else{
				btnLeft[id].style.color = '#666';
				btnRight[id].style.color = '#666';
			}
			if(i == 0) return dir = false;
			if(flag){
				obj.setAttribute('i', --i);
				obj.setAttribute('flag', false);
				move(obj, 'left', 1240);console.log('go left' + id);
			}
		}else{
			if(i >= (w / 1240) - 2){
				btnRight[id].style.color = '#ccc';
				btnLeft[id].style.color = '#666';
				dir = true;
			}
			else{
				btnLeft[id].style.color = '#666';
				// btnRight[id].style.color = '#666';
			}
			if(i >= (w / 1240) - 1) return dir = true;
			if(flag){
				obj.setAttribute('i', ++i);
				obj.setAttribute('flag', false);
				move(obj, 'right', 1240);console.log('go right' + id);
			}
		}
		return dir;
	}
}
////////////////////////////////////////////////////////////////////////
// slide_1();
function slide_1(){
	let slidePanel_1 = document.querySelector('.xm-plain-box .xm_star_box main ul');
	let item = document.querySelector('.xm-plain-box .xm_star_box main ul > li');
	let btnLeft = document.querySelectorAll('.hg_more .more_left');
	let btnRight = document.querySelectorAll('.hg_more .more_right');

	/*slidePanel_1.innerHTML += slidePanel_1.innerHTML;
	slidePanel_1.style.width = slidePanel_1.offsetWidth*2+'px';*/

	let w = (item.offsetWidth + parseInt(getComputedStyle(item, null).marginRight))*5;
	let maxW = slidePanel_1.offsetWidth;
	slidePanel_1.style.transition = 'all 0.3s';
	let i = 0;

	btnLeft[0].onclick = function(){
		if(i == maxW/w-1){
			return;
		}
		i++;
		slidePanel_1.style.transform = `translateX(${-i*w}px)`;
	}
	btnRight[0].onclick = function(){
		if(i == 0){
			return;
		}
		i--;
		slidePanel_1.style.transform = `translateX(${-i*w}px)`;
	}
	let dir = true;
	let timer = setInterval(function(){
		dir = go(slidePanel_1, i, dir);
	}, 3000);
	function go(obj, index, dir){
		if(dir){
			if(index == maxW/w-1){
				return dir = false;
			}
			index++;
			obj.style.transform = `translateX(${-index*w}px)`;
		}else{
			if(index == 0){
				return dir = true;
			}
			index--;
			obj.style.transform = `translateX(${-index*w}px)`;
		}
		return dir;
	}
}
////////////////////////////////////////////////////////////////////////
