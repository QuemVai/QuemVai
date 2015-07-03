(function(){
	'use strict';
	
	angular
		.module('quemvai-causamorte')
		.directive("fbLoginButton", function($window) {
			return {
		        restrict: 'E',
		        link: function (scope, iElement, iAttrs) {
		            if ($window.FB) {
		            	$window.FB.XFBML.parse(iElement[0].parent);
		            }
		        }
		    }
		    
});
	
})();