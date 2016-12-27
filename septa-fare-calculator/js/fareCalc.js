var app = angular.module("fareCalc", []);

app.controller("fareCalcController", function($scope, $http) {
    //hi!
    $scope.fareData = false;
    //the following will store data from the json file
    //basically our options
    $scope.whens = [];
    $scope.wheres = [];
    $scope.advOnb = [];
    $scope.isMobile = false; //used for responsiveness
    $scope.num = 1;
    $scope.tripRes = 'Please fill out all fields!';

    $scope.test = 'Angular works!';
    $http.get('https://raw.githubusercontent.com/thinkbrownstone/code-challenges/master/septa-fare-calculator/fares.json').then(function(res) {
        console.log('FARES:', res);
        $scope.fareData = res.data;
        $scope.sortData();
    });
    $scope.sortData = function() {
        //just sort the data into appropriate data boxes as above;
        //whens and adv/onbrd first
        var whensNames = Object.keys($scope.fareData.info);
        for (var i = 0; i < whensNames.length; i++) {
            if (whensNames[i] != 'advance_purchase' && whensNames[i] != 'onboard_purchase') {
                $scope.whens.push({
                    name: whensNames[i] != 'evening_weekend' ? whensNames[i].toUpperCase() : 'EVENING/WEEKEND',
                    info: $scope.fareData.info[whensNames[i]]
                });
            } else {
                $scope.advOnb.push({
                    name: whensNames[i],
                    info: $scope.fareData.info[whensNames[i]]
                });
            }
        }
        //now wheres
        for (i = 0; i < $scope.fareData.zones.length; i++) {
            $scope.wheres.push({
                name: $scope.fareData.zones[i].name,
                farePrices: $scope.fareData.zones[i].fares
            });
        }

        console.log($scope.whens, $scope.advOnb, $scope.wheres);
    };
    $scope.advOSanitize = function(nm) {
        return nm.toUpperCase().replace('_', ' ');
    };
    $scope.Objectify = function(obj) {
        if (typeof obj != 'object') {
            return JSON.parse(obj);
        }
        return obj;
    };
    $scope.numsValid = function(fld) {
        //this fn just checks to see if we're doin 10-trip tickets, in which case we can ignore the num-trips box
        //we can also set the "where purchased" box to 'advance', since the 10-trip package can ONLY be bought in advance.
        if (fld && JSON.parse(fld).name == 'ANYTIME') {
            $scope.num = 10;
            $scope.onOrOff = '{"name":"advance_purchase","info":"Tickets available for purchase at all SEPTA offices."}';
            return true;
        } else {
            return false;
        }
    };
    $scope.parseTrip = function() {
        var whrOb, whnOb, AOOb, prices, okayToCalc = $scope.where && $scope.when && $scope.onOrOff && $scope.num; //do we have all the things filled out?
        if (okayToCalc) {
            //parse all the objects, so we can get their properties
            whrOb = JSON.parse($scope.where);
            whnOb = JSON.parse($scope.when);
            AOOb = JSON.parse($scope.onOrOff);
            prices = whrOb.farePrices;
            if (whnOb.name == 'ANYTIME') {
                //if we're doing anytime, we dont need to ask for number of trips (since its automatically 10.)
                $scope.tripRes = prices[4].price;
            } else {
                //otherwise, loop thru and find the price where the price time (farePrice.type below)
                //and purchase location (farePrice.purchase) match what we want.
                for (var i = 0; i < whrOb.farePrices.length; i++) {
                    if ((whrOb.farePrices[i].type.toUpperCase().replace('_', '/') == whnOb.name) && (whrOb.farePrices[i].purchase == AOOb.name)) {
                        $scope.tripRes = whrOb.farePrices[i].price * $scope.num;
                        break;
                    }
                }
            }
        }
    };
    $scope.expl = function(m) {
        //just a toggle function to show and hide the zone map. In case you don't actually know the septa map by heart.
        console.log($('#zoneMap'));
        if (!m) {
            $('#zoneMap').slideDown(500);
        } else {
            $('#zoneMap').slideUp(500);
        }
    };

    //some responsiveness stuff
    $(document).ready(function() {
        if ($(window).width() < 1215) {
            $scope.isMobile = true;
        }
        console.log($scope.isMobile)
        $(window).on('resize', function(e) {
            if ($(window).width() < 1215) {
                $scope.isMobile = true;
            } else {
                $scope.isMobile = false;
            }
            $scope.$digest();
        });
    })

});