(function() {

  var app = angular.module('septaFareCalculator', ['ngResource']);

  // Widget controller
  app.controller('SeptaCalCulatorController', ['$scope', '$http', function($scope, $http){
    // Defaults
    var widget = this,
        dataUrl = "/1.0/septa-fares";
    this.zones = [];
    this.info = {};
    this.travel_times = [
      {"type": "weekday", "name": "Weekday"},
      {"type": "evening_weekend", "name": "Evening / Weekend"}
    ];
    this.helperMsg = "";

    // Get data
    $http.get(dataUrl).then(
      // on result
      function(data){
        console.log(data);
        widget.zones = data.data.zones;
        widget.info = data.data.info;
      }, 
      // on error
      function(err){
        console.log(err);
      }
    );

    // Update on input
    this.update = function() {
      if (this.timeSelected) {
        this.helperMsg = this.info[this.timeSelected.type];
      } else {
        this.helperMsg = "";
      }
      if (this.zoneSelected && this.timeSelected && this.purchase && this.ridesNumber) {
        console.log(this.zoneSelected.zone + " - " + this.timeSelected.type + " - " + this.purchase + " - " + this.ridesNumber);

        this.fareCost = 0;
        var fares = this.zones[this.zoneSelected.zone - 1].fares,
            time = this.timeSelected.type,
            rides = parseInt(this.ridesNumber);
        // Bulk purchase
        if (rides >= 10 && this.purchase == "advance_purchase") {
          this.fareCost = fares[4].price * rides / 10;
        } else {
        // Normal purchase
          for (var i=0; i < fares.length-1; i++) {
            if (fares[i].type == this.timeSelected.type && fares[i].purchase == this.purchase) {
              this.fareCost = fares[i].price * rides;
              break;
            }
          }
        }
      } else {
        this.fareCost = 0;
      }
    }
  }]);

  // Numbers only directive
  app.directive('numbersOnly', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          if (text) {
              var transformedInput = text.replace(/[^0-9]/g, '');

              if (transformedInput !== text) {
                  ngModelCtrl.$setViewValue(transformedInput);
                  ngModelCtrl.$render();
              }
              return transformedInput;
          }
          return undefined;
        }            
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  });

})();