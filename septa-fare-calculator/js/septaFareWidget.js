// pull data from fares.json
$.ajax({
	url: 'fares.json',
	dataType: 'json',
	error(err) {
		console.log(err)
	}
}).then(function(fares){
	// init form with time-based data
	updateForm();
	// on form input, update the fare
	$(".septaFareWidget__form").on('input', updateFare)

	// when a radio button changes, trigger input on the form (doesn't happen by default)
	$("input[name=septaFareWidget__location").on('change', function(){
		$(".septaFareWidget__form").trigger("input");
	})

	// update form based on what time is selected
	$("select[name=septaFareWidget__time]").on('change', updateForm)

	function updateFare() {
		var result = '?',
			zone = $("select[name=septaFareWidget__zone]").val(),
			time = $("select[name=septaFareWidget__time]").val(),
			location = $("input[name=septaFareWidget__location]:checked").val(),
			tickets = $("input[name=septaFareWidget__tickets]").val();

		// set fare to 0 if missing information
		if (!zone || !time || !location || !tickets) {
			console.log('not enough info');
			$(".septaFareWidget__fare").text('$0.00');
		}
		// otherwise, calculate the fare
		else {
			var fareIndex;

			if ( time === '2') { fareIndex = 4 }
			else { fareIndex = time * 2 + parseInt(location) }

			result = fares.zones[zone-1].fares[fareIndex].price * tickets;

			$(".septaFareWidget__fare").text('$' + result.toFixed(2));
		}
		
	}

	function updateForm() {
		var $time = $("select[name=septaFareWidget__time]"),
			$onboard = $('#septaFareWidget__location--onboard'),
			$onboardLabel = $('#septaFareWidget__location--onboardLabel'),
			$ticketsLabel = $('#septaFareWidget__tickets--label'),
			$timeInfo = $("#septaFareWidget__time--info")

		if ( $time.val() === '2' ) {
			$onboard.attr("disabled", true);
			$onboardLabel.css("opacity", .3);
			$ticketsLabel.text('How many sets of 10 rides will you need?');
			$timeInfo.text(fares.info.anytime + '. Ticket can only be purchased at a station kiosk.');
		} else if ( $time.val() === '1' ) {
			$onboard.attr("disabled", false);
			$onboardLabel.css("opacity", 1);
			$ticketsLabel.text('How many rides will you need?');
			$timeInfo.text(fares.info.evening_weekend);
		} else {
			$onboard.attr("disabled", false);
			$onboardLabel.css("opacity", 1);
			$ticketsLabel.text('How many rides will you need?');
			$timeInfo.text(fares.info.weekday);
		}
	}

})