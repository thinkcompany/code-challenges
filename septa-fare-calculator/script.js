// script.json

// Custom function
function calculateFare() {
    // Store data of inputs
    var zones = document.getElementById("zones").value;
    var travelTime = document.getElementById("travelTime").value;
    var place = document.getElementById("place").value;
    var numRides = document.getElementById("numRides").value;

   // Check to see if this input  is less than or equal to 1
   if(numRides <= 1) {
        numRides = 1;

        document.getElementById("Your fare will cost").style.display = "none";
   } else {
        document.getElementById("Your fare will cost").style.display = "block";
   }

   //
}

// Hide fare amount on load
document.getElementById("totalFare").style.display = "none";
document.getElementById("Your fare will cost").style.display = "none";

// Clicking the button for Calling our custom function
document.getElementById("calculate").onclick = function() { calculateFare(); };