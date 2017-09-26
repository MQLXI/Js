window.onload = function(){
	var box = $('.one .box');//getClasses('box');
	console.log(box);
	/*for(var i = 0; i < box.length; i++){
		box[i].innerHTML = 'this is a DIV';
		box[i].style.background = 'red';
	}*/
	box.innerHTML = 'this is a DIV';
	box.style.background = 'red';
}
function getClasses(className){
	if(document.getElementsByClassName){
		return document.getElementsByClassName(className);
	}else{
		var all = document.getElementsByTagName('*');
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
function getClasses1(className, range){/*选择对象range下面的元素*/
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
// 
// function $(select,range){
// 	range = range || document;
// 	var arr = select.split(' ');
// 	var obj = range;
// 	if(arr.length > 1){
// 		for(var i = 0; i < arr.length; i++){
// 			// obj = obj ? obj : obj = $(arr[i]);
// 			if(obj){
// 				console.log(obj);
// 				var first = arr[i].charAt(0);
// 				if(first == '.'){
// 					obj = getClasses(arr[i].substring(1), obj)[0];
// 				}else if(first == '#'){
// 					obj = obj.getElementById(arr[i].substring(1));
// 				}else if(/^[a-z][a-z1-6]{0,7}$/.test(arr[i])){/* ^开头，$结尾，{0,7} 0最少次数，7最多次数 */
// 					obj = obj.getElementsByTagName(arr[i])[0];
// 				}
// 			}else{
// 				obj = $(arr[i])[0];
// 			}
// 		}
// 		return obj;
// 	}else{
// 		var first = select.charAt(0);
// 		if(first == '.'){
// 			return getClasses(select.substring(1));
// 		}else if(first == '#'){
// 			return document.getElementById(select.substring(1));
// 		}else if(/^[a-z][a-z1-6]{0,7}$/.test(select)){/* ^开头，$结尾，{0,7} 0最少次数，7最多次数 */
// 			return document.getElementsByTagName(select);
// 		}
// 	}
// }