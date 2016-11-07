// From Array of Objects return one Object, which values match to specific (value can be an array)
function FindMatchObject(arr, val) {

    //Check if value is in Array
    function Include(arr2, obj) {
        return (arr2.indexOf(obj) !== -1);
    }

    for (var i in arr) {
        var arrIter = arr[i];
        var arrIterValues = Object.values(arrIter);
        var arrMatch = false;
        if (typeof val === 'object') {
            for (var ii in val) {
                if (Include(arrIterValues, val[ii]) === true) {
                    arrMatch = true;
                } else {
                    arrMatch = false;
                    break;
                }
            }
        } else {
            arrMatch = Include(arrIterValues, val) || arrMatch;
        }

        if (arrMatch === true) {
            return arrIter;
        }
    }
}

$(document).ready(function() {
    $.ajax({
        url: 'fares.json',
        dataType: "json",
    }).done(function(data) {

        // Create constants for widget
        var JSONInfoRidingDayVars = {
            weekday: 'Weekday',
            evening_weekend: 'Evening / Weekend',
            anytime: 'Anytime (10-Trip ticket)'
        };
        var JSONInfoPurchasePlaceVars = {
            advance_purchase: 'Station Kiosk',
            onboard_purchase: 'Onboard'
        };
        var anytime = 'anytime';
        var advance_purchase = 'advance_purchase';
        var radioName = 'radio-septa';

        // Create 'help' for 'purchase time' question(2)
        function CreateWidgetQuestion2Help() {
            var $fareType = $('.septa-question-2').val();
            $('.septa-question-2-help').text(data.info[$fareType]);
        }

        // Create 'text' for 'number of tickets' question(4)
        function CreateWidgetQuestion4Text(param) {
            if (param === undefined) {
                $('.septa-question-4-text').text('How many rides will you need?');
            } else {
                $('.septa-question-4-text').text('How many 10-Trip tickets will you need?');
            }
        }

        // Create fare descriptions 1 and 2
        function CreateFareDescription(descr1, descr2) {
            $('.septa-description-fare-1').text('10-Trip tickets: ' + descr1);
            $('.septa-description-fare-2').text('One-way tickets: ' + descr2);
        }

        // Fill widget by data from JSON
        function CreateWidget() {

            // First block of widget (Where are you going?)
            $.each(data.zones, function(key, val) {
                $('.septa-question-1').append(new Option(val.name, val.name));
            });

            // Second block of widget (When are you riding?)
            // So the list of values does not begin with Anytime
            var Keys = Object.keys(JSONInfoRidingDayVars);
            Keys.sort();
            Keys.reverse();
            for (var i in Keys) {
                $('.septa-question-2').append(new Option(JSONInfoRidingDayVars[Keys[i]], Keys[i]));
            }

            // Add first hint for day of riding
            CreateWidgetQuestion2Help();

            // Save first entered Value
            $('.septa-question-2').data('pre', $('.septa-question-2').val());

            // Third block of widget (When will you purchse the fare?)
            $.each(JSONInfoPurchasePlaceVars, function(key, val) {
                var $newP = $('<p>')
                var $newInput = $('<input>', {
                    type: 'radio',
                    name: radioName,
                    value: key,
                    id: radioName + '-' + key
                });
                var $newLavel = $('<label>', {
                    for: radioName + '-' + key,
                    text: val
                });
                $('.septa-question-3').append($newP.append($newInput, $newLavel))
            });

            // Fourth block of widget (When are you riding?)
            CreateWidgetQuestion4Text();
        }

        // Calculate the cheapest fare
        function CalculationOfFare() {
            var zoneName = $('.septa-question-1').val();
            var fareType = $('.septa-question-2').val();
            var farePurchase = $('.septa-question-3 :checked').val();
            var ticketNum = $('.septa-question-4').val();
            $('.septa-description-fare-1').text('');
            $('.septa-description-fare-2').text('');
            $('.septa-description-fare-3').text('');
            switch (zoneName !== '' && fareType !== '' && farePurchase !== undefined && ticketNum !== '') {

                // All fields are filled
                case true:
                    var zone = FindMatchObject(data.zones, zoneName);
                    var fare = FindMatchObject(zone.fares, [fareType, farePurchase]);
                    switch (fareType) {

                        // Only Anytime tickets
                        case anytime:
                            $('.septa-total-fare').text('$' + (Number(fare.price) * Number(ticketNum)).toFixed(2));
                            break;

                        // Weekday and Evening / Weekend tickets
                        default:
                            switch (Number(ticketNum) < 10) {

                                // Buy less then 10 tickets
                                case true:
                                    $('.septa-total-fare').text('$' + (Number(fare.price) * Number(ticketNum)).toFixed(2));
                                    break;

                                // Buy more then 10 tickets
                                default:
                                    var fareAnytime = FindMatchObject(zone.fares, 'anytime');
                                    var fareStationKiosk = FindMatchObject(zone.fares, [fareType, advance_purchase]);
                                    var TenTripNum = Math.floor(Number(ticketNum) / 10);
                                    var OneWayNum = Number(ticketNum) % 10;
                                    var totalPriceTenTrip = (Number(fareStationKiosk.price) * Number(OneWayNum) + Number(fareAnytime.price) * Number(TenTripNum)).toFixed(2)
                                    var totalPriceOneWayKiosk = (Number(fareStationKiosk.price) * Number(ticketNum)).toFixed(2);
                                    var minTotalPriceKiosk = Math.min(Number(totalPriceTenTrip), Number(totalPriceOneWayKiosk));
                                    if (farePurchase === advance_purchase) {

                                        // Buying at a Station Kiosk
                                        switch (Number(totalPriceTenTrip) <= Number(totalPriceOneWayKiosk)) {

                                            // Cheaper to buy 10-Trip tikets
                                            case true:
                                                CreateFareDescription(TenTripNum, OneWayNum);
                                                $('.septa-total-fare').text('$' + totalPriceTenTrip);
                                                break;

                                                // Cheaper to buy OneWay tikets
                                            default:
                                                CreateFareDescription(0, ticketNum);
                                                $('.septa-total-fare').text('$' + totalPriceOneWayKiosk + '*');
                                                $('.septa-description-fare-3').text('*Your price with 10-Trip tickets: $' + totalPriceTenTrip);
                                        }
                                    } else {

                                        // Buying at a Onbord
                                        var totalPriceOneWayOnboard = (Number(fare.price) * Number(ticketNum)).toFixed(2)
                                        CreateFareDescription(0, ticketNum);
                                        $('.septa-total-fare').text('$' + totalPriceOneWayOnboard + '*');
                                        switch (Number(minTotalPriceKiosk) <= Number(totalPriceOneWayOnboard)) {

                                            // Cheaper to buy at Station Kiosk
                                            case true:
                                                $('.septa-total-fare').text('$' + totalPriceOneWayOnboard + '*');
                                                $('.septa-description-fare-3').text('*Buy tickets at a Station Kiosk and save $' + (totalPriceOneWayOnboard - minTotalPriceKiosk));
                                                break;

                                            // Cheaper to buy at Onbord
                                            default:
                                                $('.septa-total-fare').text('$' + totalPriceOneWayOnboard);
                                        }
                                    }
                            }
                    }
                    break;

                // Not all fields are filled
                default:
                    $('.septa-total-fare').text('$0.00');
            }
        }

        // Fill widget by data from JSON
        CreateWidget();

        // ------------------------ Actions for blocks -----------------------

        // Action for first block of widget (Where are you going?)
        $('.septa-question-1').change(function() {
            CalculationOfFare();
        });

        // Action for second block of widget (When are you riding?)
        $('.septa-question-2').change(function() {

            // Save previous Value
            var beforeChange = $(this).data('pre');

            // Hide/Show option to buy ticket at onboard; question 2 text; question 4 help; set number of tickets
            var day = $('.septa-question-2').val();
            var $radios = $('input:radio[name=' + radioName + ']');
            var ticketNum = $('.septa-question-4').val();
            if (day === anytime) {
                if (ticketNum !== '') {
                    $('.septa-question-4').val(Math.ceil(Number(ticketNum) / 10));
                }

                CreateWidgetQuestion4Text(day);
                $('.septa-question-4-help').addClass('hidden');
                $radios.filter('[value=' + advance_purchase + ']').prop('checked', true);
                $radios.not(':checked').prop('disabled', true);
            } else {
                if (beforeChange === anytime) {
                    if (ticketNum !== '') {
                        $('.septa-question-4').val(Math.min(Number(ticketNum) * 10, 100));
                    }
                }

                CreateWidgetQuestion4Text();
                $('.septa-question-4-help').removeClass('hidden');
                $radios.not(':checked').prop('disabled', false);
            }

            CreateWidgetQuestion2Help();
            CalculationOfFare();

            // Save current Value
            $(this).data('pre', $(this).val());
        });

        // Action for third block of widget (When will you purchse the fare?)
        $('.septa-question-3').change(function() {
            CalculationOfFare();
        });

        // Action for fourth block of widget (How many rides will you need?)
        $('.septa-question-4').change(function() {
            CalculationOfFare();
        });
    });
});
