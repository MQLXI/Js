let user = {logo:'user.jpg', userName:'Mr.Zhang'};
let text = document.querySelector('.text');
let num = document.querySelector('.num');
let maxLen = text.maxLength;
let btn_submit = document.querySelector('.submit');
let comment = document.querySelector('.comment');
num.innerHTML = maxLen;

text.onkeyup = function(e){
	let len = text.value.length;
	num.innerHTML = maxLen - len;
}
btn_submit.addEventListener('click', submit);
function submit(){
	let item = document.createElement('div');
	let word = document.createElement('div');
	item.className = 'item';
	word.className = 'word';
	if(text.value.trim().length < 1){
		alert('不能提交空信息，请重新输入！');
		text.value = '';
		num.innerHTML = maxLen;
		return;
	}
	item.innerHTML = `
	<div class='user'><img src='${user.logo}'><span>${user.userName}</span>
	`;
	word.innerHTML = `${text.value.replace(String.fromCharCode(13), '<br>')}`;
	comment.appendChild(item);
	item.appendChild(word);
	text.value = '';
	num.innerHTML = maxLen;
}
/////////////////////////////////////////////////////////////////////////////////
let login = document.querySelector('.login');
let panel = document.querySelector('.panel');
let username = document.querySelector('.username');
let pwd = document.querySelector('.pwd');
let login_submit;

login.onclick = function(){
	panel.style.display = 'block';
	login_submit = document.querySelector('.login_submit');
	console.log(login_submit)
}
var loginFn = function(){
	let usertext = username.value.trim();
	if(usertext.length > 0){
		user.userName = usertext;
		panel.style.display = 'none';
	}else{
		alert('请输入用户名！');
		return;
	}
}