// Just going with an IIFE and revealing module pattern for this since there's not much to it.
// This could easily be written as a module and loaded via RequireJS or something.
// Or built as React components if there was a large enough application to warrant all that.
var fareCalc = (function () {
  // Cache our fare data for faster lookups
  var dataCache = null;

  /**
   * Build the calculator form based on SEPTA data.
   */
  function buildForm()
  {
    // TODO:
    // Would have liked to dynamically build form based on JSON data
    console.log('build form');
  }

  /**
   * Lookup SEPTA fare data. Used to calculate fare based on various
   * user inputs.
   *
   * @param  {string} url      URL from which to request data
   * @param  {Object} fareForm The fare calculator form
   */
  function getFareData(url, fareForm)
  {
    // Don't fetch if we have a cache
    //
    // TODO:
    // Timed/etc invalidation would be nice
    if (dataCache !== null) {
      return;
    }

    // We can't have nice things. Because IE8.
    var request = new XMLHttpRequest();

    request.open('GET', url, true);
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
          var data = JSON.parse(this.responseText);
          buildForm();
          attachHandlers(fareForm);
          calculateFare(fareForm, data);
        } else {
          // TODO:
          // Better error handling UX
          console.error('Could not parse SEPTA data');
        }
      }
    };

    request.send();
    request = null;
  }

  /**
   * Get data for the currently selected zone.
   *
   * @param  {Object} zones        SEPTA fare data for all zones
   * @param  {string} selectedZone Currently selected zone
   * @return {Object}              Fare data for current zone
   */
  function getZoneData(zones, selectedZone)
  {
    for (var i = 0, len = zones.length; i < len; i++) {
      if (zones[i].zone === Number(selectedZone)) {
        return zones[i];
      }
    }
  }

  /**
   * Get the data for the currently selected ticket type.
   *
   * @param  {Object} fares        Fare data for all zones
   * @param  {string} selectedType Currently selected type value
   * @return {Object}              Fare data for current zone and type
   */
  function getTypeData(fares, selectedType)
  {
    var data = [];

    for (var i = 0, len = fares.length; i < len; i++) {
      if (fares[i].type === selectedType) {
        data.push(fares[i]);
      }
    }

    return data;
  }

  /**
   * Get the price for the currently selected options.
   *
   * @param  {string} type             Type of ticket. e.g., weekday
   * @param  {string} selectedPurchase Currently selected purchase value
   * @return {number}                  Fare price
   */
  function getPrice(type, selectedPurchase)
  {
    for (var i = 0, len = type.length; i < len; i++) {
      if (type[i].purchase === selectedPurchase) {
        return type[i].price;
      }
    }
  }

  /**
   * Calculator the fare based on form values.
   *
   * @param  {Object} fareForm The fare calculator form
   * @param  {Object} data     SEPTA fare data
   */
  function calculateFare(fareForm, data)
  {
    // Cache the data
    if (dataCache === null) {
      dataCache = data;
    }

    var els = fareForm.elements;

    // TODO:
    // Type cannot be "anytime" with a trips value != 10

    // TODO:
    // Should type auto-change to "anytime" if trips value == 10?
    // Otherwise post message about discount to improve UX
    // What about values over 10? Possible?

    // TODO:
    // This is slow and buggy. Better to improve the caching to
    // avoid all these lookups. Should only need to recompute
    // based on changed data.
    // e.g., If only trips number changes, skip to the end.
    // If only type changes, we can skip the zone lookup.
    // et cetera...
    var zone = getZoneData(dataCache.zones, els.zone.value);
    var type = getTypeData(zone.fares, els.type.value);
    var price = getPrice(type, els.purchase.value);

    var amount = document.querySelector('.js-fare-amount');
    // TODO:
    // If "anytime", price isn't calculated the same.
    amount.innerText = '$' + (price * Number(els.trips.value)).toFixed(2);
  }

  /**
   * Attach event handlers to the form fields.
   *
   * @param  {Object} fareForm The fare calculator form
   */
  function attachHandlers(fareForm)
  {
    // Don't submit the form when using JS to calculate
    fareForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    // Update the fare amount if any field value changes
    fareForm.addEventListener('change', function (evt) {
      calculateFare(evt.currentTarget);
    });
  }

  return {
    /**
     * Initialize the fare calculator.
     *
     * @param  {string} selector Form selector
     */
    init: function (selector) {
      var fareForm = document.querySelector(selector);
      getFareData('fares.json', fareForm);
    }
  };
})();

fareCalc.init('.js-fare-calc');
