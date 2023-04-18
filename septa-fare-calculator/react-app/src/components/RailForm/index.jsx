import { useEffect, useState } from "react";
import "../../styles/form.css"
import getFares from "../../utils";

export default function RailForm({ setFarePrice }) {

    const [zone, setZone] = useState("");
    const [dayTime, setDayTime] = useState("");
    const [purchaseLocation, setPurchaseLocation] = useState("");
    const [numOfRides, setNumOfRides] = useState(1);

    // Defaulted as Empty Arrays so no error on JSX maps
    const initialSelections = { times: [], zones: [], purchaseLocations: []}
    const [selections, setSelections] = useState(initialSelections)


    // fetch data
    useEffect(() => {
        getFares().then(({times, purchaseLocations, zones, info}) => {

            // Populate all the selection choices
            setSelections({
                times,
                purchaseLocations, 
                zones: zones.map(z => z.name)
            })

            // Set the default values
            setZone(zones[0])
            setDayTime(times[0])
            setPurchaseLocation(purchaseLocations[0])
        })
    }, [])
    console.log(selections)

    return (
        <form onSubmit={e => e.preventDefault()} className="rail-fare-form">
            <label>
                Where are you going?
                <select name="zones">
                    {selections.zones.map(zone => (
                        <option value={zone}>{zone}</option>
                    ))}
                </select>
            </label>
        </form>
    );
}