'use strict';

/* Controllers */

var FareCalculatorControllers = angular.module('FareCalculatorControllers', []);

FareCalculatorControllers.controller('FareCalculatorCtrl',
	function FareCalculatorCtrl ($scope, $http) {

		/* Loading the fares.json data set into $scope.fare_data.
			This is illustrated in Step 7 of the Angular 1.x Tutorial,
			https://docs.angularjs.org/tutorial/step_07. This enables
			the fare calculator to come together quickly.
		*/

		$http.get('fares.json').then(function(response) {
			$scope.fare_data = response.data;
		});

		/* Setting the default values for the fieldset and
			number of fares, because the form doesn't look finished
			without default values in them.
		*/

		$scope.transaction = {
			"purchase_location": "advance_purchase",
			"number_of_fares": 1
		}

	});
