
// AUTHOR - JACKIE HARNISH

$(document).ready( function () {

	// create array to hold helper information
	var info = [];
	// create array to hold fare options
	var zone_fares = [];
	// create select options for where are you going?
	var where_str = '';
	// load in fares.json dynamically
    $.getJSON("fares.json", function(result){
    	// get info
    	info = result['info'];
    	// get zones
    	$.each(result['zones'], function(i, zone) {
    		where_str += '<option value="' + i + '">' + zone['name'] + '</option>';
    		var zone_fare_arr = [];
    		$.each(zone['fares'], function(j, fare) {
    			var fare_obj = {
    				'id' : j,
    				'type' : fare['type'],
    				'purchase' : fare['purchase'],
    				'trips' : fare['trips'],
    				'price' : fare['price'] / fare['trips']
    			};
    			zone_fare_arr.push(fare_obj);
    		});
    		zone_fares.push(zone_fare_arr);
    	});
    	// end where are you going? select box and add it to html placeholder
    	$('#septa-fare-calc-zones')[0].innerHTML = where_str;
    });

    // on change of all fields, recalculate total cost
    $('#septa-fare-calc-zones').on('change', function() {
    	calcTotal(zone_fares);
    });
    $('#septa-fare-calc-time').on('change', function() {
    	if($(this).val() == 'anytime'){
    		console.log($('#septa-fare-tickets'));
    		$('input[name=septa-fare-purchase][value=onboard_purchase]').attr('disabled', true);
    		$('#septa-fare-tickets').attr('min', 10);
    		$('#septa-fare-tickets').val(10);
    	} else {
    		$('input[name=septa-fare-purchase][value=onboard_purchase]').attr('disabled', false);
    		$('#septa-fare-tickets').attr('min', 1);
    	}
    	calcTotal(zone_fares);
    	$('#septa-fare-calc-time-helper-placeholder')[0].innerHTML = info[$(this).val()];
    });
    $('input[name=septa-fare-purchase]').on('change', function() {
    	calcTotal(zone_fares);
    	$('#septa-fare-purchase-helper-placeholder')[0].innerHTML = info[$(this).val()];
    });
    $('#septa-fare-tickets').on('keyup mouseup', function() {
    	calcTotal(zone_fares);
    });

});

function calcTotal(zone_fares) {
	// get all values in form
	var zone = $('#septa-fare-calc-zones').val();
	var time = $('#septa-fare-calc-time').val();
	var loc = $('input[name=septa-fare-purchase]:checked').val();
	var num = $('#septa-fare-tickets').val();
	console.log('zone = ' + zone + ' time = ' + time + ' loc = ' + loc + ' num = ' + num);
	$.each(zone_fares[zone], function(i, rates) {
		var total_cost;
		// find the correct rate object and calculate total
		if(time == rates.type && loc == rates.purchase) {
			total_cost = rates.price * num;
		}
		// add total to widget in total placeholder div
		if(total_cost) {
			$('#septa-fare-total')[0].innerHTML = '$' + total_cost.toString();
		} 
	});
}