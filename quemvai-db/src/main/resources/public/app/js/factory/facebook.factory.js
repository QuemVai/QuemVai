(function(){
	'use strict';
	
	angular
		.module('quemvai-causamorte')
			.factory('facebookFactory', facebookFactory);
		
	facebookFactory.$inject = ['$rootScope','$q','$timeout'];
		
		function facebookFactory($rootScope,$q,$timeout) {
			return {
				getMyLastName : getMyLastName,
				getFriends : getFriends,
				topFriends :topFriends,
				getRandomFriend :getRandomFriend
			}
			
			function waitToFBLoad(){
				var deferred = $q.defer();
				
				 function tick() {
			        if($rootScope.facebookOk){
			        	deferred.resolve();
			        }else{
			        	$timeout(tick, 1000);
			        }
			    };
			    
			    tick();
				
				return deferred.promise;
			}
			
			function getFacebookStatus(){
				var deferred = $q.defer();
				waitToFBLoad().then(function(){
					 FB.getLoginStatus(function(response) {
						 deferred.resolve(response);
					 });
				}); 
				 return deferred.promise;
			}
			
			function getFriends() { 
				
				var deferred = $q.defer();
				getFacebookStatus().then(function () {
		            FB.api('/me/taggable_friends',{}, function(response) {
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
					deferred.resolve(response[rand]);
				}).catch(function(response){
					console.log(response);
				});
				
				return deferred.promise;
			}
			
			
			
			function topFriends(topQtd){
				var deferred = $q.defer();
				
				getFacebookStatus().then(  function(){
					FB.api('/me/statuses',function(response){
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
					  
					  //console.log(friendsArray);
					  deferred.resolve( friendsArray.slice(0,topQtd)) ;
				  });
			});
				 return deferred.promise;
			}
			
			function getMyLastName() {
	            var deferred = $q.defer();
	            FB.api('/me', {
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