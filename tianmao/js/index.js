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
	}
	lis[now].className = 'on';
	let timer = setInterval(fn,speed);
	for(let i = 0; i < lis.length; i++){
		lis[i].onmouseover = function(){
			animate(img_lis[now], {opacity:0});
			img_lis[now].style.zIndex = 0;
			lis[now].className = '';
			img_lis[i].style.zIndex = 5;
			animate(img_lis[i], {opacity:1});
			this.className = 'on';
			now = i;
		}
	}
	document.getElementsByClassName('banner_box')[0].onmouseover = function(){
		clearInterval(timer);
	}
	document.getElementsByClassName('banner_box')[0].onmouseout = function(){
		timer = setInterval(fn,speed);
	}
	function fn(){
		animate(img_lis[now], {opacity:0});
		img_lis[now].style.zIndex = 0;
		lis[now].className = '';
		if(now >=img_lis.length-1)
			now = -1;
		img_lis[++now].style.zIndex = 5;
		animate(img_lis[now], {opacity:1});
		lis[now].className = 'on';
	}
}
//////////////////////////////////////////////////////////////////
scroll();
function scroll(){
	let ch = innerHeight;
	let containerTop = document.querySelector('div.container').offsetTop;
	let hide_nav_back = document.querySelector('.hide_nav_back');
	let hide_nav = document.querySelector('.hide_nav');
	let jump_floors = document.querySelector('.jump_floors');
	let jump_floors_li = document.querySelectorAll('.jump_floors > ul > li');
	jump_floors_li = Array.from(jump_floors_li);
	jump_floors_li.splice(0, 1);
	let colors = ['#64C333', '#ff0036', '#EA5F8D', '#0AA6E8', '#64C333', '#F15453', '#19C8A9', '#ff0036', 'rgba(0,0,0,.6)'];
	let floors = document.querySelectorAll('.floor');
	let tops = [];
	floors.forEach((elemengt)=>{
		tops.push(elemengt.offsetTop);
	});
	tops.push(0);
	let on = 0;
	let flag = true;
	jump_floors_li.forEach((elemengt, index)=>{
		elemengt.onclick = function(){
			jump_floors_li[on].style.background = colors[colors.length-1];
			on = index;
			animate(document.body, {scrollTop: tops[index] - 80}, ()=>{flag = true;});
			animate(document.documentElement, {scrollTop: tops[index] - 80}, ()=>{flag = true;});
			index < colors.length-1 ? this.style.background = colors[index] : '';
			flag = false;
		}
	});

	window.onscroll = function(){
		let sc = document.body.scrollTop || document.documentElement.scrollTop;
		if(sc >= containerTop){
			hide_nav_back.style.top = 0;
			hide_nav.style.top = 0;
			jump_floors.style.width = '36px';
			jump_floors.style.height = '370px';
		}else{
			hide_nav_back.style.top = '-50px';
			hide_nav.style.top = '-50px';
			jump_floors.style.width = '0';
			jump_floors.style.height = '0';
		}

		tops.forEach((value, index)=>{
			if((sc + ch) > value-100){
				if(index < floors.length){
					let imgs = floors[index].getElementsByTagName('img');
					for(let i = 0; i < imgs.length; i++){
						imgs[i].getAttribute('imgPath') ? imgs[i].src = imgs[i].getAttribute('imgPath') : '';
					}
				}
			}
			
			if(flag && (sc >= value-80) && index < tops.length-1){
				jump_floors_li[on].style.background = colors[colors.length-1];
				on = index;
				index < colors.length-1 ? jump_floors_li[index].style.background = colors[index] : '';
			}
		});
	}

}
//////////////////////////////////////////////////////////////////