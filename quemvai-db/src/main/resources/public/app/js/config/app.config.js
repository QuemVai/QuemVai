(function(){
	'use strict';
	
	angular
		.module('quemvai-causamorte')
		.config(config);
	
	config.$inject = ['$routeProvider', '$httpProvider','FacebookProvider'];
	
	function config($routeProvider, $httpProvider,FacebookProvider) {
		
		FacebookProvider.init('1597681720486698');
		
		$httpProvider.interceptors.push('httpInterceptor');
		$httpProvider.interceptors.push('loaderFactory');
		
		var rotas = [
		             { rota: '/', folder: '', controller: 'causamorte', resolve : { causaMorte : initializer().causaMorte,
		            	 assasino:  initializer().assasino
		            	 } },
		             { rota: '/login', folder: '', controller: 'login' }
		             ];
		
		function initializer() {
			var initializers = {
					causaMorte : causaMorte,
					assasino : assasino
			}
			
			return initializers;
			function assasino(facebookFactory){
				var retorno =  facebookFactory.getRandomFriend();
				return retorno;
			}
			function causaMorte(causamorteFactory) {
				return causamorteFactory.buscaAleatoria();
			}
		}
		
		var htmlPath = './view/';
	    var htmlSuffix = '.html';
	    var controllerSuffix = 'Ctrl';
	    var controllerAs = 'vm';

	    for(var i in rotas) {
	        $routeProvider
	            .when(rotas[i].rota, {
	                templateUrl : htmlPath + rotas[i].folder + rotas[i].controller + htmlSuffix,
	                controller : rotas[i].controller + controllerSuffix,
	                controllerAs : controllerAs,
	                resolve : rotas[i].resolve
	            })
	    }

    	$routeProvider.otherwise({ redirectTo : rotas[0].rota });
    	
    	
	}
	
})();