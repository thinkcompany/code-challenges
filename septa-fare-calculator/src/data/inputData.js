// data for zones for select inputs
const zones = ["CCP/1", "Zone 2", "Zone 3", "Zone 4", "NJ"];

// data for time of riding train
const daytime = ["Weekday", "Evening_Weekend", "Anytime"];

const daytimeHelperText = [
  {
    type: "Weekday",
    text: "Valid Monday through Friday, 4:00 a.m. - 7:00 p.m",
  },
  {
    type: "Evening_Weekend",
    text: "Valid weekdays after 7:00 p.m. all day Saturday, Sunday and major holidays",
  },
  {
    type: "Anytime",
    text: "Valid anytime must be purchased at Station Kiosk",
  },
];

// data for purchase locations
const purchaseLocations = [
  {
    id: "kiosk",
    label: "Station Kiosk",
    value: "advance_purchase",
    name: "purchasedLocation",
  },
  {
    id: "onboard",
    label: "Onboard",
    value: "onboard_purchase",
    name: "purchasedLocation",
  },
];

export { zones, daytime, purchaseLocations, daytimeHelperText };
