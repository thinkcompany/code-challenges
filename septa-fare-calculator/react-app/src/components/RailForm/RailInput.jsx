export default function RailInput({
    text,
    selectionType,
    setSelection,
    selection,
    selections
}) {
    // selection, setSelection = useState
    // selections = all the options; array
    // selectionType = zones, times, or purchaseLocations; string

    
    const changeSelection = (e) => {
        setSelection(e.target.value);
    }
    
    // Zones and Times are select inputs and the purchaseLocations is a radio button.
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
                            <option value={ele}>{ele}</option>
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
                    value={selection}
                    onChange={changeSelection}
                    name={selectionType}
                    id={selectionType}
                    className="fare-number"
                >
                </input>
            </>
            }
            
        </div>
    );
}