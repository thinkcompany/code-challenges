$(document).ready(function(){
  load();
});

function load() {
var initVal = 0;

$.get( "fares.json", function( data ) {
  // alert( "Data Loaded: " + data );
  $.each(data.zones, function (key, value)
    {
      $("#faresOne").append("<option>" + value.name + "</option");
  });
  
  $("#faresOne option:first-child").attr("select", true);
  $("#faresTwo option:first-child").attr("select", true);
  $("#faresThree input:first-child").attr("checked", true);

  $("#fareCost").append("<p>$" + initVal + "</p>");

  $("#fare select, #fare option, #fare input").change(function() {
    console.log("change");
  });

  
});

}
