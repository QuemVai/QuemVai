(function(){
	'use strict';
	
	angular
		.module('quemvai-causamorte')
			.factory('facebookFactory', facebookFactory);
		
	facebookFactory.$inject = ['$rootScope','$q','$timeout', 'Facebook','$location'];
		
		function facebookFactory($rootScope,$q,$timeout,Facebook,$location) {
			
			
			
			return {
				getMyLastName : interceptedRequest(getMyLastName),
				getFriends : interceptedRequest(getFriends),
				topFriends : interceptedRequest(topFriends),
				getRandomFriend : interceptedRequest(getRandomFriend)
			}
			
			
			function interceptedRequest(func){
				return function(){
					var deferred = $q.defer();
					$rootScope.$broadcast("loader_show");
					var args = Array.prototype.slice.call(arguments);
					getFacebookStatus().then(function(response){
						
						 if(response.status == "connected"){
							 checkPermission().then(function(){
								 func(args).then(function(response){
									$rootScope.$broadcast("loader_hide");
									 deferred.resolve(response);
								 });
							});
						 }else{
							 login();
							 $rootScope.$broadcast("loader_hide");
							 deferred.resolve(response);
						 }
						
					});
					return deferred.promise;
				};
				
			}
			
			function checkPermission(){
				var deferred = $q.defer();
				
				var neededGrants = ["user_friends","user_status"];
				var foundCount = 0;
				Facebook.api("/me/permissions",function(response){
					
					for(var i in response.data){
						var index = neededGrants.indexOf(response.data[i].permission);
						if(index > -1 && response.data[i].status == "granted"){
							foundCount++;
						}
					}
					
					if(foundCount != neededGrants.length){
						 login();
					}
					
					deferred.resolve();
					
				});
				
				return deferred.promise;
			}
			
			function login(){
				$location.path("/login");
			}
			
			function waitToFBLoad(){
				var deferred = $q.defer();
				
					$rootScope.$watch(function() {
					  // This is for convenience, to notify if Facebook is loaded and ready to go.
						 
					  return Facebook.isReady();
					}, function(newVal) {
					  // You might want to use this to disable/show/hide buttons and else
						if(newVal){
							deferred.resolve();
						}
					});

				return deferred.promise;
			}
			
			function getFacebookStatus(){
				var deferred = $q.defer();
				waitToFBLoad().then(function(){
					 Facebook.getLoginStatus(function(response) {
						 deferred.resolve(response);
					 });
				}); 
				 return deferred.promise;
			}
			
			function getFriends() { 
				
				var deferred = $q.defer();
				then(function () {
		            Facebook.api('/me/taggable_friends',{}, function(response) {
		                if (!response || response.error) {
		                    deferred.reject(response);
		                } else {
		                    deferred.resolve(response);
		                }
		            });
				})
			    return deferred.promise;
			}
			
			function getRandomFriend(){
				var deferred = $q.defer();
			
					topFriends(25).then(function(response){
					
						var max = response.length;
						var rand = Math.floor((Math.random() * max) + 1);
						var selected = response[rand];
						if(!selected){
							console.log(response);
							console.log(rand);
						}
						Facebook.api("/"+selected.id+"/picture",function(response){
							selected.photo = response.url;
							deferred.resolve(selected);
						})
						
						
						
					}).catch(function(response){
						console.log(response);
					});
				
				return deferred.promise;
			}
			
			
			
			function topFriends(topQtd){
				var deferred = $q.defer();
		
					Facebook.api('/me/statuses',function(response){
					  var friendLike = [];
					  if (response || !response.error) {
						  
						 for( var i in response.data ){
							 
							 if(response.data[i].likes ){
								 for(var l in response.data[i].likes.data){
									 var fId = response.data[i].likes.data[l].id;
									 var fName =response.data[i].likes.data[l].name;
									 if( friendLike[fId] ){
										 friendLike[fId].count++;;
									 }else{
										 friendLike[fId] = {}
										 friendLike[fId].name = fName;
										 friendLike[fId].count = 1;
									 }
								 }
							 }
						 }
					  }
					  
					  
					  var friendsArray = [];
					  for(var fId in friendLike ){
						  friendsArray.push({
							  id : fId,
							  name: friendLike[fId].name,
							  count:friendLike[fId].count
						  }
								  )
					  }
					  
					  friendsArray.sort(function(a,b){
						  return b.count-a.count;
					  })
					  
					  deferred.resolve( friendsArray.slice(0,topQtd)) ;
				  });
				 return deferred.promise;
			}
			
			function getMyLastName() {
	            var deferred = $q.defer();
	            Facebook.api('/me', {
	                fields: 'last_name'
	            }, function(response) {
	                if (!response || response.error) {
	                    deferred.reject('Error occured');
	                } else {
	                    deferred.resolve(response);
	                }
	            });
	            return deferred.promise;
	        }
		}
	
})();