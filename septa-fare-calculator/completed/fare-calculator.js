(function(){

	// wait for page load
	if (window.addEventListener)
 		window.addEventListener('load', onLoad);
	else
		window.attachEvent('onload', onLoad); // IE8

	// load fare data from live json file
	function onLoad()
	{
		loadJson('https://raw.githubusercontent.com/thinkcompany/code-challenges/master/septa-fare-calculator/fares.json', initWidget);
	}

	// object that will store the state of the widget (fareData json, and selected options) and calculate the cost
	calculator = {
	};

	// calculate the cheapest possible price for the desired travel inputs
	calculator.calculate = function()
	{
		// find the fare list of the selected zone
		var fares;
		for(var zone = 0; zone < this.fareData.zones.length; zone++)
			if (this.fareData.zones[zone].name === this.zone)
				fares = this.fareData.zones[zone].fares;

		// find the fare that matches the trip time and purchase options
		var price, trips;
		for(var fare = 0; fare < fares.length; fare++)
			if (fares[fare].type === this.time && fares[fare].purchase === this.purchase)
			{
				price = fares[fare].price;
				trips = fares[fare].trips;
			}

		var result = '$ -'; // error message by default

		// matching fare and price will not be found when "anytime" and "onboard" are selected
		if (price)
		{
			var tickets = 0;
			// increase number of tickets until the allowed amount of trips is => the # of trips needed
			while(tickets*trips < this.rides)
				tickets++;

			// dollar amount of the tickets
			var amount = tickets*price;

			result = '$'+amount.toFixed(2);
		}
		// with more time, I would display exactly what combination of tickets is the cheapest (eg, 2 x anytime tickets = 20 trips) below the dollar amount. there may also be further price optimizations that the widget could check for depending on the ticket prices (eg, if you need 15 rides, it might be cheaper to buy 1 anytime ticket and 5 day tickets rather than 2 anytime tickets)

		document.getElementById('fare-calculator-result-amount').innerHTML = result;
	}

	// start widget
	function initWidget(fareData)
	{
		calculator.fareData = fareData;
		populateSelectBox('fare-calculator-zone-input', getZones(fareData));
		populateInfo(fareData);
		attachListeners('select, input', 'input', handleInputChange);
	}

	// async load fare data from Think repo
	function loadJson(path, callback)
	{
		var xhr = new XMLHttpRequest();
		xhr.open('GET', path, true);
		xhr.onload  = function()
		{
			callback(JSON.parse(xhr.responseText)); // return json object
		};
		xhr.send();
	}

	// get a list of zone names from fare data
	function getZones(fareData)
	{
		var zones = [];
		for(var zone = 0; zone < fareData.zones.length; zone++)
			zones.push(fareData.zones[zone].name);

		return zones;
	}

	// populate dom select boxes from fare data
	function populateSelectBox(id, options)
	{
		for(var option = 0; option < options.length; option++)
		{
			var item = document.createElement('option');
			item.value = options[option];
			item.innerHTML = options[option];
			document.getElementById(id).appendChild(item);
		}
	}

	// populate helper/info sections
	function populateInfo(fareData)
	{
		for(var key in fareData.info)
		{
			var element = document.querySelector('[data-option='+key+']');
			if (element)
				element.innerHTML = fareData.info[key];
		}
	}

	// listen for user changes to input
	function attachListeners(query, event, callback)
	{
		var elements = document.querySelectorAll(query);
		for(var element = 0; element < elements.length; element++)
		{
			elements[element].oninput = callback;
			triggerEvent(elements[element], event);
		}
	}

	// handle changing input
	function handleInputChange(event)
	{
		// give updated property to the calculator object
		var element = event.target;
		switch(element.dataset.question)
		{
			case 'zone':
			calculator.zone = element.value;
			break;
			case 'time':
			calculator.time = element.options[element.selectedIndex].value;
			break;
			case 'purchase':
			calculator.purchase = element.options[element.selectedIndex].value;
			break;
			case 'rides':
			calculator.rides = Math.max(1, parseInt(element.value) || 1);
			element.value = calculator.rides;
			break;
		}
		
		showInfo(element); // update shown helper info
		calculator.calculate(); // update calculation
	}

	// trigger event manually
	function triggerEvent(element, type)
	{
		if (document.dispatchEvent)
		{
			var event = document.createEvent('HTMLEvents');
			event.initEvent(type, false, true);
			element.dispatchEvent(event);
		}
		else // IE
		{
			var event = document.createEventObject();
			event.type = type;
			element.fireEvent('on'+type, event);
		}
	}

	// show helper text for a question if it has any
	function showInfo(selectElement)
	{
		if (!selectElement.dataset.helper)
			return;

		var helperSection = document.getElementById(selectElement.dataset.helper); // find the section containing the helper text corresponding to the question
		var selectedOption = selectElement.options[selectElement.selectedIndex].value;
		for(var child = 0; child < helperSection.children.length; child++)
		{
			// find the helper text corresponding to the selected option and display it, and hide the others
			var helper = helperSection.children[child];
			if (helper.dataset.option === selectedOption)
				helper.style.display = 'block';
			else
				helper.style.display = 'none';
		}
	}

})();