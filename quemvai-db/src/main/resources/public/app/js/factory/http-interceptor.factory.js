(function() {
    'use strict';

    angular
        .module('quemvai-causamorte')
        .factory('httpInterceptor', httpInterceptor);

    httpInterceptor.$inject = ['$q', '$location'];

    function httpInterceptor($q, $location) {
    	var factory = {
    	    'response' : responseInterceptor,
            'responseError' : responseErrorInterceptor
    	}

    	return factory;

        function responseInterceptor(response) {
        	return response.config.url.indexOf('.htm') > -1 ? response : response.data;
        }
        function responseErrorInterceptor(rejection) {
        	if ( rejection.data != null && rejection.data.message != null){
        		  alert ("ERRO: "+ rejection.data.message);
        	}else{
        		alert('Ocorreu um erro, verifique o console');
        	}
        	console.log(rejection);
            return $q.reject(rejection);
        }

    }

})();