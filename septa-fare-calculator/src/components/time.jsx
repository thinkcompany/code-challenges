const Time = ({time, setTime, options, timeInfo}) => {
  if (timeInfo === 'Valid anytime') {
    timeInfo = "Valid anytime. May only be advance purchases and comes in a bundle of 10 tickets."
  }
  return (
    <div className="time-container">
        When are you riding?
        <select className="time-dropdown" value={time} onChange={(e) => setTime(e.target.value) || null}>
          <option value="">Select Travel Time</option>
          {options.map((option,i) => (
            <option key={i} value={option[0]}>
              {option[0]}
            </option>
          ))}
        </select>
        <div className="time-info">
          {timeInfo ? timeInfo : ''}

        </div>
    </div>
  )
}

export default Time;