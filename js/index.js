$(function(){
	//проверка на наличие access_token на основной странице
	if (localStorage.getItem("res_access_token") == null) {
        $('#authFalse').show();
    //получение json с именами друзей вк
    } else if (localStorage.getItem("res_access_token") != null) {
    	var ls_access_token = JSON.parse(localStorage.getItem("res_access_token"))
    	var access_token = ls_access_token[0];
		$.ajax({
	        type: "GET",
	        url: '"https://api.vk.com/method/friends.get?count=5&fields=nickname&access_token='+access_token+'&v=5.67"',
	        dataType: 'jsonp',
	        jsonp: "callback",
	        success: function(response){
	        	console.log(response)
	        }
		});
	}
	//если разрешение для приложения после авторизации пользователя вк не получено вернуться на главную страницу
	if (window.location.search.indexOf("?error=") > -1){
		$('#authError').show();
	//если разрешение получено получить access_token
  } else if(window.location.search.indexOf("?code=") > -1){
        $('#authError').hide();
        var code = (window.location.search).replace('?code=', '');
		$.ajax({
	        type: "GET",
	        url: "https://oauth.vk.com/access_token?client_id=6141592&client_secret=hlLnYTRQZPVQj2Glwn0z&redirect_uri=https://n-ter.000webhostapp.com/html/auth.html&code="+code+"?callback=?",
	        dataType: 'jsonp',
	        jsonp: "callback",
		    format: "json",
	        success: function(response){
			    console.log(response);
			    }
				//var jsonLS = JSON.stringify(json);
	            //localStorage.setItem("res_access_token", jsonLS);
	            //window.location.href = 'https://n-ter.000webhostapp.com';
	        
    	});
  	}
});