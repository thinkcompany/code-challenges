window.addEvent('domready', function(){

	var info 	= {};
	var zone_1 	= [];
	var zone_2 	= [];
	var zone_3 	= [];
	var zone_4 	= [];
	var zone_5 	= [];

	var server = new Request.JSON({
		url: 'fares.json',
		onSuccess: function( json, xml ){
			cosnole.log(json);
			info 	= json.info;
			zone_1 	= json.zones[ 0 ];
			zone_2 	= json.zones[ 1 ];
			zone_3 	= json.zones[ 2 ];
			zone_4 	= json.zones[ 3 ];
			zone_5 	= json.zones[ 4 ];


		}
	});

	server.send();

	console.log(zone_1);
	$('numeric-value').empty().appendText(zone_1.fares[0].price);

	$('zone_select').addEvent('change', function(e){
		var value = e.target.value;
	});

	$('departure_select').addEvent('change', function(e){
		var value = e.target.value;

	});


	$('onboard_purchase').addEvent('click', function(e){
		var value = e.target.value;

	});

	$('advance_purchase').addEvent('click', function(e){
		var value = e.target.value;

	});

	$('numeric').addEvent('keyup', function(e){
		var value = e.target.value;

	});

});