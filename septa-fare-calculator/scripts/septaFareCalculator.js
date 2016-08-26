

var ko = require('./../node_modules/knockout/build/output/knockout-latest.debug.js');
var $ = require('./../node_modules/jquery/dist/jquery.min.js');
require('./../scss/style.scss');

ko.bindingHandlers.stopBinding = {
    init: function () {
        return {controlsDescendantBindings: true};
    }
};

// Define the view model for the calculator.
var SeptaFareCalculator = function SeptaFareCalculator() {

    var _this = this;
    _this.fareData = ko.observable();

    $.ajax('fares.json').then(function (data) {
        _this.fareData(data);
    });

    _this.zones = ko.computed(function () {
        if (_this.fareData()) {
            return _this.fareData().zones;
        }
    });

    _this.timeInfo = ko.computed(function () {
        if (_this.fareData()) {
            return _this.fareData().info;
        }
    });

    _this.zoneOptions = ko.computed(function () {
        var options = [];
        if (_this.zones()) {
            var timeOptions = [];
            $(_this.zones()).each(function (idx, option) {
                if (!timeOptions.indexOf(option.type)) {
                    timeOptions.push(option.type);
                }
                options.push({name: option.name, value: option.zone});

            });
        }
        return options;
    });

    _this.timeOptions = ko.computed(function () {
        // Time options will need to be manually update here if they change.
        // We could loop through all of the fares to determine the options.
        var options = ['anytime', 'weekday', 'evening_weekend'];

        $.each(options, function (idx, option) {
            var formattedName = option.charAt(0).toUpperCase() + option.slice(1).replace('_', ' ');
            options[idx] = {formattedName: formattedName, value: option};
        });
        return options;
    });

    // Input field value observables with default values.
    _this.destination = ko.observable();
    _this.when = ko.observable('anytime');
    _this.purchaseLoc = ko.observable('onboard_purchase');
    _this.tripCount = ko.observable(1);

    //We save the trip count here so we can set it again if "anytime" is deselected.
    _this.savedTripCount = 1;

    _this.fareCost = ko.pureComputed(function () {
        if (!_this.when() || !_this.purchaseLoc() || !_this.tripCount || !_this.when()) return;
        var price = 0;

        // I would have liked to use a library like underscore here but checking their documentation
        // it seemed like they may not support IE 8?
        $.each(_this.zones(), function (idx, zone) {
            if (_this.destination().value == zone.zone) {
                $.each(zone.fares, function (idx, fare) {
                    if (fare.type == _this.when().value && fare.purchase == _this.purchaseLoc()) {
                        if (_this.when().value == 'anytime') {
                            price = fare.price;
                        } else {
                            price = fare.price * _this.tripCount();
                        }
                        return false;
                    }
                });
                return false;
            }
        });

        return '$' + price.toFixed(2);

    });

    _this.helperText = ko.computed(function () {
        if (_this.fareData()) {
            return _this.fareData().info[_this.when().value];
        }
    });

    _this.whereHelperText = ko.computed(function () {
        if (_this.fareData()) {
            return _this.fareData().info[_this.purchaseLoc()];
        }
    });

    //Handles logic for when "anytime" is selected.
    _this.anytimeBool = ko.computed(function () {
        if (_this.when() && _this.when().value == 'anytime') {
            _this.purchaseLoc('advance_purchase');
            _this.savedTripCount = _this.tripCount();
            _this.tripCount(10);
            return true;
        } else {
            _this.tripCount(_this.savedTripCount);
            return false;
        }
    });
};


var viewModel = new SeptaFareCalculator();
ko.applyBindings(viewModel, document.getElementById('septa-fare-calculator'));

