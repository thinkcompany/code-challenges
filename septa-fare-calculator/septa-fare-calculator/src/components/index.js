import React, { useState, useEffect } from "react";

const SeptaFareCalculator = () => {
    const [fares, setFares] = useState({})


    useEffect(() => {
        fetch("https://raw.githubusercontent.com/thinkcompany/code-challenges/master/septa-fare-calculator/fares.json")
            .then(response => response.json())
            .then(data => setFares(data)) 
    },[])
    

    return (
        <div>
            <div>
                <p>Regional Rail Fares</p>
            </div>
            <div>
                <p>Where are you going?</p>
                <select>

                </select>
            </div>
            <div>
                <p>When are you riding?</p>
                <select>

                </select>
            </div>
            <div>
                <p>Where will you purchase the fare?</p>
                <label>
                    <input type="radio"/>  
                    Station Kiosk
                </label>
                <label>
                    <input type="radio"/>
                    Onboard
                </label>
            </div>
            <div>
                <p>How many rides will you need?</p>
                <input type="number"/>
            </div>
            <div>
                <p>Your fare will cost</p>
            </div>
        </div>
    );
};

export default SeptaFareCalculator;