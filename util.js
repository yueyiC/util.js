var util = (function(){
	return {
		// 去除字符串两边的空白字符
		trim:function trim(str){
			return str.replace(/^\s+|\s$/g,"");
		},
		// 判断用户输入的是不是邮箱
		isEmail:function isEmail(str){
    		var reg = /\S+@{1}\S+\.\S+/;
    		return reg.test(str);
		},
		// 判断用户输入的是不是手机号
		function isPhoneNum(str){
    		var reg = /^1[0-9]\d{9}$/
    		return reg.test(str);
		},
		// 判断用户输入的是不是合法的用户名（长度6-20个字符，只能包括字母、数字、下划线）
		isValidUsername:function isValidUsername(str){
    		var reg = /\W/;
    		if(str.length < 6 || str.length >20 ){
        		return false;
    		}
    		else if(reg.test(str)){
        		return false;
    		}
    		return true;
		},
		// 判断用户输入的是不是合法密码（长度6-20个字符，包括大写字母、小写字母、数字、下划线至少两种）
		function isValidPassword(str){
    		var reg = /\W/;
    		var single = /^[0-9]+$|^[a-z]+$|^[A-Z]+$|^_+$/;
    		if(str.length < 6 || str.length >20){
       	 		return false;
    		}
    		if(reg.test(str) || single.test(str)){
        		return false;
   		 	}
    		return true;
		},
		// 添加class
		addClass:function addClass(el,cls){
   			if(!hasClass(el,cls)){
        		el.className += " "+cls;
    		}
		},
		// 判断class是否存在
		hasClass:function hasClass(el,cls){
    		var reg = new RegExp("\\b"+cls+"\\b");
    		if(!reg.test(el.className)){
        		return false;
    		}else{
        		return true;
    		}
		},
		// 删除class
		removeClass:function removeClass(el,cls){
    		var reg = new RegExp("\\b"+cls+"\\b");
    		var temp = el.className.replace(reg,"").replace(/^\s+|\s$/g,"").replace(/\s{2,}/," ");
    		el.className = temp;
		},
		// ajax
		ajax:function ajax(opts){
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange=function(){
				if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
					var json = JSON.parse(xmlhttp.responseText);
					opts.success(json);
				}
				if(xmlhttp.status == 404){
					opts.error();
				}
			}
			var dataStr = '';
			for(var key in opts.data){
				dataStr += key + '='+ opts.data[key]+'&';
			}
			dataStr = dataStr.substr(0,dataStr.length-1);
			if(opts.type.toLowerCase === 'post'){
				xmlhttp.open(opts.type,opts.url,true);
				xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xmlhttp.send(dataStr);
			}
			if(opts.type.toLowerCase() === 'get'){
				xmlhttp.open(opts.type,opts.url+'?'+dataStr,true);
				xmlhttp.send();
			}
		}
	}
})()