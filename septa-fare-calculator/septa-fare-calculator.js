(function ($) {

  var $form = $('#sfc-form')

  var setCost = function (value) {
    $('#sfc__cost').text('$' + value.toFixed(2))
  }

  var setHelperText = function (text) {
    $('#sfc__notice').text(text)
  }

  var serializedArrayToObject = function (array) {
    var obj = {};

    for (var i = 0, l = array.length; i < l; i++) {
      var item = array[i]
      var value = item.value
      obj[item.name] = isNaN(value) ? value : +value
    }

    return obj;
  }

  // A cheap little replacement for Array.prototype.find
  var first = function (arr, cb) {
    var results = $.grep(arr, cb)

    return results.length
      ? results[0]
      : undefined
  }

  var calculate = function (options, fareData) {
    // Convert the Array to a simple Object...
    options = serializedArrayToObject(options)

    // We'll count down the trips from here....
    var remainingTrips = options.trips
    var cost = 0

    // Get the right zone...
    var zone = first(fareData.zones, function (zone) {
      return zone.zone === options.zone
    })

    // Sorting these in reverse trip order in case there's a special trips count at some point...
    var fares = zone.fares.sort(function (a, b) {
      return b.trips - a.trips
    })

    // Let's keep finding a fare till there's no more trips...
    while (remainingTrips > 0) {
      var fare = first(fares, function (fare) {
        // It seems like buying 10 in advance is a discount...
        if (remainingTrips >= 10 && options.purchase === 'advance_purchase') {
          return fare.trips === 10
        } else {
          // Otherwise just grab the most appropriate...
          return fare.trips <= remainingTrips 
            && fare.purchase === options.purchase 
            && fare.type === options.type
        }
      })

      // Add to the cost, remove the remaining trips...
      cost = cost + fare.price
      remainingTrips = remainingTrips - fare.trips
    }

    setCost(cost)
    setHelperText(fareData.info[options.type])
  }

  var init = function (fares) {
    // Whenever a change event bubbles up to the form recalculate...
    $form.on('change', function () {
      calculate($form.serializeArray(), fares)
    }).trigger('change')

    $form.on('submit', function (event) {
      event.preventDefault()
    })
  }

  // Get the fares, start up the UI.
  $.getJSON('fares.json').then(function (fares) {
    init(fares)
  })

}(jQuery))
