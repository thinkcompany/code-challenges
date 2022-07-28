let fareDate = {};
let zones = null;

const onLoad = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'fares.json', true);
  xhr.getResponseHeader('Content-type', 'application/json');

  xhr.onload = function () {
    fareData = JSON.parse(this.responseText);
    zones = fareData.zones;
    // Dynamically add zone options via JSON data
    zones.forEach((zone) => {
      addZoneToDropdownOptions(zone.name);
    });
    // default qty to 1
    let qty = document.querySelector('#qty');
    qty.value = 1;

    // calculate cost based on default selections
    calculate();

    console.log({ fareData });
  };

  xhr.send();
};

// Dynamically populate Zone options
const addZoneToDropdownOptions = (zone) => {
  let zoneDropdown = document.querySelector('.zones_dropdown');
  let option = document.createElement('option');
  option.text = zone;
  option.value = zone;
  zoneDropdown.add(option);
};

// Calculate Fare
const calculate = () => {
  let zone = document.querySelector('.zones_dropdown').value;
  let when = document.querySelector('#when').value;
  let where = [...document.getElementsByName('purchased')].filter(
    (box) => box['checked']
  )[0].value;
  let qty = document.querySelector('#qty').value;
  let fares = fareData.zones.filter((z) => z.name === zone)[0].fares;
  let price = fares.filter(
    (fare) => fare.type === when.toLowerCase() && fare.purchase === where
  )[0].price;
  let cost = 0;

  if (when !== 'anytime' || (when === 'anytime' && qty > 10)) {
    // handle anytime fares. $38 for 10 trips
    if (when === 'anytime' && qty > 10) {
      cost = price * Math.ceil(qty / 10);
    } else {
      cost = price * qty;
    }
  } else {
    cost = price * 1; // price for anytime up to 10 rides
  }

  // print cost to DOM
  let priceElement = document.querySelector('#price');
  priceElement.textContent = `$${cost.toFixed(2)}`;

  displayMessage(when, where);
};

// Display alerts
const displayMessage = (when, where) => {
  let msg =
    fareData.info[when.toLowerCase()] +
    ' ' +
    fareData.info[where.toLowerCase()];

  let alertElement = document.querySelector('#alerts');
  alertElement.textContent = msg;
};
