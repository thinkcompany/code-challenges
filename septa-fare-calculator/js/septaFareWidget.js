// pull data from fares.json
$.ajax({
	url: 'fares.json',
	dataType: 'json',
	error(err) {
		console.log(err)
	}
}).then(function(fares){
	// on form input, update the fare
	$("#septaFareWidget__form").on('input', updateFare)

	// when a radio button changes, trigger input on the form (doesn't happen by default)
	$("input[name=septaFareWidget__location").on('change', function(){
		$("#septaFareWidget__form").trigger("input");
	})

	function updateFare() {
		console.log('hi');
	}

})