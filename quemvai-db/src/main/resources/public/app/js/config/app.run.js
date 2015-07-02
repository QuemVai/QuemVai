(function(){
	'use strict';
	

	angular
	.module('quemvai-causamorte').run(['$rootScope', '$window', 
  function($rootScope, $window) {

  $rootScope.user = {};
  $rootScope.facebookOk = false;
  
  $window.fbAsyncInit = function() {
	    FB.init({ 
	      appId: '1597681720486698',
	      status: true, 
	      cookie: true, 
	      xfbml: true,
	      version: 'v2.3'
	    });
	    $rootScope.facebookOk = true;
	    getLogged();
		function getLogged(sucesso,erro){
			 FB.getLoginStatus(function(response) {
				 if(response.status == "not_authorized"){
					 login();
				 }else{
					 
					 checkPermission();
			
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
		    FB.login(function(response) {
		    	   // handle the response
		    	 }, {
		    	   scope: 'email,user_friends,user_status', 
		    	   return_scopes: true
		    	 });
		}
	};

}]);

})();