// var $zone  = $('#zone');
// var $time  = $('#time');
// var $radio = $('#radio');
// var $fareTotal = $('#fare-total');
// 
// $.getJSON('fares.json', function(data){
// 	$zone.html('');
// 	$time.html('');
// 	$radio.html('');
// 	$fareTotal.html('');
// 	
// 	for (i = 0; i < data['zones'].length; i++) {
// 		$zone.append('<option class="' + data['zones'][i]['name'] + '">' + data['zones'][i]['name'] + '</option>');
// 		$time.append('<option>' + data['zones'][i]['fares'][i]['type'] + '</option>');
// 		$fareTotal.append('<h2 class="">$' + data['zones'][i]['fares'][i]['price'] + '</h2>');
// 	}
// });

// $(function() {
// 	var $zone = $('#zone');
//   	var $time = $('#time');
//   	var $radio = $('#radio');
//   	var $fareTotal = $('#fare-total');
//   	$.getJSON('fares.json', function(data) {
//       	$.each(data.zones, function(i, zone) {
//     		$zone.append($("<option>", {
//           		class: zone.name
//         	}).html(zone.name));
//         	
//         	$('#zone option:selected').each(function() {
//         		if ($(this).is(':selected')) {
//         			$time.append($("<option>", {
//           				class: zone.fares.type
//         			}).html(zone.fares[i].type));
//         		}
//         	});
//         	
// //         	$('#time option:selected').each(function() {
// //         		if ($(this).is(':selected')) {
// //         			$fareTotal.append($("<h2>", {
// //           				class: zone.fares.price
// //         			}).html(zone.fares[i].price[1]));
// //         		}
// //         	});
//         	
//         	//$time.append($("<option>").html(zone.fares[i].type));
//         	//$fareTotal.append($("<h2>").html(zone.fares[i].price));
//       	});
// 	});
// });

// $(document).ready(function() {
//   var $zone = $('#zone');
//   var $time = $('#time');
//   var $radio = $('#radio');
//   var $fareTotal = $('#fare-total');
//   $.getJSON('fares.json', function(data) {
//     $zone.html('');
//     $time.html('');
//     $radio.html('');
//     $fareTotal.html('');
//       
// 	$.each(data.zones, function(i, zone) {
// 		
// 		var htmlOption = '<option value="0">Default</option>';
// 		
// 		$zone.append($('<option value="' + zone.zone +'">', {
//         	class: zone.name
//         }).html(zone.name));
//         
//         if ($zone !== '0') {
//         	$.each(zone, function() {
//         		htmlOption += '<option value="' + zone.zone + '">' + zone.fares[i] + '</option>';
//       		});
//         }
//         $time.html(htmlOption);
//         
//         //$time.append($("<option>").html(zone.fares[i].type));
//         //$fareTotal.append($("<h2>").html(zone.fares[i].price));
//         
//       });
//       
// 	});
// });

$(document).ready(function() {
	var $zone = $('#zone');
  	var $time = $('#time');
  	var $radio = $('#radio');
  	var $fareTotal = $('#fare-total');
  	
  	$.getJSON('fares.json', function(data) {
  		var jData = data;
  		var options_zones = '<option>Select<\/option>';
  		
		$.each(data.zones, function(i, zone){
			options_zones += '<option value="' + zone.zone + '">' + zone.name + '<\/option>';
		});
		$($zone, this).html(options_zones);
		
		$($zone, this).change(function(){
			var index = $(this).get(0).selectedIndex;
			var d = data[index-1];  // -1 because index 0 is for empty 'Select' option
			var options_time = '<option>Select<\/option>';
			if (index > 0) {
				$.each(data.zones, function(i, time) {
        			options_time += '<option value="' + time.zone + '">' + time.fares[i].type + '</option>';
      			});
			} else {
				options_time += '<option>Select<\/option>';
			}
			$($time).html(options_time);
		});
		
		$($time, this).change(function(){
			var index = $(this).get(0).selectedIndex;
			var d = data[index-1];  // -1 because index 0 is for empty 'Select' option
			var options_price = '';
			if (index > 0) {
				$.each(data.zones, function(i, price) {
        			options_price += '<h2>$' + price.fares[i].price + '</h2>';
      			});
			} else {
				options_price += '<h2>$0.00</h2>';
			}
			$($fareTotal).html(options_price);
		});
  	});
});





