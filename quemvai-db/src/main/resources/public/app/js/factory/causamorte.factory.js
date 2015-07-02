(function(){
	'use strict';
	
	angular
		.module('quemvai-causamorte')
		.factory('causamorteFactory', causamorteFactory);
	
	causamorteFactory.$inject = ['$http'];
	
	function causamorteFactory($http) {
		var factory = {
				buscaAleatoria : buscaAleatoria
		}
		
		return factory;
		
		function buscaAleatoria() {
			return $http({ method: 'GET', url: '/causamorte/search/buscaAleatoria' });
		}
	}
	
})();