import { useEffect, useState } from "react";
import "../../styles/form.css"
import getFares from "../../utils";
import RailInput from "./RailInput";

export default function RailForm({ setFarePrice, farePrice }) {

    const [zone, setZone] = useState("");
    const [dayTime, setDayTime] = useState("");
    const [purchaseLocation, setPurchaseLocation] = useState("");
    const [numOfRides, setNumOfRides] = useState("1");

    // Defaulted as Empty Arrays so no error on JSX maps
    const initialSelections = { times: [], zones: [], purchaseLocations: []}
    const [selections, setSelections] = useState(initialSelections)

    const [data, setData] = useState({});


    // fetch data
    useEffect(() => {
        getFares().then(({times, purchaseLocations, zones, info}) => {
            setData({zones, info})
            // Populate all the selection choices
            setSelections({
                times,
                purchaseLocations, 
                zones: zones.map(z => z.name)
            })

            // Set the default values
            setZone(zones[0].name)
            setDayTime(times[0])
            setPurchaseLocation(purchaseLocations[0])
        })
    }, [])

    // Set the total fare price dynamically
    useEffect(() => {
        // "Anytime" can only be purchases at the Station Kiosk
        if (dayTime === "Anytime") setPurchaseLocation("Station Kiosk")

        // Find the correct Zone and key into the fares
        let zoneFares = data.zones?.find(z => z.name === zone).fares
        
        // Filter for the correct Day/Time
        // Could be optimized better with state variables values matching keywords
        let timeFares = zoneFares?.filter(fare => {
            return (
                dayTime === "Weekdays"
                ?
                fare.type === "weekday"
                :
                dayTime === "Evenings/Weekend"
                ?
                fare.type === "evening_weekend"
                :
                fare.type === "anytime"
            )
        })

        // Find the fare with the correct purchase location
        let finalFare = timeFares?.find(fare => {
            return (
                purchaseLocation === "Onboard"
                ?
                fare.purchase === "onboard_purchase"
                :
                fare.purchase === "advance_purchase"
            )
        })

        // If there is a finalFare then update the total fare price
        if (finalFare) {
            setFarePrice((finalFare.price / finalFare.trips * numOfRides).toFixed(2))
        }
    }, [zone, dayTime, purchaseLocation, numOfRides])

    return (
        <form onSubmit={e => e.preventDefault()} className="rail-fare-form">
            <RailInput
                text="Where are you going?"
                selectionType="zones"
                setSelection={setZone}
                selection={zone}
                selections={selections.zones}
                anytime={dayTime === "Anytime"}
                />
            <RailInput
                text="When are you riding?"
                selectionType="times"
                setSelection={setDayTime}
                selection={dayTime}
                selections={selections.times}
                helperText={dayTime === "Anytime" ? data.info.anytime : dayTime === "Weekdays" ? data.info.weekday : data.info?.evening_weekend}
                anytime={dayTime === "Anytime"}
                />
            <RailInput
                text="Where will you purchase the fare?"
                selectionType="purchaseLocations"
                setSelection={setPurchaseLocation}
                selection={purchaseLocation}
                selections={dayTime === "Anytime" ? [selections.purchaseLocations[1]] : selections.purchaseLocations}
                helperText={purchaseLocation === "Onboard" ? data.info?.onboard_purchase : data.info?.advance_purchase}
                anytime={dayTime === "Anytime"}
                />
            <RailInput
                text="How many rides will you need?"
                selectionType="numOfRides"
                setSelection={setNumOfRides}
                selection={numOfRides}
                helperText={numOfRides.includes(".") ? "Please only use whole numbers; Purchasing portions of a ride is not possible" : undefined}
                anytime={dayTime === "Anytime"}
                />
        </form>
    );
}