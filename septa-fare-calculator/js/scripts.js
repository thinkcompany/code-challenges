
// Get JSON data
$.ajax({
	url: "fares.json",
	dataType: "json",
	success: function(data) {

		// Append each zone to select field
		$.each(data.zones, function(i) {
			var zone = "<option value='" + data.zones[i].zone + "'>" + data.zones[i].name; + "</option>";
      $("#zonesList").append(zone);
    });

	 	// Update fare when new zone is selected
	 	$("#zonesList").change(function(){

	 		// Get zone id from selection
	 		var val = parseInt($(this).val());
	 		console.log("You selected Zone " + val);

	 		// Get number of trips
	 		var trips = parseInt($("#trips").val());
	 		console.log("Trips:" + trips);

	 		// Convert val into an array value
	 		var arrayVal = val - 1;

	 		// Get price
	 		var price = parseFloat(data.zones[arrayVal].fares[0].price);
	 		console.log("Price:" + price);

	 		// Calculate total
	 		var total =  parseFloat(price * trips);
	 		console.log("Total:" + total);

	 		$("#fareTotal").html("$ " + total);

	 	});

	}
});