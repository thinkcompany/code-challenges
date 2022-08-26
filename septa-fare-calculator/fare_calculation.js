/**
 * @author Kekeli Afantchao
 * hi thank you for taking the time to look at my code (:
 * I hope it's up to snuff and I'd love feedback regardless of the outcome if that's alright with you.
 * Things I tried to do, but coudln't quite accomplish:
 * find a way to capture the value of the dropdowns before form submission to dynamically send tooltip info to the user
 * clear the previous result, you will unfortunately have to refresh to get accurate pricing
 * I tried to clear it by initializing result to 0 in one of the promises provided by fetch & in the global scope
 * I also tried to use an if statement to check if its value was > 0 and then set it to 0, but it continued
 * Other fun stuff I would add:
 * next gameday tooltip for philly sports
 * I was born in North Philly and lived in Landsdowne for a few years, so I think that'd be handy as a Philly fan
 */
const form = document.getElementById("form");
const formContainer = document.getElementById("form-container");
console.log("javascript is linked");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // these are the four user-provided values that we need to make our final pricing calculation
  let zone = document.getElementById("destination").value;
  let timeOfDay = document.getElementById("time").value;
  let rideCount = document.getElementById("ride-amount");
  let purchaseLocation = document.querySelector(
    'input[name="purchase-location"]:checked'
  ).value;

  // validation attempt - only works when the ride amount is empty
  // tried to check against null, "", and undefined
  if (zone || timeOfDay || rideCount || purchaseLocation === undefined) {
    alert("you are missing a value");
  }

  // separation of concerns here, I could've declared this function here, but I didn't want to
  // be doing data mutations in the same place we received it
  getPrice(zone, timeOfDay, purchaseLocation, rideCount);
});

// the goal of this function outside of calculating the price, is knowing how to traverse the data structure properly
// the pattern in this assignment is that the relevant data points are in arrays of objects
const getPrice = (
  zoneValue,
  timeOfDayValue,
  purchaseLocationValue,
  rideCount
) => {
  fetch("./fares.json")
    .then((response) => response.json())
    .then((data) => {
      // get to the appropriate fares array
      // at this point I realized I had to change my initial values for the destination because we are currently
      // in the array, that we got from finding the key zones
      let fares = data["zones"][zoneValue]["fares"];
      // knew I'd have to find a good way to determine index selection from two values instead of just one like I'm used to
      // came across filter, which lives on the array prototype, gave it my two conditions, stored it in a variable as an array
      let priceElement = fares.filter(
        (fare) =>
          fare.type === timeOfDayValue &&
          fare.purchase === purchaseLocationValue
      );
      let price = priceElement[0].price;
      // the logic for the calculation is right, but unfortunately couldn't figure out the best way to achieve that yet
      result = rideCount.value * price;
      console.log(result);

      // getting ready to add the result to the DOM, so the end user can see the fare
      const priceContent = document.createTextNode(result);
      const priceContainer = document.createElement("div");

      formContainer.appendChild(priceContainer);
      formContainer.setAttribute("class", "form-section");
      priceContainer.appendChild(priceContent);

      return formContainer.appendChild(priceContent);
    });
};
