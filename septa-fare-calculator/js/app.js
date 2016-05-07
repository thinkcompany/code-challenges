var fareCalc = angular.module('FareCalc', []);

fareCalc.controller('fareCalcCtrl', function($scope){
  // for debugging purposes only
  window.scope = $scope;


  // I am assuming that once this is wired in, there would be a
  // route where I could get an updated .json file using $http.get
  // I've hard-coded the fares.json into the controller here

  $scope.fareInfo = {
    "info": {
        "anytime": "Valid anytime",
        "weekday": "Valid Monday through Friday, 4:00 a.m. - 7:00 p.m. On trains arriving or departing 30th Street Station, Suburban and Jefferson Station",
        "evening_weekend": "Valid weekdays after 7:00 p.m.; all day Saturday, Sunday and major holidays. On trains arriving or departing 30th Street Station, Suburban and Jefferson Station",
        "advance_purchase": "Tickets available for purchase at all SEPTA offices.",
        "onboard_purchase": "Tickets available for purchase from a train conductor aboard SEPTA regional rail trains."
    },
    "zones": [{
        "name": "CCP/1",
        "zone": 1,
        "fares": [{
            "type": "weekday",
            "purchase": "advance_purchase",
            "trips": 1,
            "price": 4.75
        }, {
            "type": "weekday",
            "purchase": "onboard_purchase",
            "trips": 1,
            "price": 6.00
        }, {
            "type": "evening_weekend",
            "purchase": "advance_purchase",
            "trips": 1,
            "price": 3.75
        }, {
            "type": "evening_weekend",
            "purchase": "onboard_purchase",
            "trips": 1,
            "price": 5.00
        }, {
            "type": "anytime",
            "purchase": "advance_purchase",
            "trips": 10,
            "price": 38.00
        }]
    }, {
        "name": "Zone 2",
        "zone": 2,
        "fares": [{
            "type": "weekday",
            "purchase": "advance_purchase",
            "trips": 1,
            "price": 4.75
        }, {
            "type": "weekday",
            "purchase": "onboard_purchase",
            "trips": 1,
            "price": 6.00
        }, {
            "type": "evening_weekend",
            "purchase": "advance_purchase",
            "trips": 1,
            "price": 3.75
        }, {
            "type": "evening_weekend",
            "purchase": "onboard_purchase",
            "trips": 1,
            "price": 5.00
        }, {
            "type": "anytime",
            "purchase": "advance_purchase",
            "trips": 10,
            "price": 45.00
        }]
    }, {
        "name": "Zone 3",
        "zone": 3,
        "fares": [{
            "type": "weekday",
            "purchase": "advance_purchase",
            "trips": 1,
            "price": 5.75
        }, {
            "type": "weekday",
            "purchase": "onboard_purchase",
            "trips": 1,
            "price": 7.00
        }, {
            "type": "evening_weekend",
            "purchase": "advance_purchase",
            "trips": 1,
            "price": 5.00
        }, {
            "type": "evening_weekend",
            "purchase": "onboard_purchase",
            "trips": 1,
            "price": 7.00
        }, {
            "type": "anytime",
            "purchase": "advance_purchase",
            "trips": 10,
            "price": 54.50
        }]
    }, {
        "name": "Zone 4",
        "zone": 4,
        "fares": [{
            "type": "weekday",
            "purchase": "advance_purchase",
            "trips": 1,
            "price": 6.50
        }, {
            "type": "weekday",
            "purchase": "onboard_purchase",
            "trips": 1,
            "price": 8.00
        }, {
            "type": "evening_weekend",
            "purchase": "advance_purchase",
            "trips": 1,
            "price": 5.00
        }, {
            "type": "evening_weekend",
            "purchase": "onboard_purchase",
            "trips": 1,
            "price": 7.00
        }, {
            "type": "anytime",
            "purchase": "advance_purchase",
            "trips": 10,
            "price": 62.50
        }]
    }, {
        "name": "NJ",
        "zone": 5,
        "fares": [{
            "type": "weekday",
            "purchase": "advance_purchase",
            "trips": 1,
            "price": 9.00
        }, {
            "type": "weekday",
            "purchase": "onboard_purchase",
            "trips": 1,
            "price": 10.00
        }, {
            "type": "evening_weekend",
            "purchase": "advance_purchase",
            "trips": 1,
            "price": 9.00
        }, {
            "type": "evening_weekend",
            "purchase": "onboard_purchase",
            "trips": 1,
            "price": 10.00
        }, {
            "type": "anytime",
            "purchase": "advance_purchase",
            "trips": 10,
            "price": 80.00
        }]
    }]
  };
  $scope.farePurchases = ['onboard_purchase', 'advance_purchase'];
  $scope.fareTypes = ['weekday', 'evening_weekend', 'anytime'];

  $scope.fareZone = null;
  $scope.fareType = null;
  $scope.farePurchase = null;
  $scope.fareQty = 0;

})
.filter('prettyPrint', function(){
  // converts strings of type 'string_type' to 'String Type'
  return function(propertyString){
    return propertyString.split('_').map(function(word){
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
  }
})