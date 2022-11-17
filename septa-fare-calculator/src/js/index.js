//Could have broken things up into more classes, but for the scope of this assignment didn't seem necessary.

let fareInfo = {};
let fareZones = [];

let fareDefaults = {
  whereGoing: "Zone 4",
  whenRiding: "weekday",
  purchasedAtOnboard: false,
  numberOfRides: 4,
};

//SETUP
const getFareData = async () => {
  const response = await fetch("./src/data/fares.json");

  if (response.ok) {
    const data = response.json();
    return data;
  } else {
    throw new Error(`Error (Code: ${response.status}) ${response.statusText}`);
  }
};

const setFareData = (fareData) => {
  fareInfo = fareData.info;
  fareZones = fareData.zones;
};

const { whereGoing, whenRiding, purchasedAtOnboard, numberOfRides } =
  fareDefaults;

let WidgetFareCalculator = new FareCalculator(
  whereGoing,
  whenRiding,
  purchasedAtOnboard,
  numberOfRides
);

const onLoad = async () => {
  const fareData = await getFareData().catch((error) => error);

  await setFareData(fareData);

  WidgetFareCalculator.fareZoneInfo = fareZones;
};

//EVENT HANDLERS
const handleWhereGoingSelectChange = (e) => {
  e.preventDefault();

  const whereGoingValue = e.target.value;
  WidgetFareCalculator.setWhereGoing(whereGoingValue);
  displayPrice();
};

const handleWhenRidingSelectChange = (e) => {
  //anytime tickets require at least ten rides and adv purchase, so if anytime is selected, it will force it to be on 10 and kiosk if it isn't so.
  e.preventDefault();

  const whenRidingValue = e.target.value;
  if (numRidesInput.value < 10 && whenRidingValue == "anytime") {
    numRidesInput.value = 10;
  }
  WidgetFareCalculator.setWhenRiding(whenRidingValue);
  displayPrice();
};

const handleKioskOrOnboardButtonsClick = (e) => {
  const purchasedAtOnboardBoolean = e.target.value === "kiosk" ? false : true;
  WidgetFareCalculator.setPurchasedAtOnboard(purchasedAtOnboardBoolean);
  displayPrice();
};

const handleNumRidesInputChange = (e) => {
  const numRidesInputValue = e.target.value;

  //because anytime tickets start at 10 rides and adv purchase, if it is above 10, it will default to anytime and kiosk for customer convenience
  //also disables the input for onboarding purchase after 10, since those must be purchased in advance
  if (numRidesInputValue >= 10) {
    whenRidingSelect.value = "anytime";
    kioskOrOnboardButtons[0].checked = true;
    kioskOrOnboardButtons[1].disabled = true;
  }

  if (numRidesInputValue < 10) {
    kioskOrOnboardButtons[1].disabled = false;
  }

  WidgetFareCalculator.setNumberOfRides(numRidesInputValue);
  displayPrice();
};

//EVENT LISTENERS
const whereGoingSelect = document.getElementById("where-going-select");
const whenRidingSelect = document.getElementById("when-riding-select");
const kioskOrOnboardButtons = document.getElementsByClassName(
  "kioskOrOnboardRadio"
);
const numRidesInput = document.getElementById("num-rides-input");

whereGoingSelect.addEventListener("change", (e) => {
  handleWhereGoingSelectChange(e);
});

whenRidingSelect.addEventListener("change", (e) => {
  handleWhenRidingSelectChange(e);
});

for (let i = 0; i < kioskOrOnboardButtons.length; i++) {
  kioskOrOnboardButtons[i].addEventListener("click", (e) => {
    handleKioskOrOnboardButtonsClick(e);
  });
}

numRidesInput.addEventListener("change", (e) => {
  handleNumRidesInputChange(e);
});

//HELPERS
const displayPrice = () => {
  const price = WidgetFareCalculator.calculateFare();

  const displayPriceSpan = document.getElementsByClassName(
    "price-calc-output-number"
  )[0];

  displayPriceSpan.innerHTML = `$${price.toFixed(2)}`;
};
