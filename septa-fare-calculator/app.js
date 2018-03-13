'use strict'

const zone = document.getElementById("zone_options");
const fareType = document.getElementById("fare_types");
const purchaseTypes = [
  document.getElementById("purchase_location_type_1"),
  document.getElementById("purchase_location_type_2")
];
const tripCount = document.getElementById("trips");
const displayedFare = document.getElementById("calculated_fare_output");
const displayedMessage = document.getElementById("message");
let septaData;

// FETCH/REQUEST SEPTA FARE DATA
const fetchData = (filepath, callback) => {
  let request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      let data = JSON.parse(request.responseText);
      callback && callback(data);
    }
  };
  request.open("GET", filepath, true);
  request.send();
}

fetchData("fares.json", data => {
  septaData = data;
  console.log('json data', septaData);
});

// TODO: Update UI when events are fired

const onChange = () => {
  console.log('onChange invoked');
}

// ATTACH EVENT LISTENERS
const addEventListeners = () => {
  zone && zone.addEventListener("change", onChange, false);
  fareType && fareType.addEventListener("change", onChange, false);
  tripCount && ["input", "change"].map(listener => {
    tripCount.addEventListener(listener, onChange, false);
  })

  if (purchaseTypes) {
    for (let i = 0; i < purchaseTypes.length; i++) {
      purchaseTypes[i].addEventListener("change", onChange, false);
    }
  }
}

addEventListeners();

// TODO: Dynamically populate UI
