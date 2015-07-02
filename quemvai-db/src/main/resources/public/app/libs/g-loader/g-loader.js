(function() {
    'use strict';

    angular
        .module('gLoader', [])
        .factory('loaderFactory', loaderFactory)
        .directive('loader', loader);

    loaderFactory.$inject = ['$q', '$rootScope', '$log'];

    function loaderFactory($q, $rootScope, $log) {
    	var numLoadings = 0;

        return {
            request: function (config) {

                numLoadings++;

                // Show loader
                $rootScope.$broadcast("loader_show");
                return config || $q.when(config)

            },
            response: function (response) {

                if ((--numLoadings) === 0) {
                    // Hide loader
                    $rootScope.$broadcast("loader_hide");
                }

                return response || $q.when(response);

            },
            responseError: function (response) {

                if (!(--numLoadings)) {
                    // Hide loader
                    $rootScope.$broadcast("loader_hide");
                }

                return $q.reject(response);
            }
        };
    }
    
    loader.$inject = ['$rootScope'];
    
    function loader($rootScope) {
    		return function ($scope, element, attrs) {
            $scope.$on("loader_show", function () {
                return element.show();
            });
            return $scope.$on("loader_hide", function () {
                return element.hide();
            });
        };
    }

})();