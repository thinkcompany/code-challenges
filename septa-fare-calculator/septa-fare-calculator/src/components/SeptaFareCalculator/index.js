import React, { useState, useEffect } from "react";

import "./calculator.css";

const SeptaFareCalculator = () => {

    const [fares, setFares] = useState({});
    const [selectedZone, setSelectedZone] = useState(0);
    const [rideAmount, setRideAmount] = useState(0);
    const [purchaseLocation, setPurchaseLocation] = useState("advance_purchase");
    const [fareCost, setFareCost] = useState(0);

    const updateRideAmount = (e) => setRideAmount(e.target.value);
    const updatePurchaseLocation = (e) => setPurchaseLocation(e.target.value);

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/thinkcompany/code-challenges/master/septa-fare-calculator/fares.json")
            .then(response => response.json())
            .then(data => setFares(data)) 
    },[]);

    return (
        <div className="calculator-container">
            <div>
                <p>Regional Rail Fares</p>
            </div>
            <div>
                <p>Where are you going?</p>
                <select>
                    {fares.zones && Object.keys(fares.zones).map((zone, idx) => (
                        <option key={idx}>Zone {zone}</option>
                    ))}
                </select>
            </div>
            <div>
                <p>When are you riding?</p>
                <select>
                    {fares.info && Object.keys(fares.info).map((time, idx) => (
                        <option key={idx}>{time}</option>
                    ))}
                </select>
            </div>
            <div>
                <p>Where will you purchase the fare?</p>
                <label>
                    <input value={"advance_purchase"} checked={purchaseLocation === "advance_purchase"} onChange={updatePurchaseLocation} type="radio"/>  
                    Station Kiosk
                </label>
                <label>
                    <input value={"onboard_purchase"} checked={purchaseLocation === "onboard_purchase"} onChange={updatePurchaseLocation} type="radio"/>
                    Onboard
                </label>
            </div>
            <div>
                <p>How many rides will you need?</p>
                <input value={rideAmount} onChange={updateRideAmount} type="number"/>
            </div>
            <div>
                <p>Your fare will cost</p>
                <p>${fareCost}</p>
            </div>
        </div>
    );
};

export default SeptaFareCalculator;