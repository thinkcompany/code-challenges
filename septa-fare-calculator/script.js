let fareData = [];

// request json data
fetch('fares.json')
    .then(res => res.json())
    .then(data => fareData = data);


const calculateFare = (e) => {
    const zone = zoneInput.value;
    const type = typeInput.value;
    let purchase = "";
    purchaseInputs.forEach(input => {
        if (input.checked) {
            purchase = input.id;
        }
    })
    const trips = tripsInput.value;

    // change helper text when trip type changes
    if (e.target.id === 'type') {
        changeTypeHelperText(type);
    }

    // change helper text when purchase type changes
    if (e.target.classList.contains('purchase')) {
        changePurchaseHelperText(purchase);
    }

    if (zone && type && purchase && trips) {
        // find data for zone
        const zoneData = fareData.zones.filter(data => data.zone === parseInt(zone))[0];
        let cost = "";

        // exception for 10 rides
        if (trips === "10" && purchase === "advance_purchase") {
            cost = zoneData.fares.filter(data => data.trips === parseInt(trips) && data.purchase === purchase)[0].price;
        }
        else {
            // find price of fare and adjust for # of trips
            let price = zoneData.fares.filter(data => data.type === type && data.purchase === purchase)[0].price;
            cost = price * parseInt(trips);
        }

        updateCost(cost.toString());
    }
}

const updateCost = (cost) => {
    // adjust appearance of text with dollar sign, decimal, and zeros
    let costText = "";
    if (cost.indexOf(".") === -1) {
        costText = `$${cost}.00`;
    }
    else if (cost.indexOf(".") === cost.length - 2) {
        costText = `$${cost}0`;
    }
    else {
        costText = `$${cost}`;
    }

    // change fare cost text on widget
    const fare = document.querySelector('#fare-cost');
    fare.innerText = costText;
}

const changeTypeHelperText = (type) => {
    const typeText = document.querySelector('#type-text');

    // change helper text on widget
    typeText.innerText = fareData.info[type];
    typeText.style.visibility = "visible";
}

const changePurchaseHelperText = (purchase) => {
    const purchaseText = document.querySelector('#purchase-text');

    // change helper text on widget
    purchaseText.innerText = fareData.info[purchase];
    purchaseText.style.visibility = "visible";
}

// event listeners
const zoneInput = document.querySelector('#zone');
const typeInput = document.querySelector('#type');
const purchaseInputs = document.querySelectorAll('.purchase')
const tripsInput = document.querySelector('#trips');

zoneInput.addEventListener('change', calculateFare);
typeInput.addEventListener('change', calculateFare);
purchaseInputs.forEach(input => {
    input.addEventListener('change', calculateFare);
});
tripsInput.addEventListener('change', calculateFare);