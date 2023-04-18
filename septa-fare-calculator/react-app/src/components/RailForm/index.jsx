import { useEffect, useState } from "react";
import "../../styles/form.css"
import getFares from "../../utils";
import RailSelect from "./RailSelect";

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
            setZone(zones[0].name)
            setDayTime(times[0])
            setPurchaseLocation(purchaseLocations[0])
        })
    }, [])

    return (
        <form onSubmit={e => e.preventDefault()} className="rail-fare-form">
            <RailSelect
                text="Where are you going?"
                selectionType="zones"
                setSelection={setZone}
                selection={zone}
                selections={selections.zones}
            />
            <RailSelect
                text="When are you riding?"
                selectionType="times"
                setSelection={setDayTime}
                selection={dayTime}
                selections={selections.times}
            />
            <RailSelect
                text="Where will you purchase the fare?"
                selectionType="purchaseLocations"
                setSelection={setPurchaseLocation}
                selection={purchaseLocation}
                selections={selections.purchaseLocations}
            />
        </form>
    );
}