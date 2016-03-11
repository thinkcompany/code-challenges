// The following is data pulled from fares.json
var fares = {
    // values to be populated from API (fares.json)
    information: {},
    zones: [],
    when: ['Anytime', 'Weekday', 'Evening Weekend'],
    purchaseLoc: ['Station Kisok', 'OnBoard'],
    rides: 1,
    appStatus: 'Loading'
};

var viewModel = {
    // dynamic fields from the fares model
    information: ko.observable(),
    zones: ko.observableArray(),
    appStatus: ko.observable(),
    zoneNames: ko.observableArray(),
    purchaseLoc: ko.observableArray(),
    rides: ko.observable(),
    when: ko.observableArray(),

    // app functions
    loadFares: function() {
        // Loads data from the API and
        // populates the 'fares' model.
        var faresJSON = 'fares.json';

        // the async request
        $.getJSON(faresJSON, function(d) {
            var len = d.length;

            // check for data
            if (len === 0) {
                // update the status
                viewModel.status('No data available');
            } else {
                // add fares and zones information to the fares model
                fares.information = d.info;
                fares.zones = d.zones;

                // update the status
                fares.appStatus = 'OK';

                // populate the observables
                viewModel.information(fares.information);
                viewModel.zones(fares.zones);
                viewModel.appStatus(fares.appStatus);

                // run the widget
                viewModel.init();
            }
        }).fail(function() {
            // if the request fails for some reason
            viewModel.appStatus('Failed to load resource.');
        });
    },

    getZones: function() {
        // returns the available zones
        var zones = fares.zones,
            len = zones.length,
            index = 0,
            all_zones = [];

        while (index < len) {
            all_zones.push(zones[index].name);
            index += 1;
        }

        return all_zones;
    },

    init: function() {
        // populate some observables
        this.zoneNames(this.getZones());
        this.when(fares.when);
        this.purchaseLoc(fares.purchaseLoc);
        this.rides(fares.rides);
    }
};

ko.applyBindings(viewModel);
// call to load the data from the API
viewModel.loadFares();