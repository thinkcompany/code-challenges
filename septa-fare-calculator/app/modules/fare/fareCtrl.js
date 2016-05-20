(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:fareCtrl
	* @description
	* # fareCtrl
	* Controller of the app
	*/

  	angular
		.module('fare')
		.controller('FareCtrl', Fare);

		Fare.$inject = ['lodash', 'FareService'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Fare(lodash, FareService) {
			/*jshint validthis: true */
			var vm = this;

			vm.selectedZone;
			vm.selectedType;
			vm.selectedPurchase;
			vm.trips;

			function titleize(str) {
				var frags = str.split('_');
				for (var i=0; i<frags.length; i++) {
				frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
				}
				return frags.join(' ');
			}

			vm.currentZone = function() {
				return _.find(vm.data.zones, { 'name': vm.selectedZone });
			};

			vm.getPrice = function() {
				if (vm.selectedZone) {
					var zone = vm.currentZone();

					// Update purchase type since 'Anytime' has only one option
					vm.purchases = lodash.uniq(
						_.map(_.filter(zone.fares, { 'type': vm.selectedType }), 'purchase')
					);

					if (vm.selectedPurchase && vm.trips) {
						vm.fare = _.find(zone.fares, { 'type': vm.selectedType, 'purchase': vm.selectedPurchase });

						if (!vm.trips) {
							vm.trips = vm.fare.trips;
						}
						vm.price = vm.fare.price * vm.trips;
					}
				}
			};

			vm.getSelectedText = function(name) {
				if (vm['selected' + name] !== undefined) {
					return titleize(vm['selected' + name]);
				} else {
					return "Please select a " + name;
				}
			};

			vm.selectZone = function() {
				// Get fares from selected zone
				var zone = vm.currentZone();

				vm.types = lodash.uniq(
						_.map(zone.fares, 'type')
					);
			};

			// Intial data load, setting vars only after promise resolves
			FareService.getData().then(function(data) {
				vm.data  = data;
				vm.zones = _.map(vm.data.zones, 'name');
				vm.info  = vm.data.info;
				vm.types = [];
			});
		}

})();
