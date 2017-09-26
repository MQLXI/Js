/*
* @Author: admin
* @Date:   2017-09-19 17:58:22
* @Last Modified by:   admin
* @Last Modified time: 2017-09-22 17:08:52
*/
/**
 * $(select, range);
 * getClasses(className, range);
 * Floating(obj);    构造函数，让元素在页面内漂浮移动
 * children(parent);    返回指定父元素下的所有子元素节点
 * next(element, tagName)    查找指定标签名的最近下一个兄弟节点
 * closed(element, tagName);    查找指定标签名的最近父节点
 */



function $(select, range){
	range = range || document;
	var first = select.charAt(0);
	if(first == '.'){
		return getClasses(select.substring(1), range);
	}else if(first == '#'){
		return document.getElementById(select.substring(1));
	}else if(/^[a-z][a-z1-6]{0,7}$/.test(select)){/* ^开头，$结尾，{0,7} 0最少次数，7最多次数 */
		return range.getElementsByTagName(select);
	}
}
function getClasses(className, range){/*选择对象range下面的元素*/
	range = range ? range : document;
	if(range.getElementsByClassName){
		return range.getElementsByClassName(className);
	}else{
		var all = range.getElementsByTagName('*');
		var newarr = [];
		for(var i = 0; i < all.length; i++){
			var classname = all[i].className.split(' ');
			for(var j = 0; j < classname.length; j++){
				if (classname[j] == className) {
					newarr.push(all[i]);
					break;
				}
			}
		}
		return newarr;
	}
}

function Floating(obj){
	this.obj = obj;
	this.maxY = window.innerHeight - this.obj.offsetHeight;
	this.maxX = window.innerWidth - this.obj.offsetWidth;
	this.stepX = 10;
	this.stepY = 10;
	this.timer;
}
Floating.prototype = {
	start : function(){
		this.move();
	},
	stop : function(){
		clearInterval(this.timer);
	},
	move : function(){
		let that = this;
		this.timer = setInterval(function(){
			that.maxY = window.innerHeight - that.obj.offsetHeight;
			that.maxX = window.innerWidth - that.obj.offsetWidth;
			let tops = that.obj.offsetTop;
			let lefts = that.obj.offsetLeft;
			if(tops >= that.maxY){
				tops = that.maxY;
				that.stepY *= -1;
			}
			if(tops <= 0){
				tops = 0;
				that.stepY *= -1;
			}
			if(lefts >= that.maxX){
				lefts = that.maxX;
				that.stepX *= -1;
			}
			if(lefts <= 0){
				lefts = 0;
				that.stepX *= -1;
			}
			that.obj.style.top = tops + that.stepY + 'px';
			that.obj.style.left = lefts + that.stepX + 'px';
		}, 100);
	},
	resize : function(){
		this.maxY = window.innerHeight - this.obj.offsetHeight;
		this.maxX = window.innerWidth - this.obj.offsetWidth;
	}
};

function children(parent){
	let childElement = [];
	let child = parent.childNodes;
	childElement = Array.prototype.filter.call(child, (element)=>{
		return element.nodeType == 1;
	});
	return childElement;
}
/*查找指定标签名的最近下一个兄弟节点*/
function next(element, tagName){
	tagName = tagName.toUpperCase();
	let nextElement = null;
	do{
		nextElement = element.nextElementSibling;
		element = nextElement;
	}while(nextElement && nextElement.nodeName != tagName)
	return nextElement;
}
/*查找指定元素后面所有的兄弟节点*/
function next(element){
	let nextall = [];
	let nextElement = null;
	while(nextElement = element.nextElementSibling){
		nextall.push(nextElement);
		element = nextElement;
	}
	return nextall;
}
/*查找指定标签名的最近父节点*/
function closed(element, tagName){
	tagName = tagName.toUpperCase();
	let parent = null;
	do{
		parent = element.parentNode;
		element = parent;
	}while(parent && parent.nodeName != tagName)
	return parent;
}
/*指定元素后面插入新的元素*/
HTMLElement.prototype.insertAfter = function(element, position){
	let next = position.nextElementSibling;
	if(next){
		this.insertBefore(element, next);
	}else{
		this.appendChild(element);
	}
}
/*把元素插入到指定父元素内*/
HTMLElement.prototype.appendTo = function(element){
	element.appendChild(this);
}
/*把新元素插入到子元素的最前面*/
HTMLElement.prototype.appendPreviousChild = function(element){
	let first = this.firstElementChild;
	if(first){
		this.insertBefore(element, first);
	}else{
		this.appendChild(element);
	}
}