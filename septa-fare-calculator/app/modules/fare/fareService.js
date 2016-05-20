(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:fareService
	 * @description
	 * # fareService
	 * Service of the app
	 */

  	angular
		.module('fare')
		.factory('FareService', Fare);

		Fare.$inject = ['$http'];

		function Fare ($http) {
			return {
				getData: function () {
					return $http.get('/app/assets/data/septa-pricing.json')
					       .then(function(res){
					          return res.data;                
					        });
				}
		  	}
		}

})();
