var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       var response = JSON.parse(xhttp.responseText);
       var info = response.info;
       //console.log(response.info);

       var testOutput = '';
       for(var i = 0; i < info.length; i++){
       	testOutput += info[0].anytime;
       }
      document.getElementById("septaFareCalculatorContainer").innerHTML = xhttp.responseText;

    }
};
xhttp.open("GET", "fares.json", true);
xhttp.send();