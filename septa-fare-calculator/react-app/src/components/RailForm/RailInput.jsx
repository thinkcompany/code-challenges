export default function RailInput({
    text,
    selectionType,
    setSelection,
    selection,
    selections,
    helperText,
    anytime
}) {
    // selection, setSelection = useState variables
    // selections = all the options; array
    // selectionType = zones, times, or purchaseLocations; string
    // helperText = extra info on options; string

    
    const changeSelection = (e) => {
        setSelection(e.target.value);
    }
    
    // Zones and Times are select inputs and the purchaseLocations is a radio button.
    // numOfTrips is input type number
    // helperText at the bottom are conditionally rendered if they are passed down as a prop
    return (
        <div className="rail-input-container">
            {selectionType === "zones" || selectionType === "times" ?
                <>
                    <label className="fare-label" htmlFor={selectionType}>{text}</label>
                    <select
                        value={selection}
                        onChange={changeSelection}
                        name={selectionType}
                        id={selectionType}
                        className="fare-input"
                        >
                        {selections.map(ele => (
                            <option value={ele}>{ele === "Anytime" ? `*${ele} Bundle` : ele}</option>
                        ))}
                    </select>
                </>
            : selectionType === "purchaseLocations" ?
            <fieldset>
                <legend className="fare-label">{text}</legend>
                <div className="radio-container">
                {selections.map(ele => (
                    <label className="radio-label">
                        <input
                            type="radio"
                            value={ele}
                            onChange={changeSelection}
                            name={selectionType}
                            checked={selection === ele}
                            />
                        {ele}
                    </label>))}
                </div>
            </fieldset>
            : 
            <>
                <label className="fare-label" htmlFor={selectionType}>{text}</label>
                <input
                    type="number"
                    min={1}
                    max={100000}
                    value={+selection}
                    onChange={changeSelection}
                    name={selectionType}
                    id={selectionType}
                    className="fare-number"
                >
                </input>
            </>
            }
            {helperText && 
                <>
                    <p className="helper-text">{helperText}</p>
                    {selection === "Anytime" &&
                        <p className="helper-text anytime">*Anytime tickets are bundled in groups of 10 rides and can only be purchased in advance at a Station Kiosk</p>
                    }

                </>
            }
            {anytime && selectionType === "numOfRides" && selection % 10 !== 0 &&
                <p className="helper-text anytime">Please select a multiple of 10 when checking the cost of Anytime Bundles!</p>
            }
        </div>
    );
}