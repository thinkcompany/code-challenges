'use strict';

angular.module('fareFinder', [])
/*
TO-DO:
- All data-query code should be moved to a factory function, but time prevented it today 
- Module needs an init method to display correct total fare and help text when first viewed.
- Needs support for 10-ride fares
- General cleanup...
*/

	.controller('mainController', ['$scope', '$http', function($scope, $http) {
		$scope.fareData = {};
		$scope.tripDetails = {
			destination: 1,
			type: 'weekday',
			purchase: 'advance_purchase',
			qty: 1
		};
		$scope.fare = 0;
		$scope.price = 0;
		$scope.zones = {};
		$scope.info = {};
		$scope.helperText = "";
		
		
		$http.get('fares.json')
			.then(function(res) {
				$scope.fareData = res.data;
				$scope.zones = res.data.zones;
				$scope.info = res.data.info;
			},
			function(res) {
				console.log(res);
			});
		
		$scope.getPrice = function() {
			var td = $scope.tripDetails;
			var zone = $scope.fareData.zones[td.destination - 1];
			jQuery.each(zone.fares, function(i, v) {
				if (v.type === td.type && v.purchase === td.purchase) {
					$scope.price = v.price;
					$scope.helperText = $scope.info[td.purchase] + ' ' + $scope.info[td.type];
					return false;
				}
			});
			 $scope.calcFare();
		}
		
		$scope.calcFare = function() {
			$scope.fare = $scope.price * $scope.tripDetails.qty; 
		}
	}]);