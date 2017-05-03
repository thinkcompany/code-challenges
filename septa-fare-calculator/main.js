var fares = {};
var formData = {};

$( document ).ready(function() {
    $.getJSON('fares.json', function(data) {
        // Get the JSON once and load it into an object.
        fares = data;

        // Give the form an initial state.
        formData = getFormData($( '.fare-form' ));

        flashInfo(formData);
        calculateFare(formData);
    });

    // No need to sumbit the form since we have everything we need.
    $( '.fare-form' ).on( 'submit', function(event) {
        event.preventDefault();
    });

    $( '.fare-form' ).on( 'change', function() {
        event.preventDefault();

        formData = getFormData(this);

        flashInfo(formData);
        calculateFare(formData);
    });
});

var getFormData = function(form) {
    formData = $( form )
        .serializeArray();

    formData = _( formData )
        .groupBy( 'name' )
        .mapValues( function( i ) {
            return _( i )
                .map( 'value' )
                .first();
        })
        .value();

    return formData;
}

var calculateFare = function(form) {
    if (form.type === "anytime" && (form.rides % 10 !== 0 || form.purchase !== "advance_purchase")) {
        alertAnytimeTickets();
    } else {
        var ridePrice = findPrice(form);
        var totalPrice = calculateTotalPrice(ridePrice);
        updateTotalPrice(totalPrice);
    }
}

var findPrice = function(form) {
    var price = 'N/A';

    _.forEach(fares.zones, function(zone) {
        if (form.zone == zone.zone) {
            cost = _.filter(zone.fares, {type: form.type, purchase: form.purchase});
            price = _.first(cost).price;
            return false;
        }
    });

    return price;
}

var calculateTotalPrice = function(price) {
    var totalPrice = formData.rides * price;
    return totalPrice.toFixed(2);
}

var updateTotalPrice = function(totalPrice) {
    $('.alert-info').hide();
    $('.total-fare-amount').text("$" + totalPrice);
}

var alertAnytimeTickets = function() {
    var alertText = 'Anytime tickets must be purchased from a Station Kiosk, and in multiples of 10.'

    $('.alert-info').show().text(alertText)
    $('.total-fare-amount').text('N/A')
}

var flashInfo = function(formData) {
    var typeInfo = fares.info[formData.type];
    var purchaseInfo = fares.info[formData.purchase];

    $('.type-info').text(typeInfo);
    $('.purchase-info').text(purchaseInfo);
}