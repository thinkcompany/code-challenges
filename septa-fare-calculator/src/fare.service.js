(function () {
	'use strict';

	angular.module('railFareApp')
	.service('FareService', FareService);

	// HTTP Call to JSON File
	FareService.$inject = ['$http'];
	function FareService($http){
		var _this = this;

		_this.getFareInfo = function() {
			var response = $http({
				method: 'GET',
				url: ('fares.json')
			});
			return response;
		}
	}

})();