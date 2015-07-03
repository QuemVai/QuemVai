(function(){
	'use strict';
	

	angular
	.module('quemvai-causamorte').run(['$rootScope', '$window','$location', 
  function($rootScope, $window, $location) {

  $rootScope.user = {};
  $rootScope.facebookOk = false;
  $rootScope.appId = '1597681720486698';
  
  $window.fbAsyncInit = function() {
	    FB.init({ 
	      appId: $rootScope.appId,
	      status: true, 
	      cookie: true, 
	      xfbml: true,
	      version: 'v2.3'
	    });
	    $rootScope.facebookOk = true;
	    getLogged();
		function getLogged(sucesso,erro){
			 FB.getLoginStatus(function(response) {
				 if(response.status == "connected"){
					 checkPermission();
					
				 }else{
					 login();
					 
			
				 }
			 });
		}
		function checkPermission(){
			var neededGrants = ["user_friends","user_status"];
			var foundCount = 0;
			FB.api("/me/permissions",function(response){
				
				for(var i in response.data){
					var index = neededGrants.indexOf(response.data[i].permission);
					if(index > -1 && response.data[i].status == "granted"){
						foundCount++;
					}
				}
				
				if(foundCount != neededGrants.length){
					 login();
				}
			});
		}
		function login(){
			$location.path("/login");
		}
	};

}]);
	
	// Load the SDK Asynchronously
	(function(d) {
		var js, id = 'facebook-jssdk';
		if (d.getElementById(id)) {
			return;
		}
		js = d.createElement('script');
		js.id = id;
		js.async = true;
		js.src = "//connect.facebook.net/en_US/all.js";
		d.getElementsByTagName('head')[0].appendChild(js);
	}(document));

})();