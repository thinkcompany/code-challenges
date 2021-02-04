const url = './fares.json';
let fareData = [];  //to store json data
let zones = [];     //to store list of zones
let inputData = {}; // to store user entered data

//load the json file
fetch(url)
    .then(res => res.json())
    .then(data => {
        fareData = data;

        //fill up zones
        fillZones(fareData.zones);
    })

const fillZones = zones => {
    const zone = document.getElementById('zone');
    zones.map(z => {
        const option = document.createElement("option");
        option.value = z.zone;
        option.innerHTML = z.name;
        zone.appendChild(option);
    })
}   

const calculateFare = (e) => {
    const cost = document.getElementById('cost');
    const costText = document.getElementById('cost-text');

    cost.innerHTML = "";
    costText.innerHTML = "";

    if (validInput(e)) {
        // if we have all the information, then filter the correct information from the json data
        // and calculate and display cost
        if (inputData.zone && inputData.time && inputData.location && inputData.rides) {
            let zoneData = fareData.zones.filter(z => z.zone === parseInt(inputData.zone))[0];
            let result = zoneData.fares.filter(({type, purchase}) => 
                            type === inputData.time && purchase === inputData.location);

            //get the cost element and display calculated price
            if (parseInt(inputData.rides) === 10) {
                if  (inputData.time === 'anytime')
                    cost.innerHTML = "$" + result[0].price;
                else {
                    //display current price
                    cost.innerHTML = "$" + result[0].price * parseInt(inputData.rides);   

                    //also display price if an upgrad to anytime ticket will be cheaper 
                    let anytimeResult = zoneData.fares.filter(({type}) => type === "anytime")                        
                    if (result[0].price * parseInt(inputData.rides) > anytimeResult[0].price) {
                        console.log(result[0].price * parseInt(inputData.rides))
                        console.log(anytimeResult[0].price)
                        costText.innerHTML = "Upgrade to Anytime ticket for a special price of $" + 
                                             anytimeResult[0].price + " for 10 tickets, purchased at the Kiosk";
                    }
                }
            }
            else
                cost.innerHTML = "$" + result[0].price * parseInt(inputData.rides);
        }
    }
}

const validInput = (e) => {
    if (e.name === "time") {
        //display helper text if timings changed
        const helperText = document.getElementById('helper-text');
        helperText.innerHTML = e.value !== "" ? fareData.info[e.value] : "";

        //disable onboard purchase for anytime, 
        //and restrict trips to 10, these can also be done as multiples of 10 (but not implemented)
        const onboard = document.getElementById('onboard-purchase');
        const rides = document.getElementById('rides');
        if (e.value === "anytime") {
            //disable onboard option
            onboard.disabled = true;
            onboard.checked = false;
            if (inputData.location === "onboard-purchase")
                delete inputData.location;

            //make rides 10
            rides.disabled = true;
            rides.value = 10;
            inputData.rides = 10;
        }
        else {
            onboard.disabled = false;
            rides.disabled = false;
        }
    }

    //if value removed from input delete from obj
    if (e.value === "") {
        delete inputData[e.name];
        return false;
    }

    //store input data in object        
    inputData[e.name] = e.value;
    return true;
}

const validateNumber = (e) => {
    //do not allow values < 1 or > 10 
    if (e.value !== "" && e.value < 1)
        e.value = 1;
    if (e.value !== "" && e.value > 10)
        e.value = 10;   

    calculateFare(e);
}
