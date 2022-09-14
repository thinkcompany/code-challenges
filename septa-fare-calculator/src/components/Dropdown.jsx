function Dropdown({ label, options }) {
    // console.whenRiding
    return (
        // <div>
        //     <h2>{label}</h2>
        //     <div>{options}</div>
        // </div>
        <select>
        {travelTimes.map((time, i) => (
            <option value={time} key={"travel-time" + time}>
                {time}
            </option>
        ))}
    </select>
    <div>
        {purchaseLocations.map((location) => (
            <div key={"purchase-location-options" + location}>
                <input
                    value={location}
                    type="radio"
                    onChange={selectPurchaseLocation}
                    checked={location === selectedPurchaseLocation}
                />
                <label htmlFor={location}>{location}</label>
            </div>
        ))}
    </div>
    );
}
export default Dropdown;
