(function(){
	'use strict';
	
	angular
		.module('quemvai-causamorte')
		.controller('loginCtrl',loginCtrl);
	
	loginCtrl.$inject = ['$scope','$location'];
	
	function loginCtrl($scope,$location) {
		
		var vm = this;
		vm.onLoginStatusChange = onLoginStatusChange;
		
		function onLoginStatusChange(response){
			$scope.$apply(function() {
			FB.getLoginStatus(function(response) {
				$location.path("teste");
			 });

			});
		}
		
	}
	
})();