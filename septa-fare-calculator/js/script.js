//**Welcome to my app!**
// I wanted to include my initial old-fashioned AJAX 
// connection to the JSON file because I learned it first
// and it was highly effective!
// But I will use mostly use ES6 due to it's dynamic features


// const xhr = new XMLHttpRequest();

// xhr.onload = function () {
//     if (xhr.status === 200) {
//         responseObject = JSON.parse(xhr.responseText);
//         var zoneUI = document.getElementById('selectionZone');
//         for (var i = 0; i < responseObject.zones.length; i++) {
//             //Populating the first drop-down field
//             zoneUI.innerHTML = zoneUI.innerHTML + '<option value="">' + "Zone " + responseObject.zones[i]['zone'] + '</option>';
//         }
//     }
//     xhr.open('GET', 'fares.json'), true;
//     xhr.send(null);
// }


//*Where the project begins*/

let fareInfo = [];

// New request method for connection to AJAX
fetch('fares.json')
    .then(res => res.json())
    .then(data => fareData = data);

// Created a this main function and broke the project into segments for the requirements
const calculateResult = (e) => {
    const zone = zoneUI.value;
    const type = timeUI.value;
    const trips = tripUI.value;
    
    // Assigned the radio buttons an id to apply functionality
    let purchase = "";
    purchaseInputs.forEach(input => {
        if (input.checked) {
            purchase = input.id;
        }
    })
    // Getting the helper id for the "Type" of day selections
    if (e.target.id === 'type') {
        updateTypeHelperText(type);
    }
    // Getting the helper id for the "Purchase" location selections
    if (e.target.classList.contains('purchase')) {
        changePurchaseHelperText(purchase);
    }
    
    // Getting all of user inputs before displaying a fare price
    if (zone && type && purchase && trips) {
        // Getting particular information from JSON and populating app
        const zoneData = fareData.zones.filter(data => data.zone === parseInt(zone))[0];
        let result = "";

        // Adding the special pricing for 10 tickets
        if (trips === "10" && purchase === "stationLocation") {
            result = zoneData.fares.filter(data => data.trips === parseInt(trips) && data.purchase === purchase)[0].price;
        }
        else {
            // Adjusting price with the amount of trips
            let price = zoneData.fares.filter(data => data.type === type && data.purchase === purchase)[0].price;
            result = price * parseInt(trips);
        }
        updateFarePrice(result.toString());
    }
}

// Updating helper text functions to display the "type from JSON" while only visible when interacted with
const updateTypeHelperText = (type) => {
    const typeText = document.querySelector('#timeHelperText');
    typeText.innerText = fareData.info[type];
    typeText.style.visibility = "visible";
}

const changePurchaseHelperText = (purchase) => {
    const purchaseText = document.querySelector('#locationHelperText');
    purchaseText.innerText = fareData.info[purchase];
    purchaseText.style.visibility = "visible";
}

// Formatting and displaying fare price to a dollar amount
const updateFarePrice = (result) => {
    let fareUpdate = "";
    if (result.indexOf(".") === -1) {
        fareUpdate = `$${result}.00`;
    }
    else if (result.indexOf(".") === result.length - 2) {
        fareUpdate = `$${result}0`;
    }
    else {
        fareUpdate = `$${result}`;
    }

    const fare = document.querySelector('#fareResult');
    fare.innerText = fareUpdate;
}

// Getting HTML elements
const zoneUI = document.querySelector('#zoneUI');
const timeUI = document.querySelector('#type');
const purchaseInputs = document.querySelectorAll('.purchase');
const tripUI = document.querySelector('#tripsUI');

// And populating with results
zoneUI.addEventListener('change', calculateResult);
timeUI.addEventListener('change', calculateResult);
purchaseInputs.forEach(input => {
    input.addEventListener('change', calculateResult);
});
tripUI.addEventListener('change', calculateResult);