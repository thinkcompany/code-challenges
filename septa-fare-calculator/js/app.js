/* jshint ignore:start */
//=require ../vendor/number-polyfill.js
/* jshint ignore:end */

(function($){

  //render helper text
  function updateHelper(text){
    $('[data-helper]').text(text);
  }

  //gets correct helper text for field
  function getHelper(){
    var timeVal = $('[data-field="time"]').val();
    $.ajax({
      method: "GET",
      url: "/fares.json",
      dataType: "json"
    })
    .done(function(data){
      updateHelper(data.info[timeVal]);
    })
    .fail(function(){
      alert("Error fetching data.");
    });
  }

  //update price text
  function updatePrice(number){
    $('[data-price]').text('$'+number);
  }

  //set destinations/initial fare from json data
  function getFareData(){
    var destinations = [];
    var $sel = $('[data-field="dest"]');
    $.ajax({
      method: "GET",
      url: "/fares.json",
      dataType: "json"
    })
    .done(function(data){
      $.each(data.zones, function(index, element){
        var destName = element.name;
        var destZone = element.zone;
        if( index === 0 ) {
          destinations.push('<option value="' + destZone + '" selected>' + destName + '</option>');
        } else {
          destinations.push('<option value="' + destZone + '">' + destName + '</option>');
        }
      });
      $($sel).html(destinations);
      calculateFare();
    })
    .fail(function(){
      alert("Error fetching data.");
    });
    getHelper();
  }

  //function to calculate fare based on field data
  function calculateFare(){
    var quantity = $('[data-field="num"]').val();
    var when = $('[data-field="time"]').val();
    var dest = $('[data-field="dest"]').val() - 1;
    var purch = $('[data-field="loc"]:checked').val();
    //set when to anytime if quantity is set to 10
    if ( quantity == 10 ) {
      when = "anytime";
    }
    $.ajax({
      method: "GET",
      url: "/fares.json",
      dataType: "json"
    })
    .done(function(data){
      function getFare(obj){
        return obj.type === when && obj.purchase === purch;
      }
      var fareObj = data.zones[dest].fares.find(getFare);
      var price = fareObj.price;
      var finalPrice = price * quantity;
      //if quantity is set to 10, don't multiply fare
      if ( quantity == 10 ) {
        finalPrice = price;
      }
      updatePrice(finalPrice);
    })
    .fail(function(){
      alert("Error fetching data.");
    });
  }

  $(document).ready(function(){
    //polyfill for number inputs
    $('input[type="number"]').inputNumber();

    //init field/helper data on page load
    getFareData();

    //update data on field change
    $('[data-field]').on('change', function(){
      calculateFare();
    });
    //update helper text on field change
    $('[data-field="time"]').on('change', function(){
      getHelper();
    });
  });

})(jQuery);
