// pull data from fares.json
$.ajax({
	url: 'fares.json',
	dataType: 'json',
	error(err) {
		console.log(err)
	}
}).then(function(fares){
	// everything fires off inside of this callback, which means this script has no global footprint other than the AJAX request

	// update the form to initialize
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
		// grabs data from the form and updates the fare accordingly
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
		// depending on the selected time, changes a couple elements
		// 1) Label for number of tickets
		// 2) Whether or not "Onboard" is selectable (opacity set to .3 when disabled, 1 when active)
		// 3) Info label for what each time means
		var $time = $("select[name=septaFareWidget__time]"),
			$onboard = $('#septaFareWidget__location--onboard'),
			$onboardLabel = $('#septaFareWidget__location--onboardLabel'),
			$ticketsLabel = $('#septaFareWidget__tickets--label'),
			$timeInfo = $("#septaFareWidget__time--info")

		if ( $time.val() === '2' ) {
			$onboard.attr("disabled", true);
			$onboardLabel.css("opacity", .3);
			$ticketsLabel.text('How many sets of 10 rides will you need?');
			// added a line of text to the existing info for 'Anytime' to be more informative.
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