// The below array will store the JSON objects pulled via getALLParkData().
let destinations = [];

/* This Function pulls from the parks.json file. The file is pre-populated with data. 
I did it this way so that we could do a background update if need be. 
It waits till the API call is done and then runs a filter on the designation property.
this ensures we only return National Parks and not National Historic Parks, etc. */
export const getAllDestinationData = () => {
  return fetch("http://localhost:8088/parks").then((response) =>
    response.json().then((response) => (destinations = response))
  );
};

// creates a copy of the parks array
export const destinations = () => {
  return parks.slice().sort();
};
