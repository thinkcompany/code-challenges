$(document).ready(function(){

    "use strict";
    //setup regular variables/objects
    var endpointURL = 'fares.json';
    var whenInfo = {};
    var septaZones = {};
    var farepurchaselocation = 'advance_purchase';
    var selectedDestinationVal;
    var selectedTimeVal;
    var totalSeptaRidesNeeded;
    var currentFare;
    var zoneName;
    var zoneNumber;

    //setup dom caches for performance
    var $timeTravelling = $('#septaTimeTravelling');
    var $septaDestination = $('#septaDestination');
    var $numberOfSeptaRides = $('#numberOfSeptaRides');
    var $farePuchaseSelect = $("input[name='farepurchaselocation']");
    var $fareHelperInfo = $("#fareHelperInfo");
    var $puchaseOnboard = $('#purchaseOnboard');
    var $puchaseOnboardLabel = $('#purchaseOnboardLabel');
    var $sfDiscount = $('#sfDiscount');
    var $sfFareTotalAmt = $('#sfTotalAmt');

    //For all the browsers that don't let disabled be selected on load (looking at you Firefox!).
    $septaDestination.find('option:eq(0)').prop('selected', true);
    $timeTravelling.find('option:eq(0)').prop('selected', true);

    $.ajax({
        type: 'GET',
        "url": endpointURL,
        "dataType": "json",
        "success": function( data ) {
            var formTime;
            var humanTime;
            //put data into two sperate objects to make working with easier + less redundant!
            whenInfo = data.info;
            septaZones = data.zones;

            //Loop through each of the two objects and append the information I need
            for(var time in whenInfo) {
                if( time != 'advance_purchase' && time != 'onboard_purchase' ){

                    formTime = time;
                    humanTime = toTitleCase( time.replace("_", " ") );
                    $timeTravelling
                        .append($("<option></option>")
                        .attr("value", formTime)
                        .text(humanTime));
                }
            }

            for(var zone in septaZones) {
                zoneName = septaZones[zone].name;
                zoneNumber = septaZones[zone].zone;

                $septaDestination
                    .append($("<option></option>")
                    .attr("value", zoneNumber)
                    .text(zoneName));
            }
        }
    });


    $septaDestination.change(function() {
        selectedDestinationVal = septaZones[ $(this).val() ];
        getSeptaFareCost();
    });

    $timeTravelling.change(function() {

        selectedTimeVal = $(this).val();
        $fareHelperInfo.text(whenInfo[selectedTimeVal]);

        //If anytime, set up number ofr rides to be 10 and total rides need initially for better UX
        if(selectedTimeVal == 'anytime'){
            $numberOfSeptaRides.val('10');
            totalSeptaRidesNeeded = 10;
            $puchaseOnboard.hide();
            $puchaseOnboardLabel.hide();
            $sfDiscount.show();
        }else{
            $puchaseOnboard.show();
            $puchaseOnboardLabel.show();
            $sfDiscount.hide();
        }

        if(selectedTimeVal == ''){
            $sfFareTotalAmt.text();
        }

        getSeptaFareCost();
    });

    $farePuchaseSelect.change(function(){
        farepurchaselocation = $(this).val();
        getSeptaFareCost();
    });

    //Debounce function to prevent issues when a key is held down, prevents issues if cat sits on keyboard
    $numberOfSeptaRides.keyup(debounce(function(){
        totalSeptaRidesNeeded = $(this).val();
        getSeptaFareCost();
    },500));


    function getSeptaFareCost(){

        var currentFare,
            finalPrice;
        //Make sure all conditions are met so no errors are created
        if( selectedDestinationVal && selectedTimeVal != '' && totalSeptaRidesNeeded && farepurchaselocation){

            $.each( selectedDestinationVal.fares, function(key, value){

                //find the correct object by these two values and then assign it to this
                if(value.type === selectedTimeVal && value.purchase === farepurchaselocation){
                    currentFare = this;
                }

            });

            //Calculational formula based on type of fare
            if(selectedTimeVal != 'anytime'){
                finalPrice = currentFare.price * totalSeptaRidesNeeded;
            }else{
                //I wasn't sure if people could buy multiples of these tickets (why turndown money?), but I figured it would be fun
                //to use Math to figure out how much it would cost anyways.
                var total = Math.ceil(totalSeptaRidesNeeded / 10);
                finalPrice = currentFare.price * total;
            }

            $sfFareTotalAmt.text('$' + finalPrice.toFixed(2));
        }
    }

    //Title Caseing multiple words
    function toTitleCase(str){
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    //http://davidwalsh.name/javascript-debounce-function
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    console.log('%c I like cats, coffee, and coding! :)', 'color: #663399;background: #52B3D9;padding: 6px 0px;font-weight: bold;');

});
