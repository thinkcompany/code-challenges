const faresURL = 'https://raw.githubusercontent.com/YourMobileGeek/code-challenges/master/septa-fare-calculator/fares.json';
let faresData;
const zoneLocation = $("[data-selector-name='zone-location']"),
dayOption = $("[data-selector-name='day-option']"),
numTripsSelect = $("[data-selector-name='amt-trips-selected']"),
helpText = $("[data-selector-name='help-info']"),
fareDisplay = $("[data-selector-name='fare-total']");

// this function will run when document loads
$(document).ready(function () {

    // retrieves get fares from fares.json file
    getFares();

    // apply 'onChange' eventListener to form when the user changes the selected option
    $('.fares-container').on('change', function (event) {
        const userInput = parseForm();

        // update form display based on users selection
        updateForm(userInput);

        // if what user selected is invalid the fare will reset to 0
        if (isNaN(userInput.zone) || userInput.time === '') {
            resetFare();
        } else {
            calculateAndDisplayFare(userInput);
        }      
    });

});

// properly fetches json file which has the correct zone pricing data 
function getFares() {
    $.getJSON(faresURL, function (response) {
        faresData = response;

        populateForm();
    });
}

// populate select list for zones and helper text display
function populateForm() {
    populateZones(faresData.zones);
    populateHelperText(faresData.info);
}

// populates options for select zone
function populateZones(zones) {
    for (var key in zones) {
        zoneLocation.append($('<option></option>')
            .attr('value', zones[key].zone)
            .text(zones[key].name));
    }
}

// populate info for helper text display for chosen day of travel
function populateHelperText(info) {
    helpText.append(`<p><b>Weekday:</b> ${info.weekday}</p>
            <p><b>Evening/Weekend:</b> ${info.evening_weekend}</p>
            <p><b>Anytime:</b> ${info.anytime}</p>`);
}

// checks selected purchase option whether station kiosk or onboard
function getSelectedPurchaseOption() {
    if ($('#station-kiosk').prop('checked'))
        return 'advance_purchase';
    
    if ($('#onboard').prop('checked'))
        return 'onboard_purchase';
}

// reset function that resets fare display to 0
function resetFare() {
    fareDisplay.text('$0.00');
}

// properly calculates and display fare for selected inputs
function calculateAndDisplayFare(userInput) {
    const selectedZone = faresData.zones.find(x => x.zone === userInput.zone);
    let totalFare;
    let fareTier;

    if (userInput.time === 'anytime') {
        fareTier = selectedZone.fares.find(x => x.type === 'anytime');
        totalFare = fareTier.price;
    } else {
        fareTier = selectedZone.fares.find(x => x.type === userInput.time && x.purchase === userInput.purchaseType);
        totalFare = fareTier.price * userInput.numTrips;
    }

    fareDisplay.text(`$${totalFare.toFixed(2)}`);
}

// parse all input data controls for user input.
function parseForm() {
    let zone = parseInt(zoneLocation.val());
    let time = dayOption.val();
    let purchaseType = getSelectedPurchaseOption();
    let numTrips = parseInt(numTripsSelect.val());

    const inputs = {
        zone,
        time,
        purchaseType,
        numTrips
    };

    return inputs;
}

// if statement evaluates if 'anytime' is selected, to set number of trips to 10 
// else enables trips 'onboard' option. 
function updateForm(userInput) {
    if (userInput.time === 'anytime') {
        numTripsSelect.val(10);
        numTripsSelect.prop('disabled', true);
        
        $('#station-kiosk').prop('checked', true);
        $('#onboard').prop('disabled', true);
    } else {
        numTripsSelect.prop('disabled', false);
        $('#onboard').prop('disabled', false);
    }
}