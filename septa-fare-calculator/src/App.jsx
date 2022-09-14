import { useEffect, useState, useRef, Fragment } from "react";
import {
    ANYTIME_VALUE,
    PURCHASE_TYPES,
    TRAVEL_TIMES,
    ANYTIME_TRAVEL_NOTE,
} from "./constants";

// to do:
// plan construction -- x
// construct dynamice form -- x
// add travel time notes from info blob
// acceisibile form fields
// form validation
// styling
// mobile styling?

function App() {
    const [zones, setZones] = useState([]);

    // assumption:
    // form is dynamicly calculating purchase costs
    // with no submit button to get all form values at once
    // best to access on form change form values via refs rather than local state to minimize renders
    const formRef = useRef();
    // defining current as an empty object prior to render
    // allows me to use a single ref for all form fields
    // 'current' is undefined on first render
    // this is a problem when trying to set ref values:  ref => formRef.current.zones = ref
    // defining here
    formRef.current = {};
    formRef.current.purchaseType = {};

    // fetch fares
    useEffect(() => {
        const fetchFares = async () => {
            const response = await fetch("./fares.json", {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }).then((res) => res.json());

            setZones(response.zones);
        };
        fetchFares();
    }, []);

    useEffect(() => {
        if (zones.length) {
            const defaultFare = zones[0].fares[0];
            calcFare(defaultFare);
        }
    }, [zones]);

    // not sure how to manipulate radio buttons from a different form field update
    // using this function to do so after 'anytime' travel is selected
    const selectPurchaseType = (e) => {
        const { selected } = formRef.current.purchaseType;
        const tempUnselected = selected;
        formRef.current.purchaseType.selected = e.target;
        formRef.current.purchaseType.unselected = tempUnselected;
    };

    // not sure how to manipulate radio buttons from a different form field update
    // using this function to do so after 'anytime' travel is selected
    // and advanced purchase is not selected
    const setAdvancedPurchaseType = (advancedPurchaseType) => {
        const { selected, unselected } = formRef.current.purchaseType;
        if (unselected.value === advancedPurchaseType) {
            unselected.checked = true;
            const tempUnselected = selected;
            const tempSelected = unselected;
            // using full object path to make the swap explicit to the reader
            formRef.current.purchaseType.selected = tempSelected;
            formRef.current.purchaseType.unselected = tempUnselected;
        }
    };

    const calcFare = (fare) => {
        const { purchaseCost, purchaseCount } = formRef.current;
        // purchase value must be a minimum of 1
        if (!purchaseCount.value) purchaseCount.value = 1;
        purchaseCost.innerText =
            "$" + parseInt(purchaseCount.value) * fare.price;
    };

    const handleChange = (e) => {
        const { travelTime, purchaseType, travelNote } = formRef.current;
        const zone = JSON.parse(formRef.current.zone.value);

        const matchingFare = zone.fares.find((fare) => {
            const typeMatch = fare.type === travelTime.value;
            const purchaseMatch = fare.purchase === purchaseType.selected.value;
            return fare.type === ANYTIME_VALUE || (typeMatch && purchaseMatch);
        });

        // disabling other purchase methods when travel time is 'anytime'
        // 'anyime' travel only allows advance purchase
        if (matchingFare.type === ANYTIME_VALUE) {
            setAdvancedPurchaseType(matchingFare.purchase);
            purchaseType.selected.disabled = true;
            purchaseType.unselected.disabled = true;
            travelNote.innerText = ANYTIME_TRAVEL_NOTE;

            // setting advanced purchase type if it is not already selected
        } else {
            purchaseType.selected.disabled = false;
            purchaseType.unselected.disabled = false;
            travelNote.innerText = "";
        }

        calcFare(matchingFare);
    };

    return (
        <form className="fares-widget" onChange={handleChange}>
            <header>
                <h3>Regional Rail Fares</h3>
            </header>
            <section>
                <div>
                    <h4>Where are you going?</h4>
                </div>
                {/* to DRY:  once form is complete, make reusable select component */}
                <select ref={(ref) => (formRef.current.zone = ref)}>
                    {zones.map((zone, i) => (
                        <option
                            value={JSON.stringify(zone)}
                            key={"option" + i + zone?.name}
                        >
                            {zone?.name}
                        </option>
                    ))}
                </select>
            </section>
            <section>
                <div>
                    <h4>When are you riding?</h4>
                </div>
                <select ref={(ref) => (formRef.current.travelTime = ref)}>
                    {TRAVEL_TIMES.map((travelTime, i) => (
                        <option
                            value={travelTime.value}
                            key={"travel-time" + i + travelTime.value}
                        >
                            {travelTime.label}
                        </option>
                    ))}
                </select>
            </section>
            <div
                ref={(ref) => (formRef.current.travelNote = ref)}
                id="anytime-travel-note"
            ></div>
            <section>
                <div>
                    <h4>Where are will you purchase the fare?</h4>
                </div>
                {PURCHASE_TYPES.map((purchaseType, i) => (
                    <Fragment key={purchaseType.value + "radio" + i}>
                        <label htmlFor={purchaseType.value}>
                            {purchaseType.label}
                        </label>
                        <input
                            id={purchaseType.value}
                            defaultChecked={
                                purchaseType.value === PURCHASE_TYPES[0].value
                            }
                            onChange={selectPurchaseType}
                            name="purchase-type"
                            type="radio"
                            value={purchaseType.value}
                            ref={(ref) =>
                                purchaseType.value === PURCHASE_TYPES[0].value
                                    ? (formRef.current.purchaseType.selected =
                                          ref)
                                    : (formRef.current.purchaseType.unselected =
                                          ref)
                            }
                        />
                    </Fragment>
                ))}
            </section>
            <section>
                <div>
                    <h4>How many rides will you need?</h4>
                </div>
                <input
                    type="number"
                    ref={(ref) => (formRef.current.purchaseCount = ref)}
                    defaultValue={1}
                    id="purchase-count"
                    name="tentacles"
                    min={1}
                />
            </section>
            <div>
                <div>
                    <h4>Where are will you purchase the fare?</h4>
                </div>
                <div ref={(ref) => (formRef.current.purchaseCost = ref)}></div>
            </div>
        </form>
    );
}

export default App;
