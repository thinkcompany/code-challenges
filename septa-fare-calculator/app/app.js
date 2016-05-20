(function() {
	'use strict';

	/**
	 * @ngdoc index
	 * @name app
	 * @description
	 * # app
	 *
	 * Main modules of the application.
	 */

	angular.module('septa-fare-calculator', [
		'ngResource',
		'ngAria',
		 'ngMaterial',
		'ngMdIcons',
		'ui.router',
		'ngLodash',
		'home',
		'fare',
	]);

})();
