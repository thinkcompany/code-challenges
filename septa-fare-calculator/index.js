$(document).ready(function(){
  load();
});

function load() {
  var initVal = 0;

  $.get( "fares.json", function( data ) {
    $.each(data.zones, function (key, value) {
        $("#faresOne").append("<option>" + value.name + "</option");
    });
    
    // initialize selected options
    $("#faresOne option:first-child").attr("select", true);
    $("#faresTwo option:first-child").attr("select", true);
    $("#faresThree input:first-child").attr("checked", true);

    // make initial value $0
    $("#fareCost").append("<p>$" + initVal + "</p>");

    // when there is a change in the form, get values of each input and map them to the JSON file to calculate price
    $("#fare select, #fare option, #fare input").change(function() {
      var faresOne = $("#faresOne").attr("value");
      var faresTwo = $("#faresTwo").attr("value");
      var faresThree = "";
      var faresFour = $("#faresFour").attr("value");

      // get value of checked radio button
      var selected = $("input[type='radio'][name='where']:checked");
      if (selected.length > 0) {
          faresThree = selected.val();
      }

      // each time there is a change on the form, remove the price value <p> so the new val can be appended
      $("#fareCost").empty();
      
      // get the price based on criteria
      $.each(data.zones, function (key, value) {
        if( faresOne === value.name ) {
          $.each(value.fares, function (k, v) {
            if ( faresTwo === v.type ) {
              if ( faresThree === v.purchase ) {
                initVal = v.price;
                if ( faresFour == "" ) {
                  $("#fareCost").append("<p>$" + initVal + "</p>");
                } else {
                  $("#fareCost").append("<p>$" + (initVal * faresFour) + "</p>");
                }
              }
            }
          }); // looking at values in 'fares' objects
        }
      });
    }); 
  });
}
