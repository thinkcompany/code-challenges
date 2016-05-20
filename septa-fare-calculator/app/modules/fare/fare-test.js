(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.test:fareTest
	 * @description
	 * # fareTest
	 * Test of the app
	 */

	describe('fare test', function () {
		var controller = null, $scope = null;

		beforeEach(function () {
			module('septa-fare-calculator');
		});

		beforeEach(inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			controller = $controller('FareCtrl', {
				$scope: $scope
			});
		}));

		it('Should controller must be defined', function () {
			expect(controller).toBeDefined();
		});

	});
})();
