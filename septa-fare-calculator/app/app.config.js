(function () {
	'use strict';

	/**
	* @ngdoc configuration file
	* @name app.config:config
	* @description
	* # Config and run block
	* Configutation of the app
	*/


	angular
		.module('septa-fare-calculator')
		.config(configure)
		.filter('titleize', function () {
		        return function (text) {
		            var frags = text.split('_');
					for (var i=0; i<frags.length; i++) {
						frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
					}
					return frags.join(' ');
		        };
		})
		.run(runBlock);

	configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

	function configure($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

		$locationProvider.hashPrefix('!');

		// This is required for Browser Sync to work poperly
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

		
			$urlRouterProvider
			.otherwise('/dashboard');
			
			}

			runBlock.$inject = ['$rootScope'];

			function runBlock($rootScope) {
				'use strict';

				console.log('AngularJS run() function...');
			}


		})();
