jQuery(document).ready(function($) {

  //zone map toggle
  $('.map-toggle').on("click", function(e){
    e.preventDefault();
    if($('[data-selector-name=zone_map]').hasClass('active')) {
      $('[data-selector-name=zone_map]').removeClass('active');
    } else {
      $('[data-selector-name=zone_map]').addClass('active');
    } 
  });

  $('[data-selector-name=zone_map]').on("click", function(e){
    $(this).removeClass('active');
  });

  $('[data-selector-name=zone_map] img').on("click", function(e){
    e.stopPropagation();
  })

  //septa calculator
  function getSeptaFare() {
    //set up septa calculator variables
    var zone = $('[data-selector-name=zone]').val();
    var type = $('[data-selector-name=time]').val();
    var purchase = $('[data-selector-name=radio_purchase]:checked').val();
    var quantity = parseInt($('[data-selector-name=quantity]').val());
    var advance = $('#radio-advance-purchase');
    var onboard = $('#radio-onboard-purchase');

    //debugging
    console.log(zone, type, purchase, quantity);

    $.getJSON('fares.json', function(data) {

      //fills out helper text for the time of rides
      $.each(data.info, function(i, data) {
        var helper = '';

        if(type == i) {
          var helper = data;
        }

        if(helper != '') {
          $('[data-selector-name=when_helper]').html(helper);
        }
      });

      //get zones data
      $.each(data.zones, function(i, data) {

        if(zone == data.zone) {
          $.each(data.fares,function(i, data) {

            //figure out the type of pass
            if(type == data.type) {
              //if anytime pass
              if(data.type == 'anytime') {
                //update quantity to anytime trips
                $('[data-selector-name=quantity]').val(data.trips);
                //disable quantity & purchase fields since static quantity available only through advance purchase
                $('[data-selector-name=quantity]').prop('disabled', true);
                advance.prop('checked', true);
                onboard.prop('checked', false);
                onboard.prop('disabled', true);
                onboard.parent('div').addClass('disabled');
                //describe why fields are disabled
                $('[data-selector-name=purchase_helper]').html("This pass is only available through advance purchase.");
                $('[data-selector-name=rides_helper]').html("The quantity of trips for the anytime pass is "+data.trips+". If you don't need this many trips, change <a href='#time'>when you are riding</a>.");
                //calculate price
                var final_price = data.price;
                var final_price = final_price.toFixed(2)
                $('[data-selector-name=final_fare]').html(final_price);
              }

              //everything else
              else {
                //figure out type of purchase
                if(purchase == data.purchase) {
                  //reenable fields & remove helper text
                  $('[data-selector-name=quantity]').prop('disabled', false);
                  onboard.prop('disabled', false);
                  onboard.parent('div').removeClass('disabled');
                  $('[data-selector-name=purchase_helper]').html('');
                  $('[data-selector-name=rides_helper]').html('');
                  //calculate price
                  var final_price = data.price * quantity;
                  var final_price = final_price.toFixed(2)
                  $('[data-selector-name=final_fare]').html(final_price);
                }
              }
            } 
          });
        }
      }); 
    });
  }

  //run function when page is ready
  getSeptaFare();

  //run function when field values are changed
  $('[data-input-selector=tb_calc_field], [data-selector-name=radio_purchase]').change(function() {
    getSeptaFare();
  });

});