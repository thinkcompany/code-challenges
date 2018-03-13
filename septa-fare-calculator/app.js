'use strict'

// TODO: Declare variables

let septaData;

// TODO: Fetch/Request Septa fare data

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

// TODO: Attach event listeners

// TODO: Dynamically populate UI
