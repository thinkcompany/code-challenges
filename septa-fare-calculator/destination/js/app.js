function fare(type, purchase, trips, price) {
	var self = this;

	self.type = type;
	self.purchase = purchase;
	self.trips = trips;
	self.price = price;

}

function time(label, info) {
	var self = this;

	self.label = label;
	self.info = info;
}

function SeptaViewModel() {
	var self = this;

	self.timesJSON = ko.observableArray();
	self.zonesJSON = ko.observableArray();

	self.selectedZone = ko.observable();
	self.selectedTime = ko.observable();
	self.selectedPurchaseMethod = ko.observable();
	self.rideCountRaw = ko.observable();
	self.rideCountClean = ko.computed(function() {
		var value = Number(self.rideCountRaw());

		return value;
	});

	self.timesOptions = ko.computed(function() {
		var options = [];
		ko.utils.objectForEach(self.timesJSON(), function(label, description) {
			options.push(label);
		})

		return options;
	});

	self.timesDescriptions = ko.computed(function() {
		var options = [];
		ko.utils.objectForEach(self.timesJSON(), function(label, description) {
			options.push(description);
		})

		return options;
	});

	
	self.availableZones = ko.computed(function() {
		var options = [];
		ko.utils.objectForEach(self.zonesJSON(), function(index, zoneObject) {
			options.push(zoneObject.name);
		})


		return options;
	});

	self.fareResult = ko.computed(function() {
		var zone = self.selectedZone();
		var time = self.selectedTime();
		var purchaseMethod = self.selectedPurchaseMethod();
		var tripCount = self.rideCountClean();

		if (typeof zone != "undefined" && typeof time != "undefined" && typeof purchaseMethod != "undefined" && !isNaN(tripCount)) {
			var thisZone =  ko.utils.arrayFilter(self.zonesJSON(), function(zoneObject) {
								return zoneObject.name === zone;
							})[0];

			var thisFare =  ko.utils.arrayFilter(thisZone.fares, function(fareObject) {
								return fareObject.purchase === purchaseMethod && fareObject.type == time;
							})[0];

			var totalValue = thisFare
		}		
	});
}

var septaViewModel = new SeptaViewModel();

ko.applyBindings(septaViewModel);

$.ajax({
      url: "/fares.json",
      dataType: "json",
      success: function(data) {
           septaViewModel.timesJSON(data.info);
           septaViewModel.zonesJSON(data.zones);
      }
});

