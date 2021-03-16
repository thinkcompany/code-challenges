import "./TravelTime.css";

const TravelTime = () => {
  return (
    <div className="travel-time-section">
      <div>When are you riding?</div>
      <div className="travel-time-select-div">
        <select>
          <option value="">Choose Travel Time</option>
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
