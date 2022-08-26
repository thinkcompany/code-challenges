const form = document.getElementById("form");
const formContainer = document.getElementById("form-container");
console.log("javascript is linked");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let zone = document.getElementById("destination").value;
  let timeOfDay = document.getElementById("time").value;
  let rideCount = document.getElementById("ride-amount");
  let purchaseLocation = document.querySelector(
    'input[name="purchase-location"]:checked'
  ).value;

  getPrice(zone, timeOfDay, purchaseLocation, rideCount);
});

const getPrice = (
  zoneValue,
  timeOfDayValue,
  purchaseLocationValue,
  rideCount
) => {
  fetch("./fares.json")
    .then((response) => response.json())
    // need to figure out how to get to the zones in the first place
    // "zones" key's value is an array of objects
    // it is expecting a NUMBER to choose its INDEX so it's expecting 0,1,2,3,4
    // "fares" is the same thing
    .then((data) => {
      // get to the appropriate fares array
      let fares = data["zones"][zoneValue]["fares"];
      let priceElement = fares.filter(
        (fare) =>
          fare.type === timeOfDayValue &&
          fare.purchase === purchaseLocationValue
      );
      let price = priceElement[0].price;
      // couldn't clear the value
      result = rideCount.value * price;
      console.log(result);

      const priceContent = document.createTextNode(result);

      return formContainer.appendChild(priceContent);
    });
};
