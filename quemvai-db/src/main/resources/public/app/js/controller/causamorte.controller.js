(function(){
	'use strict';
	
	angular
		.module('quemvai-causamorte')
		.controller('causamorteCtrl',causaMorteCtrl);
	
	causaMorteCtrl.$inject = ['causaMorte','assasino',"facebookFactory"];
	
	function causaMorteCtrl(causaMorte ,assasino,facebookFactory) {
		var vm = this;
		
		vm.causaMorte = causaMorte;
		vm.assasino = assasino;
		
		
	}
	
})();