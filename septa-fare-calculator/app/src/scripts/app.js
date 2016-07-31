$(document).ready(function() {

    //define variables
    var whereSelect = $('#where-select');
    var whenSelect = $('#when-select');
    var qtySelect = $('#qty-select');
    var totalCost = $('#total-cost');
    var errorMsg = $("#errorMsg span");
    var whenInfo = $("#when-info");
    var discountMsg = $("#discount-text");
    var fareData = {};
    var qtyMax = 11; 

    //watch for changes on selects and update variables with values
    $(document).on('change', '.calc-select', function() {
        //display information text
        if ($(whenSelect, 'option:selected').val()) {
            whenInfo.text(whenSelect.find('option:selected').attr('rel'));
        }

        if (checkSelects()) {
            calculateFare();
        }
    });

    //check is all options have been selected before calculating
    function checkSelects() {
        var allSelected = true;
        $('.calc-select').each(function() {
            if ($(this).val() === "") {
                allSelected = false;
            }
        });
        if (allSelected) {
            return true;
        } else {
            discountMsg.text("* please select all fields to calculate your fare");
            return false;
        }
    }

    //fetch json data
    //change below URL param for future server integration 
    function getFareData() {
        $.ajax({
            url: 'fares.json',
            type: 'GET',
            dataType: 'json',
            success: insertFareData,
            error: function(data) {
                errorMsg.text("Could not fetch fare data, please try again.");
            }
        })
    }

    //insert data into form
    function insertFareData(data) {
        
        fareData = data;
        //zone data
        var zones = fareData.zones;
        //time of travel data
        var times = fareData.info;
        //user friendly readable names
  
        var timeNames = {
            "anytime": "Anytime" ,
            "weekday" : "Weekday",
            "evening_weekend": "Evening/Weekend"
        };

        //insert zone data
        $.each(zones, function(index, value) {
            whereSelect.append($("<option>", {
                value: value.zone,
                text: value.name
            }));
        });

        //insert time of travel data
        $.each(times, function(index, value) {
            if(Object.keys(timeNames).indexOf(index) != -1 ) { 
                whenSelect.append($("<option>", {
                    value: index,
                    text: timeNames[index],
                    rel: value
                }));
            }
        });

        //insert qty select data
        for (i = 1; i < qtyMax; i++) {
            qtySelect.append($("<option>", {
                value: i,
                text: i
            }));
        }
    }

    //calculate train fare total
    function calculateFare() {
        var calculatedTotal = 1000;
        //clear message
        discountMsg.text("");
        //all fares for this zone
        var zoneFares = fareData['zones'][whereSelect.val() - 1]["fares"];
        //calcuate 10 trip price discount
        var tenTripPrice = fareData['zones'][whereSelect.val() - 1]['fares'][4]['price'];

        //check if 10 trip discount is chosen
        if (qtySelect.val() == 10) {
            calculatedTotal = tenTripPrice;
            $('#advance_purchase').prop("checked", true);
            $("#when select").val("anytime");
            whenInfo.text(whenSelect.find('option:selected').attr('rel'));
            discountMsg.text("*10 trip discount price (can only be purchased at a station kiosk)");

        } else {
            // choose evening/weekend price if anytime is chosen
            if (whenSelect.val() == "anytime") {
                if ($('input[name=purchase_where]:checked').val() == "advance_purchase") {
                    calculatedTotal = zoneFares[0]["price"] * qtySelect.val();
                } else {
                    calculatedTotal = zoneFares[1]["price"] * qtySelect.val();
                }
            } else {
                // iterate over fares and find matching price
                $.each(zoneFares, function(index, value) {
                    if (whenSelect.val() == value["type"] && $('input[name=purchase_where]:checked').val() == value["purchase"]) {
                        calculatedTotal = value["price"] * qtySelect.val();
                    }
                });
            }
            discountMsg.text("");
        }

        //suggest 10 trip ticket if cost is greater than the discount cost 
        if (calculatedTotal > tenTripPrice) {
            var diff = calculatedTotal - tenTripPrice;
            discountMsg.text("* buy a 10-trip ticket at a station kiosk and save " + "$" + diff.toFixed(2));
        }

        //format calculated total
        totalCost.text("$" + calculatedTotal.toFixed(2));
    }

    //fetch the fare data 
    getFareData();

});
