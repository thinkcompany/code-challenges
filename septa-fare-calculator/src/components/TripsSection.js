const TripsSection = ({ prompt, trips, setTrips }) => {
    const handleTripsChange = e => {
        const sanitized = +e.target.value.replace(/\D/g, '');
        // console.log(e.target.value, sanitized);

        // my decision: limit between 1 and 100 tickets per purchase
        if (sanitized < 1) {
            setTrips(1);
        } else if (sanitized > 100) {
            setTrips(100);
        } else {
            setTrips(sanitized);
        }
    };

    const handleTripsUpDown = e => {
        if (e.keyCode === 38) {     // up arrow
            if (+e.target.value < 100) setTrips(+e.target.value + 1);   // maximum at 100
        } else if (e.keyCode === 40) {      // down arrow
            if (+e.target.value > 1) setTrips(+e.target.value - 1);     // minimum at 1
        }
    };

    return (
        <section className="flex-column trips-section">
            <h3
                data-testid="trips-section-prompt"
                className="prompt-text"
            >{prompt}</h3>
            <input
                id="trips-input"
                type="text"
                name="trips"
                data-testid="trips"
                value={trips}
                onKeyDown={handleTripsUpDown}
                onChange={handleTripsChange}
            />
        </section>
    )
};

export default TripsSection;
