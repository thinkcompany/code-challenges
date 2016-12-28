(function ($, window, document, undefined) {

  'use strict';

  $(function () {

    // the getTheTenFare function takes a fare array
    // (based on the zone)
    // and finds the price where the trips = 10
    var getTheTenFare = function(fareArray){
      for (var i = 0; i < fareArray.length; i++) {
        if(fareArray[i].trips === 10){
          return fareArray[i].price;
        }
      }
      return 0;
    };


    var calculateFare = function(faredata,formdata){

      var septaZone = formdata[0].value;
      var rideTime = formdata[1].value;
      var farePurchase = formdata[2].value;
      var numRides = formdata[3].value;
      // use a separate counter variable so that we can
      // write out the number of rides below the fare
      // calculation, in future iterations
      var nR = numRides;
      var cost = 0;

      var zoneFares = [];

      for (var i = 0; i < faredata.zones.length; i++) {
         if(faredata.zones[i].zone == septaZone){
           zoneFares = faredata.zones[i].fares;
         }
      }

      $('.totalfare').text(cost);
      //for as long as we have rides
      while (nR > 0) {
        if(nR >= 10){
          // I would love to have built in a check here
          // to make sure there actually IS a 10 trip fare.
          cost += getTheTenFare(zoneFares);
          nR = nR-10;
        } else{
          for (var j = 0; j < zoneFares.length; j++) {
            if(zoneFares[j].type === rideTime && zoneFares[j].purchase === farePurchase){
               cost = cost + (zoneFares[j].price * nR);
               nR = 0;
               break;
            }
          }
          // todo - if nR is 8 or 9, give some feedback to the user
          // that will let them know that it would cost the same
          // or less to buy 10 trips.
        }
      }
      $('.totalfare').text(cost);
      // niceties -- if you select one of the info boxes,
      // below the Fare calculation, add some info text.
    };




    // the init function takes the fare data from JSON
    // and runs calculations on it.
    // this will only run if the json request was successful
    var init = function( faredata ) {
      // oh hey, I actually didn't know SerializeArray was a thing!
      // thanks, SO http://stackoverflow.com/questions/169506/obtain-form-input-fields-using-jquery
      // first, calculate the form based on the defaults
      calculateFare(faredata,$('.septaform').serializeArray());

      // watch the form for changes
      $('.septaform').change( function () {
        calculateFare(faredata,$('.septaform').serializeArray());
      });
      // keep the form from being submitted in the normal way.
      $('.septaform').on('submit', function(e) {
        e.preventDefault();
      });
    };




    // get the JSON via AJAX
    // http://jqfundamentals.com/chapter/ajax-deferreds
    // general method from here.
    var ajaxrequest = $.ajax({
      url: 'js/fares.json',
      dataType: 'json'
    });
    var err = function( req, status, err ) {
      console.log(req+' '+status+' '+err);
      // TODO - add some kind of front-end feedback to the end user
    };
    ajaxrequest.then(init, err);
  });


})(jQuery, window, document);
