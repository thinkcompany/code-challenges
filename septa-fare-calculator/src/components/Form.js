import React, { useState, useEffect } from "react";
import FormHeader from "./FormHeader";
import ZoneSection from "./ZoneSection";
import TypeSection from "./TypeSection";
import PurchaseSection from "./PurchaseSection";
import TripsSection from "./TripsSection";
import ResultSection from "./ResultSection";
import data from "../data/fares.json";
import "./Form.css";
import { addTestId } from "../util/DomUtils";

const zoneOptions = data.zones.map(zoneData => {
    return { value: zoneData.zone, label: zoneData.name }
});

const types = Object.keys(data.info).slice(1, 3);   // `anytime` is not one of the selectable options
const typeOptions = [
    {
        label: "Weekdays",
        value: types[0],
    },
    {
        label: "Evenings / Weekends",
        value: types[1],
    },
];

const purchases = Object.keys(data.info).slice(3);
const purchaseOptions = [
    {
        label: "Station Kiosk",
        value: purchases[0],
    },
    {
        label: "Onboard",
        value: purchases[1],
    },
];

const calculateFare = (zoneId, type, purchase, trips) => {
    const unitPrice = data.zones.find(zone => zone.zone === zoneId)
        .fares.find(fare => fare.type === type && fare.purchase === purchase)
        .price;
    const special10TripPrice = data.zones.find(zone => zone.zone === zoneId)
        .fares.find(fare => fare.trips === 10).price;

    // console.log(unitPrice, special10TripPrice);

    if (purchase === purchases[1]) {    // no special pricing for onboard purchase
        console.log(purchase);
        return trips * unitPrice;
    } else {     // see if special bundle is more affordable than unit pricing
        return Math.min(trips * unitPrice,
            Math.floor(trips / 10) * special10TripPrice + (trips % 10) * unitPrice);
    }
};

const FareCalculatorForm = () => {
    // console.log(typeOptions);
    const [zoneId, setZoneId] = useState(zoneOptions[0].value);
    const [type, setType] = useState(typeOptions[0].value);
    const [typeHelperText, setTypeHelperText] = useState(data.info[typeOptions[0].value]);
    const [purchase, setPurchase] = useState(purchaseOptions[0].value);
    const [trips, setTrips] = useState(1);
    const [total, setTotal] = useState("$0.00");

    useEffect(() => {
        addTestId('zone-id-input', 'zone-id');
        addTestId('type-input', 'type');
    }, []);

    useEffect(() => {
        setTypeHelperText(data.info[type]);
    }, [type]);

    useEffect(() => {
        setTotal('$' + calculateFare(zoneId, type, purchase, trips).toFixed(2));
    }, [zoneId, type, purchase, trips]);

    return (
        <div id="main-form" className="centered flex-column">
            <FormHeader
                title="Regional Rail Fares"
            />
            <ZoneSection
                prompt="Where are you going?"
                zoneOptions={zoneOptions}
                setZoneId={setZoneId}
            />
            <TypeSection
                prompt="When are you riding?"
                typeOptions={typeOptions}
                setType={setType}
                typeHelperText={typeHelperText}
            />
            <PurchaseSection
                prompt="Where will you purchase the fare?"
                purchaseOptions={purchaseOptions}
                purchase={purchase}
                setPurchase={setPurchase}
            />
            <TripsSection
                prompt="How many rides will you need?"
                trips={trips}
                setTrips={setTrips}
            />
            <ResultSection
                prompt="Your fare will cost"
                total={total}
            />
        </div>
    )
};

export default FareCalculatorForm;
