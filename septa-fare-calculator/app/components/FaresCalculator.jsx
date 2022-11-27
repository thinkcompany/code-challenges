import { useEffect, useState } from 'react';


function FaresCalculator({ title, info, zones, calculateCost }) {
    const [{ zone, fare, purchase, rides, cost }, setDetails] = useState({
        zone: 1,
        fare: "weekday",
        purchase: "advance_purchase",
        rides: 1,
        cost: 0.00
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDetails((prev) => ({
            ...prev,
            [name]: isNaN(value) ? value : +value,
            cost
        }));
    }

    useEffect(() => {
        setDetails((prev) => ({
            ...prev,
            cost: calculateCost(prev.zone, prev.fare, prev.purchase, prev.rides)
        }));
    }, [zone, fare, purchase, rides, calculateCost])

    return (
        <div className="calculator">
            <div className="header-calculator">
                <p><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/SEPTA.svg/1280px-SEPTA.svg.png" alt="septa logo" />{title}</p>
            </div>
            <form>
                <div className="question">
                    <label htmlFor="zone">Where are you going?</label>
                    <select id="zone" name="zone" value={zone} onChange={handleChange}>
                        {zones.map((z) => <option key={z.zone} value={z.zone}>{z.name}</option>)}
                    </select>
                </div>
                <hr />
                <div className="question">
                    <label htmlFor="fare">When are you riding?</label>
                    <select id="fare" name="fare" onChange={handleChange} aria-describedby="fare-desc">
                        <option value="weekday">Weekday</option>
                        <option value="evening_weekend">Evening Weekends</option>
                        <option value="anytime">Anytime</option>
                    </select>
                    <span className="helper-text" id="fare-desc">{info[fare]}</span>
                </div>
                <hr />
                <div className="question">
                    <fieldset onChange={handleChange} aria-required="true" role="radiogroup" aria-labelledby="purchase" aria-describedby="fares">
                        <legend id="purchase">Where will you purchase the fare?</legend>
                        <div className="radios">
                            <div className="radio">
                                <input id="station-kiosk" type="radio" name="purchase" value="advance_purchase" defaultChecked={purchase === "advance_purchase"} />
                                <label htmlFor="station-kiosk">Station Kiosk</label>
                            </div>
                            <div className="radio">
                                <input id="onboard" type="radio" name="purchase" value="onboard_purchase" defaultChecked={purchase === "onboard_purchase"}/>
                                <label htmlFor="onboard">Onboard</label>
                            </div>
                        </div>
                        <span id="fares" className="visually-hidden">{info[purchase]}</span>
                    </fieldset>
                </div>
                <hr />
                <div className="question">
                    <label htmlFor="rides">How many rides will you need?</label>
                    <input name="rides" onChange={handleChange} type="number" min="1" max="10" id="rides" value={rides} aria-invalid="true" aria-describedby="rides-amount" />
                    <span className="visually-hidden" id="rides-amount">Select between 1 to 10 rides.</span>
                </div>
            </form>
            <span className="error" role="alert">{cost === "-" ? "Your selections are not available with option 'Anytime'. Please change your options." : ""}</span>
            <div className="footer-calculator">
                <p>Your fare will cost <span className="total">{cost}</span></p>
            </div>
        </div>
    );
}

export default FaresCalculator;