/*
* @Author: admin
* @Date:   2017-09-19 17:58:22
* @Last Modified by:   admin
* @Last Modified time: 2017-09-19 18:03:04
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