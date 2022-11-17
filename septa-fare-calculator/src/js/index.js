let fareInfo = {};
let fareZones = {};

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

const onLoad = async () => {
  const fareData = await getFareData().catch((error) => error);

  setFareData(fareData);

  console.log(fareInfo, fareZones);
};

//EVENTS

//HELPERS
