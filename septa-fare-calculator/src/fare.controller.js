(function() {
	'use strict';

	angular.module('railFareApp')
	.controller('FareController', FareController);

	FareController.$inject = ['$scope', 'FareService'];
	function FareController($scope, FareService) {
		var _this = this;

		// Text for Time Dropdown, id to Retrieve Data from JSON
		$scope.times = [
			{ text: 'Weekday', id: 'weekday' },
			{ text: 'Evening / Weekend', id: 'evening_weekend' },
			{ text: 'Anytime', id: 'anytime' },
		];
		
		// Keep Track of Currently Selected Options
		$scope.selectedZone = '';
		$scope.selectedTime = '';
		// Initial # of Rides is 1
		$scope.rideCount = 1;
		// Unless "Anytime" is Selected, Minimum is 10
		$scope.rideAnytime = 10;

		var promise = FareService.getFareInfo();

		// Fetch Fare Information from fares.json Via FareService
		promise.then(function(response) {
			_this.info = response.data.info;
			_this.zones = response.data.zones;
			$scope.info = _this.info;
			$scope.zones = _this.zones;
			
		});

	}
})();