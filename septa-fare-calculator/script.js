(function () {
    angular
        .module('app', []);
})();


(function () {
    angular
        .module('app')
        .component('septaFareWidget', {
            controller: SeptaFareWidgetController,
            templateUrl: 'SeptaWidgetComponent.template.html'
        });

        SeptaFareWidgetController.$inject = [];

        function SeptaFareWidgetController () {
            console.log('I am Widget');
        }


})();