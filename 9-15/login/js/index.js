let sub = document.getElementById('submit');
sub.onclick = function(){
	let username = document.getElementById('username').value.trim();
	let pwd = document.getElementById('pwd').value.trim();
	if(username == 'zhangsan' && pwd == '123456'){
		alert('登陆成功！');
		location.replace('http://www.baidu.com');
	}else{
		location.replace('error.html');
	}
}