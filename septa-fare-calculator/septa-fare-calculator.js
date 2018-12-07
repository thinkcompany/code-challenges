// Wait for document to load before beginning
$(document).ready(function () {

  // Retrieve data from json file
  $.getJSON("fares.json", function(response) {
    return response;
  });

  let info = response.info;
  let zones = response.zones;
  let $septaZones = $("#septa-fare-calculator__zone");
  let $septaTimes = $("#septa-fare-calculator__time");
  let $septaTimesHelper = $(".septa-fare-calculator__time--helper");
  let $septaPurchaseLocation = $("input[name='purchase-location']:checked");
  let $septaNumberOfRides = $("#septa-fare-calculator__ride-count");
  let $septaFareResult = $(".septa-fare-calculator__result");
  let $septaFareAnytime = $(".septa-fare-calculator__anytime");

  //Populate drop-down menu for zones
  function populateZoneDropdown(zones) {
    zones.forEach(function(zone) {
      let option = "<option value=\"" + zone.zone + "\">" + zone.name + "</option>";
      $septaZones.append(option);
    });
  }

  //Populate helper info for times
  function getHelperInfo() {
    let helperText = $septaTimes.val();
    let helperInfo = fares.info[helperText];
    $septaTimesHelper.text(helperInfo);
  }

  // Get zone object based on user's selected zone
  function getZoneData(selectedZone) {
    //SEE IF WORKS ONCE USING JSON
    // zones.forEach(function(zone) {
    //   if ( zone.zone === selectedZone) {
    //     return zone;
    //   }
    // });
    for (let i = 0, len = zones.length; i < len; i++) {
      if (zones[i].zone === selectedZone)
          return zones[i];
    }
    return null;
  }

  // Get string input field's value
  function getStringInputValue(input) {
    return input.val();
  }

  // Get number input field's value
  function getNumberInputValue(input) {
    let inputValue = parseInt(input.val());
    if ($.isNumeric(inputValue)) {
      return inputValue;
    }
    return null;
  }

  function convertToCurrency(value) {
    return "$" + Number(value).toFixed(2);

  }

  //Calculate fare
  function calculateSeptaFare() {

    let selectedZone = getNumberInputValue($septaZones);
    let selectedTime = getStringInputValue($septaTimes);
    let selectedPurchaseLocation = getStringInputValue($septaPurchaseLocation);
    let selectedNumberOfRides = getNumberInputValue($septaNumberOfRides);
    let zoneData,
        zoneFares,
        selectedFare,
        selectedTotal,
        selectedCost,
        anytimeFare,
        anytimeTotal,
        anytimeCost,
        anytimeText,
        anytimeTotalSaved,
        anytimeMoneySaved;

    // Verify that all fields exist before proceeding
    if ( selectedZone !== null && selectedTime !== null && selectedPurchaseLocation !== null && selectedNumberOfRides !== null ) {
      zoneData = getZoneData(selectedZone);
      zoneFares = zoneData.fares;

      // Find fare object that matches user's selections
      zoneFares.forEach(function(fare) {
        if ( fare.type == selectedTime && fare.purchase == selectedPurchaseLocation ) {
          selectedFare = fare;
          return;
        }
      });

      selectedTotal = selectedNumberOfRides * selectedFare.price;
      selectedCost = convertToCurrency(selectedTotal);
      
      // If user wants to buy ten or more tickets at a station, show price for anytime
      // With more time, I would calculate the cost for anytime tickets in groups of ten, and then add the cost for the remaining tickets.
      if ( selectedNumberOfRides >= 10 && selectedPurchaseLocation === "advance_purchase") {
        zoneFares.forEach(function(fare) {
          if ( fare.type == "anytime") {
            anytimeFare = fare;
            return;
          }
        });

        anytimeTotal = selectedNumberOfRides/10 * anytimeFare.price;
        // Verify that anytime total is actually cheaper (it isn't if the user wants to buy 10 evening/weekend tickets)
        if ( anytimeTotal < selectedTotal ) {
          anytimeCost = convertToCurrency(anytimeTotal);
          anytimeTotalSaved = selectedTotal - anytimeTotal;
          anytimeMoneySaved = convertToCurrency(anytimeTotalSaved);
          anytimeText = "We recommend buying 10 Trip Tickets at the station for " + anytimeCost + " to save " + anytimeMoneySaved + ". These tickets can be used anytime.";
          $septaFareAnytime.text(anytimeText);
        }
        else $septaFareAnytime.text("");
      }

      $septaFareResult.text(selectedCost);
    }

    populateZoneDropdown(zones);
    getHelperInfo();
  }

  $($septaTimes).on("change", getHelperInfo);

  //FIX THIS ONE
  $("input[name=purchase-location]").on("change", function() {
    $septaPurchaseLocation = $("input[name='purchase-location']:checked");
    calculateSeptaFare();
  });

  $(".septa-fare-calculator__form").on("change", calculateSeptaFare);


});
