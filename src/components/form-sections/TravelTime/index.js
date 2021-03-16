import "./TravelTime.css";

const TravelTime = ({ travelTime, setTravelTime, options }) => {
  return (
    <div className="travel-time-section">
      <div>When are you riding?</div>
      <div className="travel-time-select-div">
        <select name={travelTime} value={travelTime} onChange={e => setTravelTime(e.target.value)}>
          <option value="">Choose Travel Time</option>
          {options.map(option => (
            <option
              key={option}
              value={option}
            >{option[0].toUpperCase(0) + option.slice(1)}</option>
          ))}
        </select>
      </div>
      <div className="travel-time-info-div">
        Info about the time that has been selected. This field is going to have
        a huge text.
      </div>
    </div>
  );
};

export default TravelTime;
