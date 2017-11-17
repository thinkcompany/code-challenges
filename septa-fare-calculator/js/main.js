var fare_calculator_dest = document.querySelector("#fare-calculator-dest");
var fare_calculator_type = document.querySelector("#fare-calculator-type");
var fare_calculator_purchase = document.getElementsByName("fare-calculator-purchase");
var fare_calculator_trips = document.querySelector("#fare-calculator-trips");

//Making AJAX call to fares.json
var file_fares;
let xhr = new XMLHttpRequest();
xhr.open('GET','fares.json',true);
xhr.onload = function(){
	if(this.status === 200){
		file_fares = JSON.parse(this.responseText);
		showNewPrice();
	}
}
xhr.send();

//Attaching event handlers to each input
fare_calculator_dest.addEventListener('change',function(){
	showNewPrice();
});

fare_calculator_type.addEventListener('change',function(){
	showNewPrice();
});

for(i in fare_calculator_purchase){
	fare_calculator_purchase[i].onclick= function(){
		showNewPrice();
	}
}

fare_calculator_trips.addEventListener('change',function(){
	showNewPrice();
});
fare_calculator_trips.addEventListener('keyup',function(){
	showNewPrice();
});


//Function to change displayed price
function showNewPrice(){
	document.querySelector("#fare-calculator-result").innerHTML
	= "$"+calculatePrice().toFixed(2);
}

//Calculation function
function calculatePrice(){
	let dest = fare_calculator_dest.value;
	let type = fare_calculator_type.value;
	let purchase = document.querySelector('input[name="fare-calculator-purchase"]:checked').value
	let trips = fare_calculator_trips.value;

	for(i in file_fares.zones){
		if(dest === file_fares.zones[i].name){
			let file_fares_data = file_fares.zones[i].fares;
			for(j in file_fares_data){
				//Automatically use special price for 10 trips advance, irrespective of type(anytime)
				if(trips === "10" && purchase === "advance_purchase"){
					//Checking for special price in fares array
					if(file_fares_data[j].trips == 10)
						return file_fares_data[j].price;
				}else{
					if(purchase==file_fares_data[j].purchase
						&& type==file_fares_data[j].type){
						return trips*file_fares_data[j].price;
					}
				}
			}
		}
	}
	return 0;
}