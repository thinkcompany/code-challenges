	jQuery(function(){

	//Fetch to the json fares files to populate the select options for the fares calculator
		jQuery.getJSON('fares.json', function(data) {
			var zoneOptions = '';
			var purchaseOptions = '';
			var septaWhere ='';
			var septaWhen ='';
			var septaPurchasePlace ='';
			var septaFaresNum ='';
			var septaFarePrice = '';
			for (var i = 0; i < data.zones.length; i++) {
			//Where are you going?
			zoneOptions += '<option value="' + data["zones"][i]["zone"] + '">' + data["zones"][i]["name"] + '</option>';
			//When are you riding?
			//I considered adding "type_nicename" to fares.json for dynamic population of that dropdown, but I assumed for this exercise that the JSON wouldn't be under my direct control, and that the "times" wouldn't change so I could hardcode it
			//timeOptions += '<option value="' + data["zones"][i]["type"] + '">' + data["zones"][i]["type_nicename"] + '</option>';         
			};
			jQuery('#septa-zones-traveling').html(zoneOptions);
	     });
	   
	 //Update helper text for the difference between "Weekday" and "Evenings/Weekends" 
	 //realized late that these and kiosk/onboard decriptions are in json as well.... facepalm
		jQuery('#septa-ride-timing').change(function() {
			if(jQuery(this).val() == 'weekday') {
				purchaseOptions = 'Weekday hours are Monday through Friday, between 4:00 a.m. and 7:00 p.m.'; 
			} else {
				purchaseOptions = 'Evening hours are Monday through Friday after 7:00 p.m. Weekend hours are all day Saturday, Sunday, and on major holidays.'
			};
			jQuery('#septa-ride-timing-info').html(purchaseOptions);
		});
	   

	 
	 //this needs to be made a function for change and onload
		jQuery('#septa-fares-calc').change(function() { 
		 updatePrice();
		});
	   
	   
   }); //end jquery load function
	
//Calculation!
function updatePrice() {
		var fareCount = '';
		var fareArrayLength = '';
		var zone = '';
		var septaFarePrice = '';
		//get current input values
			septaWhere = jQuery('#septa-zones-traveling').val();
			septaWhen = jQuery('#septa-ride-timing').val();
			septaPurchasePlace = jQuery('input:radio[name ="septa-fare-place"]:checked').val();
			septaFaresNum = jQuery('#septa-fares-number').val();
			
			//adjust to 'anytime' for bulk cost if buying more than 10 tickets in advance
			if( (septaFaresNum >= 10) && (septaPurchasePlace == 'advance_purchase') ) { septaWhen == 'anytime';}
			
		
		//find a match in the JSON

			jQuery.getJSON('fares.json', function(data){
			
				for (var i = 0; i < data["zones"].length; i++) { 
				zone = data['zones'][i]['zone'];
			//wanted to the line below to be data['zones'][zone]['fares'] so it only searches the selected zone, but no time to debug in this case for a negligble performance gain
				jQuery.each(data['zones'][i]['fares'], function(index, value){	
			
					if( (zone == septaWhere) && (value['type'] == septaWhen) && (value['purchase'] == septaPurchasePlace) )
					{
					septaFarePrice = value['price'];
					if(septaFaresNum < 10) { 
					//multiply ticket price by number of tickets - this needs to be further adjusted (modulo?) to account for numbers higher than 10
					septaFarePrice = septaFarePrice*septaFaresNum;
					}
					
					jQuery("#septa-fare").html("$" + septaFarePrice.toFixed(2));
					} else {
					//no match, something's wrong
					//console.log("nada, price: " + septaFarePrice);
					};					
					});
					// end each
				}
			});



};