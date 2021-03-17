import "./TravelTime.css";

const TravelTime = ({ travelTime, setTravelTime, quantity, options, info }) => {
  const formatOptions = option => {
    let arr = option.split('_');
    arr.forEach((item, i, array) => {
      array[i] = item[0].toUpperCase(0) + item.slice(1);
    })
    return arr.join(' / ');
  }
  
  return (
    <div className="travel-time-section">
      <div>When are you riding?</div>
      <div className="travel-time-select-div">
        <select name={travelTime} value={travelTime} onChange={e => setTravelTime(e.target.value)}>
          <option value="">Choose Travel Time</option>
          {options
          .map(option => (
            <option
              key={option}
              value={option}
            >{formatOptions(option)}</option>
          ))}
        </select>
      </div>
      <div className="travel-time-info-div">{info}</div>
    </div>
  );
};

export default TravelTime;
